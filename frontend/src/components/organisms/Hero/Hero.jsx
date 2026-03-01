import { useEffect, useState } from 'react'
import { Button } from '@/components/atoms'
import styles from './Hero.module.css'

const ROLES = ['Full Stack Developer', 'UI Engineer', 'React Specialist', 'Problem Solver']

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIndex]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex(prev => (prev + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.greeting}>
          <span className={styles.line} /> Olá, eu sou
        </p>

        <h1 className={styles.name}>
          SEU<br />NOME
        </h1>

        <div className={styles.roleWrapper}>
          <span className={styles.role}>{displayed}</span>
          <span className={styles.cursor}>|</span>
        </div>

        <p className={styles.bio}>
          Construo experiências digitais de alta performance com código limpo,<br />
          design cuidadoso e atenção aos detalhes.
        </p>

        <div className={styles.cta}>
          <Button size="lg" onClick={scrollToProjects}>Ver Projetos</Button>
          <Button size="lg" variant="outline" onClick={scrollToContact}>Entrar em Contato</Button>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
