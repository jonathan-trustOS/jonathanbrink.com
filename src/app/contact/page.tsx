import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Interested in working together? Drop me a line.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-[110px] pb-16 md:px-12 md:pt-[130px] md:pb-[100px]">
        <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[3px] text-violet before:block before:h-px before:w-5 before:bg-violet">
          Contact
        </div>
        <h1 className="mb-4 font-display text-[clamp(48px,6vw,80px)] leading-none text-text">
          Get in{" "}
          <em className="font-accent" style={{ fontStyle: "italic" }}>
            touch
          </em>
          .
        </h1>
        <p className="mb-14 max-w-[560px] text-lg leading-[1.7] text-dim">
          Interested in working together? Have a question about one of the
          tools? Just want to say hi? Drop me a line.
        </p>

        <div className="grid max-w-3xl gap-10 lg:grid-cols-[1fr_280px]">
          <ContactForm />

          <div className="space-y-6 rounded-2xl border border-border bg-surface p-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[2px] text-muted">
                Current Role
              </div>
              <div className="mt-1 text-base text-text">
                Senior Design Manager @ IBM — Watson.data / AI
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[2px] text-muted">
                Location
              </div>
              <div className="mt-1 text-base text-text">
                Available for remote consulting
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[2px] text-muted">
                Availability
              </div>
              <div className="mt-1 text-base text-text">
                Select engagements — let&apos;s talk
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
