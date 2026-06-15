import { getAboutContent } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const dynamic = "force-dynamic";

const defaultAboutContent = {
  eyebrow: "About Me",
  heading: "Introduce yourself with a warm, accessible layout.",
  bio: "This page gives you a dedicated place to tell your story, share your approach, and describe what people can expect when they work with you.",
  secondaryCopy:
    "The image area is labeled for screen readers, so you can replace the placeholder with a real portrait without losing accessibility.",
  imageAlt: "Portrait placeholder for the About Me page. Replace this with a real photo of you.",
  imageCaption: "Swap in your own portrait when you are ready.",
};

export default async function AboutPage() {
  let aboutContent = null;

  try {
    aboutContent = await getAboutContent();
  } catch (error) {
    console.error("Failed to fetch about content:", error);
  }

  const content = aboutContent || defaultAboutContent;
  const portraitUrl = content.image ? urlFor(content.image).width(1200).height(1500).fit("crop").quality(90).url() : "/about-portrait-placeholder.svg";
  const portraitAlt = content.imageAlt || defaultAboutContent.imageAlt;

  return (
    <main className="page-shell about-page">
      <section className="about-layout">
        <figure className="about-figure">
          <img src={portraitUrl} alt={portraitAlt} className="about-image" />
          {content.imageCaption ? <figcaption className="about-caption">{content.imageCaption}</figcaption> : null}
        </figure>

        <div className="about-copy section-panel">
          <p className="eyebrow">{content.eyebrow || defaultAboutContent.eyebrow}</p>
          <h1>{content.heading || defaultAboutContent.heading}</h1>
          {content.bio ? <p className="section-copy">{content.bio}</p> : null}
          {content.secondaryCopy ? <p className="section-copy">{content.secondaryCopy}</p> : null}
        </div>
      </section>
    </main>
  );
}