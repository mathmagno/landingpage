import { forwardRef } from 'react'
import { useCursor } from '@/context/CursorContext'
import styles from './Input.module.css'

export const Input = forwardRef(function Input({ label, name, type = 'text', placeholder, error, value, onChange, required, rows }, ref) {
  const { setIsHovering } = useCursor()
  const isTextarea = type === 'textarea'

  const inputProps = {
    ref,
    id: name,
    name,
    placeholder,
    value,
    onChange,
    required,
    className: `${styles.field} ${error ? styles.hasError : ''}`,
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
  }

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}{required && <span className={styles.required}> *</span>}
        </label>
      )}
      {isTextarea
        ? <textarea {...inputProps} rows={rows || 5} />
        : <input {...inputProps} type={type} />
      }
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
})
