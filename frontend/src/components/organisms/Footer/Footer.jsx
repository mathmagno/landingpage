import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>
          © {year} — Feito com React &amp; ☕
        </p>
        <p className={styles.mono}>
          <span className={styles.accent}>{'</'}</span>portfólio<span className={styles.accent}>{'>'}</span>
        </p>
      </div>
    </footer>
  )
}
