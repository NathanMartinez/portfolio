export type Project = {
	id: string;
	name: string;
	label: string;
	description: string;
	validation: string;
	technologies: string[];
	href: `https://${string}`;
	icon?: 'flame';
};

export const projects: Project[] = [
	{
		id: 'bun-burner',
		name: 'Bun Burner',
		label: 'Developer tooling for Bitburner',
		description:
			'I built a source-preserving, two-way sync bridge between local editor files and Bitburner’s Remote API over WebSockets. Content hashing, conflict handling, and recovery copies protect changes without tying the workflow to a specific editor.',
		validation:
			'Automated recovery and failure-path tests, with Linux and Windows checks in GitHub Actions.',
		technologies: ['TypeScript', 'Bun', 'WebSockets', 'Test Automation', 'CI', 'Open Source'],
		href: 'https://github.com/NathanMartinez/bun-burner',
		icon: 'flame'
	}
];
