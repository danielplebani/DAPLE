# DAPLE - Backend API con Node.js, Express, MongoDB e JWT

## Descrizione
API backend per gestione utenti e items con autenticazione JWT, refresh token, reset password via email, e CRUD items collegati agli utenti.

---

## Tecnologie utilizzate
- Node.js
- Express
- MongoDB con Mongoose
- JSON Web Token (JWT) per autenticazione
- Nodemailer per invio email (reset password)
- dotenv per gestione variabili d’ambiente
- bcrypt per hashing password

---

## Funzionalità principali

### Autenticazione
- Registrazione utente con email e password (password hashata)
- Login con generazione Access Token (JWT) e Refresh Token (cookie httpOnly)
- Logout per eliminare il Refresh Token
- Middleware di protezione rotte con verifica token

### Gestione Items
- Creazione, lettura, aggiornamento e cancellazione di items
- Ogni item è associato all’utente che l’ha creato
- Possibilità di leggere tutti gli items o uno specifico

### Reset Password
- Endpoint per richiedere reset password: genera token temporaneo e invia email con link
- Endpoint per impostare nuova password usando token valido

