import { useMemo, useState } from 'react'

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

export default ProjectSection
