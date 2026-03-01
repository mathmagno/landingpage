require('dotenv').config()
const express = require('express')
const cors = require('cors')

const contactRoutes = require('./routes/contactRoutes')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json({ limit: '10kb' }))

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }))

app.use('/api/contact', contactRoutes)

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Rota ${req.method} ${req.path} não encontrada.` })
})

app.use((err, req, res, _next) => {
  console.error('[Error]', err)
  res.status(500).json({ success: false, message: 'Erro interno do servidor.' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`\n🚀 Backend rodando em http://localhost:${PORT}`)
  console.log(`   Ambiente: ${process.env.NODE_ENV || 'development'}`)
  console.log(`   Health:   http://localhost:${PORT}/health\n`)
})
