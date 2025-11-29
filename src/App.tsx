import { useMemo, useState, type ReactNode } from 'react'
import Header from './components/Header'
import './index.css'

import javaLogo from './assets/java.svg'
import cppLogo from './assets/cpp.svg'
import pythonLogo from './assets/python.svg'
import jsLogo from './assets/js.svg'
import rustLogo from './assets/rust.svg'
import goLogo from './assets/go.svg'
import gitLogo from './assets/git.svg'
import gdbLogo from './assets/gdb.svg'
import valgrindLogo from './assets/valgrind.svg'
import kermitPic from './assets/kermitpfp.jpg'

interface SectionProps {
	id: string
	title: string
	children?: ReactNode
}

const Section = ({ id, title, children }: SectionProps) => (
	<section id={id} className="min-h-screen py-24 px-6 md:px-8">
		<div className="max-w-4xl mx-auto">
			<h2 className="text-3xl font-bold mb-4">{title}</h2>
			<div className="text-gray-300">{children}</div>
		</div>
	</section>
)

const projectsData = [
	{
		id: 'tuneshare',
		title: 'Tuneshare — Connecting others with music!',
		desc: 'A website built to connect with others using only music. Uses an algorithm to compare songs, artists and genres and match users with similar tastes.',
		tools: ['React', 'TypeScript', 'Python'],
		github: 'https://github.com/itzdinnertime/TuneShare.git',
	},
	{
		id: 'portfolio',
		title: 'Personal Portfolio - A place to show off',
		desc: 'A personal portfolio website to introduce and show off what I have done.',
		tools: ['React', 'TypeScript', 'Tailwind CSS'],
		github: 'https://github.com/itzdinnertime/Personal-Portfolio.git',
	},
	{
		id: 'cms',
		title: 'Portfolio CMS — Headless content manager',
		desc: 'A lightweight headless CMS to manage portfolio content with a simple admin UI and Markdown support.',
		tools: ['Node.js', 'Express', 'SQLite', 'React Admin'],
		github: 'https://github.com/kinhvin/CuHacking6.git',
	},
]

