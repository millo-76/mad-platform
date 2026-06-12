import Link from "next/link";
import { getHomeContent } from "@/sanity/lib/queries";

const defaultHighlights = [
	{
		title: "Curated Work",
		description:
			"Feature standout projects, case studies, or campaign moments in a modular layout.",
	},
	{
		title: "Simple Flow",
		description:
			"Guide visitors from landing to gallery to contact with clear calls to action.",
	},
	{
		title: "Flexible Styling",
		description:
			"Swap in your final fonts and color palette by editing CSS variables in one place.",
	},
];

export default async function HomePage() {
	let homeContent = null;
	
	try {
		homeContent = await getHomeContent();
	} catch (error) {
		console.error("Failed to fetch home content:", error);
	}

	const content = homeContent || {
		heroEyebrow: "Studio site framework",
		heroTitle: "Build your presence with a clean, adaptable base.",
		heroCopy: "This starter includes a focused homepage, gallery route, and contact workflow. Content and visual direction can evolve without refactoring core structure.",
		highlights: defaultHighlights,
	};

	return (
		<main className="page-shell">
			<section className="hero">
				<p className="eyebrow">{content.heroEyebrow}</p>
				<h1>{content.heroTitle}</h1>
				<p className="hero-copy">
					{content.heroCopy}
				</p>
				<div className="hero-actions">
					<Link className="btn btn-primary" href="/gallery">
						View Gallery
					</Link>
					<Link className="btn btn-secondary" href="/contact">
						Contact
					</Link>
				</div>
			</section>

			<section className="card-grid" aria-label="Website features">
				{(content.highlights || defaultHighlights).map((item: any) => (
					<article className="card" key={item.title}>
						<h2>{item.title}</h2>
						<p>{item.description}</p>
					</article>
				))}
			</section>
		</main>
	);
}
