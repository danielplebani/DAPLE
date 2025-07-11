const nodemailer = require('nodemailer');

// Configurazione del trasportatore email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email mittente (es. Gmail)
    pass: process.env.EMAIL_PASS, // App password o password della casella
  },
});

// Funzione per inviare email di reset password
const sendResetEmail = async (toEmail, resetUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Reset della password',
    html: `
      <p>Hai richiesto il reset della password.</p>
      <p>Clicca sul link per reimpostarla:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Il link scade in 15 minuti.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📬 Email inviata:', info.response);
  } catch (error) {
    console.error('❌ Errore durante l\'invio dell\'email:', error);
    throw error; // Propaga l'errore al chiamante
  }
};

module.exports = { sendResetEmail };