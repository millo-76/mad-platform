export const dynamic = "force-dynamic";

const defaultFaqItems = [
  {
    question: "How can I customize this site?",
    answer: "You can edit content through the Sanity Studio, which is accessible from the admin section. The site structure and styling can be modified by editing the code in the repository.",
  },
  {
    question: "Can I add more gallery items?",
    answer: "Yes! You can add, edit, and organize gallery items directly from the Sanity Studio. Each item can include multiple images, descriptions, and categories.",
  },
  {
    question: "How do I set up the contact form?",
    answer: "The contact form is pre-configured and ready to use. You can customize the form fields and email settings through the Sanity configuration.",
  },
  {
    question: "Is this site mobile-friendly?",
    answer: "Yes, this site is designed to be fully responsive and works seamlessly on mobile devices, tablets, and desktops.",
  },
  {
    question: "How do I track visitor statistics?",
    answer: "You can integrate analytics tools like Google Analytics or Vercel Analytics to track visitor data and engagement metrics.",
  },
];

export default async function FaqPage() {
  return (
    <main className="page-shell faq-page">
      <section className="faq-section section-panel">
        <h1 className="faq-heading">Frequently Asked Questions</h1>
        <div className="faq-container">
          {defaultFaqItems.map((item, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">{item.question}</summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
