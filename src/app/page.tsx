import Link from "next/link";
import { getHomeContent } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

const defaultSections = [
	{
		_type: "heroSection",
		eyebrow: "Studio site framework",
		title: "Build your presence with a clean, adaptable base.",
		copy:
			"This starter includes a focused homepage, gallery route, and contact workflow. Content and visual direction can evolve without refactoring core structure.",
		primaryActionLabel: "View Gallery",
		primaryActionHref: "/gallery",
		secondaryActionLabel: "Contact",
		secondaryActionHref: "/contact",
	},
	{
		_type: "cardGridSection",
		eyebrow: "Highlights",
		title: "Flexible sections you can add, remove, or reorder.",
		copy:
			"Use the studio to tailor the homepage section by section and card by card.",
		cards: [
	{
		title: "Curated Work",
		description:
			"Feature standout projects, case studies, or campaign moments in a modular layout.",
		linkLabel: "Open gallery",
		linkHref: "/gallery",
	},
	{
		title: "Simple Flow",
		description:
			"Guide visitors from landing to gallery to contact with clear calls to action.",
		linkLabel: "Get in touch",
		linkHref: "/contact",
	},
	{
		title: "Flexible Styling",
		description:
			"Swap in your final fonts and color palette by editing CSS variables in one place.",
		linkLabel: "Review styling",
		linkHref: "/studio",
	},
		],
	},
];

function renderSection(section: any) {
	if (section._type === "heroSection") {
		return (
			<section className="hero section-panel" key={section._key || section.title}>
				<p className="eyebrow">{section.eyebrow}</p>
				<h1>{section.title}</h1>
				<p className="hero-copy">{section.copy}</p>
				<div className="hero-actions">
					<Link className="btn btn-primary" href={section.primaryActionHref || "/gallery"}>
						{section.primaryActionLabel || "View Gallery"}
					</Link>
					<Link className="btn btn-secondary" href={section.secondaryActionHref || "/contact"}>
						{section.secondaryActionLabel || "Contact"}
					</Link>
				</div>
			</section>
		);
	}

	if (section._type === "cardGridSection") {
		return (
			<section className="home-section" key={section._key || section.title}>
				<div className="section-header">
					{section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
					{section.title ? <h2 className="section-title">{section.title}</h2> : null}
					{section.copy ? <p className="section-copy">{section.copy}</p> : null}
				</div>
				<div className="card-grid" aria-label={section.title || "Homepage cards"}>
					{(section.cards || []).map((item: any) => (
						<article className="card" key={item._key || item.title}>
							{item.eyebrow ? <p className="card-eyebrow">{item.eyebrow}</p> : null}
							<h3>{item.title}</h3>
							<p>{item.description}</p>
							{item.linkLabel && item.linkHref ? (
								<Link className="card-link" href={item.linkHref}>
									{item.linkLabel}
								</Link>
							) : null}
						</article>
					))}
				</div>
			</section>
		);
	}

	if (section._type === "textSection") {
		return (
			<section className="home-section section-panel" key={section._key || section.title}>
				{section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
				{section.title ? <h2 className="section-title">{section.title}</h2> : null}
				{section.copy ? <p className="section-copy">{section.copy}</p> : null}
			</section>
		);
	}

	if (section._type === "ctaSection") {
		return (
			<section className="home-section cta-panel" key={section._key || section.title}>
				<div className="section-header">
					{section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
					{section.title ? <h2 className="section-title">{section.title}</h2> : null}
					{section.copy ? <p className="section-copy">{section.copy}</p> : null}
				</div>
				{section.buttonLabel && section.buttonHref ? (
					<div className="section-actions">
						<Link className="btn btn-primary" href={section.buttonHref}>
							{section.buttonLabel}
						</Link>
					</div>
				) : null}
			</section>
		);
	}

	return null;
}

export default async function HomePage() {
	let homeContent = null;
	
	try {
		homeContent = await getHomeContent();
	} catch (error) {
		console.error("Failed to fetch home content:", error);
	}

	const content = homeContent || {
		sections: defaultSections,
	};
	const sections = content.sections || defaultSections;

	return (
		<main className="page-shell">
			{sections.map(renderSection)}
		</main>
	);
}
