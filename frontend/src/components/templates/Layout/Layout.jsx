import { Navbar, Footer } from '@/components/organisms'
import { CustomCursor } from '@/components/atoms'
import styles from './Layout.module.css'

export function Layout({ children }) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}
