const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

async function sendContactEmail({ name, email, subject, message }) {
  const mailOptions = {
    from: `"Portfólio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    replyTo: email,
    subject: subject ? `[Portfólio] ${subject}` : `[Portfólio] Nova mensagem de ${name}`,
    html: `
      <div style="font-family: monospace; max-width: 600px; background: #0a0a0a; color: #e8e8e8; padding: 32px; border-radius: 8px; border: 1px solid #222;">
        <h2 style="color: #00ff88; font-size: 24px; margin: 0 0 24px;">Nova mensagem no portfólio</h2>

        <table style="width:100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 100px;">Nome</td>
            <td style="padding: 8px 0; color: #e8e8e8;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">E-mail</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00ff88;">${email}</a></td>
          </tr>
          ${subject ? `
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Assunto</td>
            <td style="padding: 8px 0; color: #e8e8e8;">${subject}</td>
          </tr>
          ` : ''}
        </table>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />

        <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Mensagem</p>
        <p style="color: #e8e8e8; line-height: 1.8; white-space: pre-wrap;">${message}</p>

        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;" />
        <p style="color: #444; font-size: 11px;">Enviado em ${new Date().toLocaleString('pt-BR')}</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = { sendContactEmail }
