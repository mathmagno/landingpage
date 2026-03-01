import styles from './Typography.module.css'

export function Typography({ as: Tag = 'p', variant = 'body', children, className = '' }) {
  return (
    <Tag className={`${styles[variant]} ${className}`}>
      {children}
    </Tag>
  )
}
