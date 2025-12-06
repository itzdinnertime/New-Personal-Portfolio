import type { ReactNode } from 'react'

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

export default Section
