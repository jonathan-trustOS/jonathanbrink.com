/**
 * Zoom Server-to-Server OAuth integration.
 * Requires a Zoom S2S OAuth app with scopes:
 *   - meeting:read:admin
 *   - meeting:write:admin
 *   - meeting:write:registrant:admin
 */

interface CachedToken {
  token: string;
  expiresAt: number; // epoch ms
}

let _tokenCache: CachedToken | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (_tokenCache && _tokenCache.expiresAt > now + 60_000) {
    return _tokenCache.token;
  }

  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;
  if (!accountId || !clientId || !clientSecret) {
    throw new Error(
      "Missing ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, or ZOOM_CLIENT_SECRET environment variables",
    );
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(accountId)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Zoom token request failed: ${res.status} ${body}`);
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  _tokenCache = {
    token: json.access_token,
    expiresAt: now + (json.expires_in - 60) * 1000,
  };
  return json.access_token;
}

export interface ZoomRegistrantResult {
  registrant_id: string;
  join_url: string;
}

export async function registerAttendee(
  meetingId: string,
  attendee: { email: string; firstName: string; lastName: string },
): Promise<ZoomRegistrantResult> {
  const token = await getAccessToken();
  const res = await fetch(
    `https://api.zoom.us/v2/meetings/${encodeURIComponent(meetingId)}/registrants`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: attendee.email,
        first_name: attendee.firstName,
        last_name: attendee.lastName || "—",
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Zoom registrant request failed: ${res.status} ${body}`);
  }

  const json = (await res.json()) as { registrant_id: string; join_url: string };
  return {
    registrant_id: json.registrant_id,
    join_url: json.join_url,
  };
}

/** Splits a full name into first/last for Zoom's API, which expects both fields. */
export function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}
