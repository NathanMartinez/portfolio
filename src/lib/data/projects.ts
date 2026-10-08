export type Project = {
	id: string;
	name: string;
	label: string;
	description: string;
	validation: string;
	technologies: string[];
	href: `https://${string}`;
	icon?: `/icons/projects/${string}.svg`;
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
		icon: '/icons/projects/bun-burner.svg'
	},

	{
		id: 'chora',
		name: 'Chora',
		label: 'Open-source Android TV contributions',
		description:
			'Contributed three merged upstream pull requests to an open-source Android music application, addressing Navidrome provider initialization, pull-request build validation, and playlist deletion confirmation with remote-control input handling.',
		validation:
			'Validated functionality on physical Fire TV hardware and Android emulators, including playback, artwork, lyrics, and playlist interactions.',
		technologies: [
			'Kotlin',
			'Android TV',
			'GitHub Actions',
			'Regression Testing',
			'Integration Testing',
			'Open Source'
		],
		href: 'https://github.com/CraftWorksMC/Chora',
		icon: '/icons/projects/chora.svg'
	}
];
