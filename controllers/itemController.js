const Item = require('../models/item');

/**
 * Recupera tutti gli items con la relativa email utente
 */
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('user', 'email');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Recupera un item specifico tramite ID con email utente
 */
const getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id).populate('user', 'email');
  if (!item) {
    res.status(404);
    throw new Error('Item non trovato');
  }
  res.json(item);
};

/**
 * Crea un nuovo item collegato all'utente autenticato
 */
const createItem = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'Utente non autenticato' });
    }

    const newItem = new Item({
      name,
      description,
      user: req.user._id,
    });

    let savedItem = await newItem.save();

    // Popola l'email dell'utente collegato all'item
    savedItem = await savedItem.populate('user', 'email');

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Aggiorna il campo 'name' di un item esistente
 */
const updateItem = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Il campo name è obbligatorio' });

  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item non trovato' });

    item.name = name;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Elimina un item esistente tramite ID
 */
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item non trovato' });

    await item.remove();
    res.json({ message: 'Item eliminato con successo' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};