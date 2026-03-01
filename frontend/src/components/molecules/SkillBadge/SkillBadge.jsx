import { useCursor } from '@/context/CursorContext'
import styles from './SkillBadge.module.css'

export function SkillBadge({ name, level, icon }) {
  const { setIsHovering } = useCursor()

  return (
    <div
      className={styles.badge}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.name}>{name}</span>
      {level && (
        <div className={styles.levelBar}>
          <div className={styles.levelFill} style={{ '--level': `${level}%` }} />
        </div>
      )}
    </div>
  )
}
