import { useCursor } from '@/context/CursorContext'
import styles from './CustomCursor.module.css'

export function CustomCursor() {
  const { position, isHovering, isClicking, label } = useCursor()

  return (
    <>
      <div
        className={`${styles.dot} ${isHovering ? styles.hovering : ''} ${isClicking ? styles.clicking : ''}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      <div
        className={`${styles.ring} ${isHovering ? styles.hovering : ''} ${isClicking ? styles.clicking : ''}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {label && <span className={styles.label}>{label}</span>}
      </div>
    </>
  )
}
