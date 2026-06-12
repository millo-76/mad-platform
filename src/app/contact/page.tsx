"use client";

import { FormEvent, useState, useEffect } from "react";
import { getContactContent } from "@/sanity/lib/queries";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type ContactContent = {
  eyebrow?: string;
  heading?: string;
  sectionCopy?: string;
  formSuccessMessage?: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
};

const defaultContent: ContactContent = {
  eyebrow: "Contact",
  heading: "Start a project conversation",
  sectionCopy:
    "This form is set up for validation and user feedback. Connect it to your API route",
  formSuccessMessage: "Thanks for reaching out. We'll get back to you soon!",
};

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState<ContactContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const fetchedContent = await getContactContent();
        if (fetchedContent) {
          setContent(fetchedContent);
        }
      } catch (error) {
        console.error("Failed to fetch contact content:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setSubmitted(false);
      setError("Please complete all fields before sending your message.");
      return;
    }

    // Basic email validation for client-side feedback before backend wiring.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formState.email.trim())) {
      setSubmitted(false);
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
    setFormState(initialFormState);
  };

  if (isLoading) {
    return <main className="page-shell">Loading...</main>;
  }

  return (
    <main className="page-shell">
      <section>
        <p className="eyebrow">{content.eyebrow || defaultContent.eyebrow}</p>
        <h1>{content.heading || defaultContent.heading}</h1>
        <p className="section-copy">
          {content.sectionCopy || defaultContent.sectionCopy}
        </p>
      </section>

      <section className="form-container">
        {submitted ? (
          <div className="submitted-state">
            <p className="success-message">
              {content.formSuccessMessage || defaultContent.formSuccessMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            {error && <p className="error-message">{error}</p>}
            <fieldset className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Your name"
              />
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="your@email.com"
              />
            </fieldset>

            <fieldset className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Your message here"
                rows={6}
              />
            </fieldset>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        )}
      </section>
    </main>
  );
}