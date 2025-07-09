const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { body, validationResult } = require('express-validator');
const protect = require('../middlewares/authMiddleware');

const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

// Middleware di validazione
const validateItem = [
  body('name')
    .trim()
    .notEmpty().withMessage('Il campo name è obbligatorio')
    .isLength({ min: 2 }).withMessage('Il nome deve avere almeno 2 caratteri'),
];

// POST - crea item con validazione
router.post('/', protect, createItem);


// PUT /api/items/:id - modifica item (solo del proprietario)
router.put('/:id', protect, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Item non trovato' });
  }

  // Verifica che l'item appartenga all'utente loggato
  if (item.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Non autorizzato' });
  }

  item.name = req.body.name || item.name;

  const updatedItem = await item.save();
  res.json(updatedItem);
});

router.get('/', protect, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id }).populate('user', 'email').sort({ createdAt: -1 }); // 👈 solo gli item dell'utente loggato
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/items/:id - elimina item (solo del proprietario)
router.delete('/:id', protect, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Item non trovato' });
  }

  if (item.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Non autorizzato' });
  }

  await item.deleteOne();
  res.json({ message: 'Item eliminato' });
});

router.get('/:id', getItemById);
router.delete('/:id', deleteItem);

module.exports = router;