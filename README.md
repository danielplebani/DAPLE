# DAPLE - Backend API con Node.js, Express, MongoDB e JWT + Frontend React

## Descrizione
Applicazione fullstack per la gestione di utenti e items.  
Il backend fornisce un'API REST con autenticazione sicura (JWT), reset password via email e CRUD completo per gli items.  
Il frontend React consuma queste API, permettendo login, visualizzazione e gestione degli items da un’interfaccia utente semplice ed efficace.

---

## Tecnologie utilizzate

### Backend
- Node.js
- Express
- MongoDB con Mongoose
- JSON Web Token (JWT) per autenticazione
- Nodemailer per invio email (reset password)
- dotenv per gestione variabili d’ambiente
- bcrypt per hashing password

### Frontend
- React
- React Router DOM
- Fetch API per comunicazione con il backend
- CSS per lo stile (basic layout e impaginazione)

---

## Funzionalità principali

### Autenticazione
- Registrazione utente con email e password (password hashata)
- Login con generazione Access Token (JWT) e Refresh Token (cookie httpOnly)
- Logout per eliminare il Refresh Token
- Middleware di protezione rotte con verifica del token

### Gestione Items
- Creazione, lettura, aggiornamento e cancellazione di items
- Ogni item è associato all’utente che l’ha creato
- Possibilità di leggere tutti gli items o uno specifico
- Visualizzazione degli items nella dashboard frontend

### Reset Password
- Endpoint per richiedere reset password: genera token temporaneo e invia email con link
- Endpoint per impostare nuova password usando token valido

### Frontend (React)
- Struttura base con `React Router` e organizzazione in pagine
- Pagina di login con invio credenziali e salvataggio token
- Pagina di dashboard con fetch degli items dell’utente
- Layout semplice e responsive
- Integrazione completa con le API backend

---

## Avvio del progetto

### Backend
```bash
cd backend
npm install
npm run dev
