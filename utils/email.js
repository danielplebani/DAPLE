const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      // la tua email (es. gmail)
    pass: process.env.EMAIL_PASS,      // la password o app password di Gmail
  },
});

const sendResetEmail = async (toEmail, resetUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Reset della password',
    html: `
      <p>Hai richiesto il reset della password.</p>
      <p>Clicca sul link per reimpostarla:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Scade in 15 minuti.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📬 Email inviata:', info.response);
  } catch (error) {
    console.error('❌ Errore durante l\'invio email:', error);
    throw error; // rilancia errore per farlo gestire al controller
  }
};

module.exports = { sendResetEmail };