import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const sectionRef = useRef(null);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    // Note: You need to create a free account at Formspree.io,
    // create a new form, and replace 'YOUR_FORM_ID' below with your actual Form ID.
    const FORMSPREE_ID = "meewqpvl";

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 5000);
      } else {
        alert(
          "Oops! There was a problem submitting your form. Please try again or use the email link below.",
        );
      }
    } catch (error) {
      alert(
        "Something went wrong. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  useGSAP(() => {
    gsap.from(".contact-fade", {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.15,
      immediateRender: false,
      scrollTrigger: {
        trigger: "#contact",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-contact-bg)] px-4 pb-20 pt-36 text-white lg:px-6 lg:pt-44">
      <section
        id="contact"
        ref={sectionRef}
        className="mx-auto flex max-w-7xl flex-col gap-16"
      >
        <div className="contact-fade">
          <p className="font-[font1] text-sm uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Contact
          </p>
          <h1 className="mt-5 max-w-5xl font-[font2] text-[16vw] uppercase leading-[0.8] sm:text-[18vw] lg:text-[6vw]">
            Lets build something sharp.
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-fade space-y-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full border-0 border-b-2 border-white/20 bg-transparent pb-3 pt-8 font-[font1] text-lg outline-none transition-colors placeholder-transparent focus:border-[var(--color-accent)] lg:text-xl"
                placeholder="Name"
              />
              <label className="text-white/50 peer-focus:text-[var(--color-accent)] peer-valid:text-[var(--color-accent)] absolute left-0 top-7 font-[font1] text-base transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs">
                Name
              </label>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--color-accent)] transition-all duration-300 peer-focus:w-full" />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full border-0 border-b-2 border-white/20 bg-transparent pb-3 pt-8 font-[font1] text-lg outline-none transition-colors placeholder-transparent focus:border-[var(--color-accent)] lg:text-xl"
                placeholder="Email"
              />
              <label className="text-white/50 peer-focus:text-[var(--color-accent)] peer-valid:text-[var(--color-accent)] absolute left-0 top-7 font-[font1] text-base transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs">
                Email
              </label>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--color-accent)] transition-all duration-300 peer-focus:w-full" />
            </div>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="peer w-full resize-none border-0 border-b-2 border-white/20 bg-transparent pb-3 pt-8 font-[font1] text-lg outline-none transition-colors placeholder-transparent focus:border-[var(--color-accent)] lg:text-xl"
                placeholder="Message"
              />
              <label className="text-white/50 peer-focus:text-[var(--color-accent)] peer-valid:text-[var(--color-accent)] absolute left-0 top-7 font-[font1] text-base transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs">
                Message
              </label>
              <span className="absolute bottom-1.5 left-0 h-0.5 w-0 bg-[var(--color-accent)] transition-all duration-300 peer-focus:w-full" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || sent}
              className="group relative overflow-hidden rounded-full border border-white/25 px-8 py-3 font-[font1] text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:border-[var(--color-accent)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                {sent
                  ? "Message sent!"
                  : isSubmitting
                    ? "Sending..."
                    : "Send message"}
              </span>
              {!sent && !isSubmitting && (
                <span className="absolute inset-0 scale-0 rounded-full bg-[var(--color-accent)] opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100" />
              )}
            </button>
          </form>

          {/* Info */}
          <div className="contact-fade space-y-6 pt-2">
            <div className="space-y-5 font-[font1] text-xl lg:text-2xl">
              <a
                className="group inline-flex items-center gap-3 border-b border-white/25 pb-4 transition-colors hover:text-[var(--color-accent)]"
                href="mailto:sharad09aeshi@gmail.com"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs uppercase tracking-wider text-white/60 transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                  @
                </span>
                <span className="truncate">sharad09aeshi@gmail.com</span>
              </a>
              <a
                className="group inline-flex items-center gap-3 border-b border-white/25 pb-4 transition-colors hover:text-[var(--color-accent)]"
                href="tel:+917229073755"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs uppercase tracking-wider text-white/60 transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                  #
                </span>
                <span className="truncate">+91 777 8910 717</span>
              </a>
              <a
                className="group inline-flex items-center gap-3 border-b border-white/25 pb-4 transition-colors hover:text-[var(--color-accent)]"
                href="https://www.linkedin.com/in/sharaadishi091294/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs uppercase tracking-wider text-white/60 transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                  in
                </span>
                <span className="truncate">/in/sharaadishi091294</span>
              </a>
              <a
                className="group inline-flex items-center gap-3 border-b border-white/25 pb-4 transition-colors hover:text-[var(--color-accent)]"
                href="https://github.com/sharadishi"
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs uppercase tracking-wider text-white/60 transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                  G
                </span>
                <span className="truncate">github.com/sharadishi</span>
              </a>
              <p className="flex items-center gap-3 pt-4 text-white/55">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                Based in India · Available remotely
              </p>
            </div>
          </div>
        </div>

        <div className="contact-fade border-t border-white/10 pt-8 text-center font-[font1] text-sm uppercase tracking-[0.2em] text-white/40">
          &copy; {new Date().getFullYear()} Sharad Ishi
        </div>
      </section>
    </main>
  );
};

export default Contact;
