import { HashRouter, Routes, Route } from 'react-router-dom'
import { CursorProvider } from '@/context/CursorContext'
import { Layout } from '@/components/templates'
import { Home } from '@/pages'

export default function App() {
  return (
    <CursorProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </HashRouter>
    </CursorProvider>
  )
}
