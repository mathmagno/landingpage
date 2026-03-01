import { useCursor } from '@/context/CursorContext'
import styles from './NavLink.module.css'

export function NavLink({ href, children, active }) {
  const { setIsHovering } = useCursor()

  const handleClick = (e) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <a
      href={href}
      className={`${styles.link} ${active ? styles.active : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      <span className={styles.underline} />
    </a>
  )
}
