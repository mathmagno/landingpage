import styles from './Tag.module.css'

export function Tag({ children, variant = 'default' }) {
  return (
    <span className={`${styles.tag} ${styles[variant]}`}>
      {children}
    </span>
  )
}
