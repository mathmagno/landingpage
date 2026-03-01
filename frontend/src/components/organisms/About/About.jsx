import { useIntersectionObserver } from '@/hooks'
import styles from './About.module.css'

const STATS = [
  { value: '3+', label: 'Anos de Experiência' },
  { value: '20+', label: 'Projetos Entregues' },
  { value: '10+', label: 'Clientes Satisfeitos' },
]

export function About() {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container} ref={ref}>
        <div className={`${styles.textCol} ${isVisible ? 'reveal visible' : 'reveal'}`}>
          <p className={styles.sectionLabel}>// 01 — sobre</p>
          <h2 className={styles.title}>Desenvolvedor<br /><em>apaixonado</em><br />por craft.</h2>
          <p className={styles.bio}>
            Sou um desenvolvedor Full Stack focado em criar produtos digitais que unem
            performance técnica e experiência de usuário excepcional. Trabalho com React,
            Node.js e tecnologias modernas para transformar ideias em realidade.
          </p>
          <p className={styles.bio}>
            Cada linha de código é uma oportunidade de fazer algo melhor. Acredito em
            código limpo, design intencional e entrega contínua de valor.
          </p>
        </div>

        <div className={`${styles.rightCol} ${isVisible ? 'stagger visible' : 'stagger'}`}>
          <div className={styles.photoFrame}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.initials}>SN</span>
            </div>
            <div className={styles.frameAccent} />
          </div>

          <div className={styles.stats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
