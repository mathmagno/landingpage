import { useCursor } from '@/context/CursorContext'
import { Tag } from '@/components/atoms'
import styles from './ProjectCard.module.css'

export function ProjectCard({ title, description, tags = [], image, liveUrl, repoUrl, index }) {
  const { setIsHovering, setLabel } = useCursor()

  return (
    <article
      className={styles.card}
      onMouseEnter={() => { setIsHovering(true); setLabel('Ver') }}
      onMouseLeave={() => { setIsHovering(false); setLabel('') }}
    >
      <div className={styles.imageWrapper}>
        {image
          ? <img src={image} alt={title} className={styles.image} />
          : <div className={styles.imagePlaceholder}>
              <span className={styles.projectIndex}>0{index + 1}</span>
            </div>
        }
        <div className={styles.overlay}>
          {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayLink}>Live ↗</a>}
          {repoUrl && <a href={repoUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayLink}>Repo ↗</a>}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
    </article>
  )
}