const ProjectSection = () => {
	const [search, setSearch] = useState('')
	const [selected, setSelected] = useState<string[]>([])

	const tags = useMemo(() => {
		const s = new Set<string>()
		projectsData.forEach((p) => p.tools.forEach((t) => s.add(t)))
		return Array.from(s)
	}, [])

	const toggleTag = (tag: string) => {
		setSelected((curr) => (curr.includes(tag) ? curr.filter((x) => x !== tag) : [...curr, tag]))
	}

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase()
		return projectsData.filter((p) => {
			const matchesSearch =
				q === '' || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tools.join(' ').toLowerCase().includes(q)
			const matchesTags = selected.length === 0 || selected.every((t) => p.tools.includes(t))
			return matchesSearch && matchesTags
		})
	}, [search, selected])

	return (
		<>
			<div className="project-filter-bar" style={{ marginBottom: '1rem', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
				<input
					type="search"
					placeholder="Search projects or tools..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="filter-input"
					style={{ padding: '0.5rem 0.75rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'inherit' }}
				/>
				<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
					{tags.map((t) => (
						<button
							key={t}
							onClick={() => toggleTag(t)}
							className={`filter-tag ${selected.includes(t) ? 'active' : ''}`}
							style={{ padding: '0.35rem 0.6rem', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.04)', background: selected.includes(t) ? 'var(--accent)' : 'transparent', color: selected.includes(t) ? '#fff' : 'var(--text)' }}
						>
							{t}
						</button>
					))}
				</div>
			</div>

			<div className="project-grid">
				{filtered.map((p) => (
					<article key={p.id} className="project-card">
						<h3 className="project-title">{p.title}</h3>
						<p className="project-desc">{p.desc}</p>
						<div className="project-tools">
							<strong>Tools:</strong>
							<ul>
								{p.tools.map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
						</div>

						{p.github && (
							<div className="project-links">
								<a className="project-github-link" href={p.github} target="_blank" rel="noopener noreferrer">
									<svg className="project-github-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
										<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.468-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 0 4.61-2.805 5.625-5.475 5.92.429.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
									</svg>
									<span>View on GitHub</span>
								</a>
							</div>
						)}
					</article>
				))}
			</div>
		</>
	)
}

const App = () => {
	return (
		<div className="bg-gray-900 text-white min-h-screen">
			<Header />

			<main>
				<section id="about" className="py-24 px-6 md:px-8">
					<div className="max-w-6xl mx-auto about-container">
						<div className="about-picture">
							<img src={kermitPic} alt="Profile" />
						</div>
						<div className="about-text text-gray-300">
							<h2 className="text-3xl font-bold mb-4">About Me</h2>
							<p>
								Hi — I’m Jason, a Computer Science student at Carleton University. I build web
								applications and backend tools using React, TypeScript, Python, and C/C++. I
								started coding in high school and enjoy projects that combine algorithms with real-world
								experiences — for example, Tuneshare, a music-matching web app I built to connect users
								by taste.
							</p>
							<p style={{ marginTop: '0.75rem' }}>
								I’m interested in internships and collaborations. If you want to see my code or chat, check
								out my projects or send me a message.
							</p>
						</div>
					</div>
				</section>

				<section id="experience" className="py-8 px-6 md:px-8">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold mb-4">Experience</h2>
						<div className="experience-list">
							<article className="experience-item">
								<h3 className="exp-role">Software Developer Coop — Ross Video</h3>
								<div className="exp-meta">Fall 2025 • Hybrid</div>

								<div className="exp-tools">
									<strong>Tools:</strong>
									<ul>
										<li>C++</li>
										<li>JavaScript</li>
										<li>Unit testing</li>
									</ul>
								</div>

								<div className="exp-links">
									<a className="project-github-link" href="https://github.com/rossvideo/Catena" target="_blank" rel="noopener noreferrer">
										<svg className="project-github-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
											<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.468-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 0 4.61-2.805 5.625-5.475 5.92.429.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
										</svg>
										<span>View on GitHub</span>
									</a>
								</div>
								<ul>
									<li>Contributed to the Catena Repository: implemented and debug features C++ and Javascript.</li>
									<li>Wrote unit and integration tests, collaborated with senior engineers on design reviews.</li>
								</ul>
							</article>
						</div>
					</div>
				</section>

				<Section id="skills" title="Skills">
					<div className="skills-list">
						<div className="skills-row">
							<strong>Coding Languages:</strong>
							<ul className="skills-badges">
								<li>
									<img src={javaLogo} alt="Java" className="skills-badge-icon" />
									<span className="skills-badge-label">Java</span>
								</li>
								<li>
									<img src={cppLogo} alt="C C++" className="skills-badge-icon" />
									<span className="skills-badge-label">C / C++</span>
								</li>
								<li>
									<img src={pythonLogo} alt="Python" className="skills-badge-icon" />
									<span className="skills-badge-label">Python</span>
								</li>
								<li>
									<img src={jsLogo} alt="JavaScript TypeScript" className="skills-badge-icon" />
									<span className="skills-badge-label">JavaScript / TypeScript</span>
								</li>
								<li>
									<img src={rustLogo} alt="Rust" className="skills-badge-icon" />
									<span className="skills-badge-label">Rust</span>
								</li>
								<li>
									<img src={goLogo} alt="Go" className="skills-badge-icon" />
									<span className="skills-badge-label">Go</span>
								</li>
							</ul>
						</div>

						<div className="skills-row">
							<strong>Tools:</strong>
							<ul className="skills-badges">
								<li>
									<img src={gitLogo} alt="Git GitHub" className="skills-badge-icon" />
									<span className="skills-badge-label">Git / GitHub</span>
								</li>
								<li>
									<img src={gdbLogo} alt="GDB" className="skills-badge-icon" />
									<span className="skills-badge-label">GDB</span>
								</li>
								<li>
									<img src={valgrindLogo} alt="Valgrind" className="skills-badge-icon" />
									<span className="skills-badge-label">Valgrind</span>
								</li>
							</ul>
						</div>
					</div>
				</Section>

				<Section id="projects" title="Projects">
					<ProjectSection />
				</Section>

				<Section id="contacts" title="Contacts">
					<div className="contact-list">
						<a className="contact-item" href="mailto:chenjason214@gmail.com">
							<svg className="contact-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
								<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
							</svg>
							<span className="contact-link">chenjason214@gmail.com</span>
						</a>

						<a className="contact-item" href="https://www.linkedin.com/in/jason-chen-823b3528b/" target="_blank" rel="noopener noreferrer">
							<svg className="contact-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
								<path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.5 17H6.5V10h2v7zM7.5 9.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2zM18 17h-2v-3.6c0-.9-.7-1-1-1s-1 .2-1 1V17h-2V10h2v1c.3-.6 1-1.2 2-1.2 1.8 0 2 1.2 2 3V17z" />
							</svg>
							<span className="contact-link">LinkedIn</span>
						</a>

						<a className="contact-item" href="https://github.com/itzdinnertime" target="_blank" rel="noopener noreferrer">
							<svg className="contact-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.468-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 0 4.61-2.805 5.625-5.475 5.92.429.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
							</svg>
							<span className="contact-link">GitHub</span>
						</a>

					</div>
				</Section>
			</main>
		</div>
	)
}

export default App
