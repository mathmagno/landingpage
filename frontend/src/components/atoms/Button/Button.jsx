import { useCursor } from '@/context/CursorContext'
import styles from './Button.module.css'

export function Button({ children, variant = 'primary', size = 'md', href, onClick, type = 'button', disabled, className = '' }) {
  const { setIsHovering } = useCursor()

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ')

  const handlers = {
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...handlers}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...handlers}>
      {children}
    </button>
  )
}
