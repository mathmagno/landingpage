import { useIntersectionObserver } from '@/hooks'
import { ProjectCard } from '@/components/molecules'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    description: 'Plataforma completa de e-commerce com carrinho, pagamentos e painel de admin. Foco em performance e UX.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Dashboard Analytics',
    description: 'Dashboard em tempo real com visualizações de dados, filtros dinâmicos e exportação de relatórios.',
    tags: ['React', 'D3.js', 'WebSocket', 'Express'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Task Manager App',
    description: 'Aplicativo de gestão de tarefas com drag-and-drop, colaboração em tempo real e notificações.',
    tags: ['React', 'Firebase', 'Framer Motion', 'PWA'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Portfolio CMS',
    description: 'Sistema de gerenciamento de conteúdo headless com editor rich-text e deploy automatizado.',
    tags: ['Next.js', 'Prisma', 'Sanity', 'Vercel'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Auth Microservice',
    description: 'Serviço de autenticação escalável com JWT, OAuth2, refresh tokens e rate limiting.',
    tags: ['Node.js', 'Redis', 'Docker', 'JWT'],
    repoUrl: '#',
  },
  {
    title: 'Design System',
    description: 'Biblioteca de componentes React com Storybook, testes visuais e documentação automática.',
    tags: ['React', 'Storybook', 'Vitest', 'CSS Modules'],
    repoUrl: '#',
  },
]

export function Projects() {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container} ref={ref}>
        <div className={`${styles.header} ${isVisible ? 'reveal visible' : 'reveal'}`}>
          <p className={styles.sectionLabel}>// 02 — projetos</p>
          <h2 className={styles.title}>Trabalhos<br />Selecionados</h2>
        </div>

        <div className={`${styles.grid} ${isVisible ? 'stagger visible' : 'stagger'}`}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
