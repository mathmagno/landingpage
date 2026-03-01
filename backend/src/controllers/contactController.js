const { PrismaClient } = require('@prisma/client')
const { sendContactEmail } = require('../services/emailService')

const prisma = new PrismaClient()

async function create(req, res) {
  const { name, email, subject, message } = req.body
  try {
    const contact = await prisma.contact.create({
      data: { name, email, subject, message },
    })
    await sendContactEmail({ name, email, subject, message })
    res.status(201).json({ success: true, data: contact })
  } catch (err) {
    console.error('[contact/create]', err)
    res.status(500).json({ success: false, message: 'Erro ao processar contato.' })
  }
}

async function findAll(req, res) {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, data: contacts })
  } catch (err) {
    console.error('[contact/findAll]', err)
    res.status(500).json({ success: false, message: 'Erro ao buscar contatos.' })
  }
}

async function findOne(req, res) {
  const id = parseInt(req.params.id)
  try {
    const contact = await prisma.contact.findUnique({ where: { id } })
    if (!contact) return res.status(404).json({ success: false, message: 'Contato não encontrado.' })
    res.json({ success: true, data: contact })
  } catch (err) {
    console.error('[contact/findOne]', err)
    res.status(500).json({ success: false, message: 'Erro ao buscar contato.' })
  }
}

async function markAsRead(req, res) {
  const id = parseInt(req.params.id)
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { read: true },
    })
    res.json({ success: true, data: contact })
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ success: false, message: 'Contato não encontrado.' })
    console.error('[contact/markAsRead]', err)
    res.status(500).json({ success: false, message: 'Erro ao atualizar contato.' })
  }
}

async function remove(req, res) {
  const id = parseInt(req.params.id)
  try {
    await prisma.contact.delete({ where: { id } })
    res.json({ success: true, message: 'Contato removido.' })
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ success: false, message: 'Contato não encontrado.' })
    console.error('[contact/remove]', err)
    res.status(500).json({ success: false, message: 'Erro ao remover contato.' })
  }
}

module.exports = { create, findAll, findOne, markAsRead, remove }
