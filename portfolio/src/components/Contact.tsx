import { useState } from "react";
import { Mail, Link2, AtSign, Globe, Rss, CheckCircle2, AlertCircle, Send } from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socials = [
  {
    label: "LinkedIn",
    handle: "/in/joanasardinhadesign/",
    icon: Link2,
    href: "https://www.linkedin.com/in/joanasardinhadesign/",
  },
  {
    label: "Medium",
    handle: "@joanasardinha",
    icon: Rss,
    href: "https://medium.com/@joanasardinha",
  },
  {
    label: "Dribbble",
    handle: "joanasardinha",
    icon: Globe,
    href: "https://dribbble.com/joanasardinha",
  },
];

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof ContactForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-24 lg:py-32 bg-offwhite"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-crimson" aria-hidden="true" />
          <span className="text-crimson text-xs tracking-[0.4em] uppercase font-semibold">Contact</span>
        </div>
        <h2 className="font-serif text-charcoal leading-none mb-16" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
          Let's get in touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <p className="text-charcoal/70 text-base leading-relaxed">
                Have a project in mind, a question about my work, or just want to say hello? Drop me a message and
                I"ll get back to you within 24–48 hours.
              </p>
            </div>

            <div>
              <p className="text-charcoal text-xs tracking-widest uppercase font-semibold mb-4">Direct Email</p>
              <a
                href="mailto:joanasardinha15@gmail.com"
                className="group flex items-center gap-3 text-charcoal hover:text-crimson transition-colors font-semibold text-lg focus-visible:outline-crimson"
              >
                <Mail size={20} className="text-crimson flex-shrink-0" />
                joanasardinha15@gmail.com
              </a>
            </div>

            <div>
              <p className="text-charcoal text-xs tracking-widest uppercase font-semibold mb-5">Find Me Online</p>
              <div className="space-y-3">
                {socials.map(({ label, handle, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-3 -mx-3 hover:bg-charcoal/4 transition-colors rounded focus-visible:outline-crimson"
                  >
                    <div className="w-9 h-9 bg-charcoal flex items-center justify-center flex-shrink-0 group-hover:bg-crimson transition-colors">
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-charcoal font-semibold text-sm group-hover:text-crimson transition-colors">{label}</p>
                      <p className="text-charcoal/50 text-xs">{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-6 py-24 text-center border border-black/8">
                <CheckCircle2 size={56} className="text-green-500" />
                <div>
                  <p className="font-serif text-charcoal font-bold text-3xl mb-3">Message Sent!</p>
                  <p className="text-charcoal/60 text-base max-w-sm">
                    Thanks, <strong className="text-charcoal">{form.name}</strong>! I"ll get back to{" "}
                    <strong className="text-charcoal">{form.email}</strong> as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="px-6 py-3 border border-charcoal/20 text-charcoal text-sm tracking-widest uppercase font-semibold hover:border-crimson hover:text-crimson transition-colors focus-visible:outline-crimson"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="c-contact-name" className="block text-charcoal text-xs font-semibold tracking-widest uppercase mb-2">
                      Your Name *
                    </label>
                    <input
                      id="c-contact-name"
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full border border-black/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-crimson transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-contact-email" className="block text-charcoal text-xs font-semibold tracking-widest uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      id="c-contact-email"
                      type="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full border border-black/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-crimson transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-contact-subject" className="block text-charcoal text-xs font-semibold tracking-widest uppercase mb-2">
                    Subject
                  </label>
                  <input
                    id="c-contact-subject"
                    type="text"
                    placeholder="Project inquiry / Collaboration / General question…"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className="w-full border border-black/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-crimson transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="c-contact-message" className="block text-charcoal text-xs font-semibold tracking-widest uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    id="c-contact-message"
                    rows={7}
                    placeholder="Tell me about your project, question, or just say hello…"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full border border-black/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-crimson transition-colors resize-none"
                  />
                </div>
                {error && (
                  <p role="alert" className="text-crimson text-xs flex items-center gap-1.5">
                    <AlertCircle size={12} />
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="group flex items-center gap-3 px-8 py-4 bg-burgundy text-offwhite text-sm tracking-widest uppercase font-semibold hover:bg-charcoal transition-colors duration-200 focus-visible:outline-crimson"
                >
                  <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
