import { useState } from 'react'
import { useIntersectionObserver } from '@/hooks'
import { Button } from '@/components/atoms'
import { FormField } from '@/components/molecules'
import styles from './Contact.module.css'

const INITIAL = { name: '', email: '', subject: '', message: '' }

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Nome é obrigatório'
  if (!fields.email.trim()) errors.email = 'E-mail é obrigatório'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'E-mail inválido'
  if (!fields.message.trim()) errors.message = 'Mensagem é obrigatória'
  else if (fields.message.trim().length < 10) errors.message = 'Mensagem muito curta'
  return errors
}

export function Contact() {
  const [ref, isVisible] = useIntersectionObserver()
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validate(fields)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })

      if (!res.ok) throw new Error('Erro no servidor')
      setStatus('success')
      setFields(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  const SOCIAL_LINKS = [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter/X', href: 'https://twitter.com' },
  ]

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container} ref={ref}>
        <div className={`${styles.header} ${isVisible ? 'reveal visible' : 'reveal'}`}>
          <p className={styles.sectionLabel}>// 04 — contato</p>
          <h2 className={styles.title}>Vamos<br />Trabalhar<br />Juntos?</h2>
          <p className={styles.subtitle}>
            Aberto a freelas, oportunidades e colaborações.
            Respondo em até 24 horas.
          </p>

          <div className={styles.socials}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className={`${styles.formWrapper} ${isVisible ? 'reveal visible' : 'reveal'}`} style={{ transitionDelay: '150ms' }}>
          {status === 'success' ? (
            <div className={styles.success}>
              <span className={styles.successIcon}>✓</span>
              <h3>Mensagem enviada!</h3>
              <p>Obrigado pelo contato. Retornarei em breve.</p>
              <Button variant="outline" onClick={() => setStatus('idle')}>Enviar outra</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.row}>
                <FormField label="Nome" name="name" placeholder="João Silva" value={fields.name} onChange={handleChange} error={errors.name} required />
                <FormField label="E-mail" name="email" type="email" placeholder="joao@email.com" value={fields.email} onChange={handleChange} error={errors.email} required />
              </div>
              <FormField label="Assunto" name="subject" placeholder="Projeto, freela, oportunidade..." value={fields.subject} onChange={handleChange} />
              <FormField label="Mensagem" name="message" type="textarea" placeholder="Conte um pouco sobre o que você precisa..." value={fields.message} onChange={handleChange} error={errors.message} required rows={6} />

              {status === 'error' && (
                <p className={styles.errorMsg}>Algo deu errado. Tente novamente ou envie e-mail direto.</p>
              )}

              <Button type="submit" size="lg" disabled={status === 'loading'}>
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem →'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
