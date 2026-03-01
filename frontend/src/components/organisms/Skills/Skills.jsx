import { useIntersectionObserver } from '@/hooks'
import { SkillBadge } from '@/components/molecules'
import styles from './Skills.module.css'

const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: '⚛️', level: 92 },
      { name: 'TypeScript', icon: '🔷', level: 85 },
      { name: 'Next.js', icon: '▲', level: 80 },
      { name: 'CSS / Sass', icon: '🎨', level: 88 },
      { name: 'Vite', icon: '⚡', level: 90 },
      { name: 'Framer', icon: '🎭', level: 70 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 88 },
      { name: 'Express', icon: '🚂', level: 85 },
      { name: 'PostgreSQL', icon: '🐘', level: 78 },
      { name: 'Prisma', icon: '◆', level: 80 },
      { name: 'Redis', icon: '🔴', level: 65 },
      { name: 'Docker', icon: '🐳', level: 70 },
    ],
  },
  {
    category: 'Ferramentas',
    skills: [
      { name: 'Git / GitHub', icon: '🐙', level: 90 },
      { name: 'VS Code', icon: '💙', level: 95 },
      { name: 'Figma', icon: '🎯', level: 72 },
      { name: 'Vercel', icon: '▲', level: 85 },
      { name: 'Linux', icon: '🐧', level: 68 },
      { name: 'Postman', icon: '📬', level: 80 },
    ],
  },
]

export function Skills() {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container} ref={ref}>
        <div className={`${styles.header} ${isVisible ? 'reveal visible' : 'reveal'}`}>
          <p className={styles.sectionLabel}>// 03 — skills</p>
          <h2 className={styles.title}>Stack &amp;<br />Ferramentas</h2>
        </div>

        <div className={`${styles.categories} ${isVisible ? 'stagger visible' : 'stagger'}`}>
          {SKILL_CATEGORIES.map(({ category, skills }) => (
            <div key={category} className={styles.category}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              <div className={styles.grid}>
                {skills.map(skill => (
                  <SkillBadge key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
