import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CursorContext = createContext(null)

export function CursorProvider({ children }) {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [label, setLabel] = useState('')

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <CursorContext.Provider value={{ position, isHovering, isClicking, label, setIsHovering, setLabel }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used within CursorProvider')
  return ctx
}
