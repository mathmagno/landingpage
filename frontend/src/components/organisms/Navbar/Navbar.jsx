import { useState, useEffect } from 'react'
import { NavLink } from '@/components/molecules'
import { useCursor } from '@/context/CursorContext'
import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { href: '#about', label: 'Sobre' },
  { href: '#projects', label: 'Projetos' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contato' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const { setIsHovering } = useCursor()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = NAV_ITEMS.map(item => ({
        id: item.href.slice(1),
        el: document.querySelector(item.href),
      }))

      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, el } = sections[i]
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(`#${id}`)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className={styles.logoDot} /><span>DEV</span>
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_ITEMS.map(item => (
            <li key={item.href} onClick={() => setMenuOpen(false)}>
              <NavLink href={item.href} active={active === item.href}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Menu"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span /><span /><span />
        </button>
      </nav>
    </header>
  )
}
