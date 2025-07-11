const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const protect = require('../middlewares/authMiddleware');

const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

// Middleware di validazione (se vorrai usarlo in futuro)
const validateItem = [
  body('name')
    .trim()
    .notEmpty().withMessage('Il campo name è obbligatorio')
    .isLength({ min: 2 }).withMessage('Il nome deve avere almeno 2 caratteri'),
];

// 📥 CREATE - POST /api/items
router.post('/', protect, createItem);

// 📤 READ - GET tutti gli item dell'utente loggato
router.get('/', protect, getAllItems);

// 📄 READ - GET un singolo item
router.get('/:id', protect, getItemById);

// ✏️ UPDATE - PUT /api/items/:id
router.put('/:id', protect, updateItem);

// ❌ DELETE - DELETE /api/items/:id
router.delete('/:id', protect, deleteItem);

module.exports = router;
