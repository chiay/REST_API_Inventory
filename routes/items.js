const express = require('express');
const router = express.Router();
const item = require('../models/item');

// Get all
router.get('/', async (req, res) => {
   try {
      const items = await item.find();
      res.json(items);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
})

// Get one
router.get('/:id', getItem, (req, res) => {
   res.send(res.item);
})

// Create one
router.post('/', async (req, res) => {
   const i = new item({
      name: req.body.name,
      description: req.body.description,
      unit : req.body.unit,
      quantity: req.body.quantity,
      barcode: req.body.barcode
   });

   try {
      const newItem = await i.save();
      res.status(201).json(newItem);
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})

// Update one
router.patch('/:id', getItem, async (req, res) => {
   if (req.body.name != null) {
      res.item.name = req.body.name;
   }
   if (req.body.description != null) {
      res.item.description = req.body.description;
   }
   if (req.body.unit != null) {
      res.item.unit = req.body.unit;
   }
   if (req.body.quantity != null) {
      res.item.quantity = req.body.quantity;
   }
   if (req.body.barcode != null) {
      res.item.barcode = req.body.barcode;
   }
   try {
      const updatedItem = await res.item.save();
      res.json(updatedItem);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
})

// Delete one
router.delete('/:id', getItem, async (req, res) => {
   try {
      await res.item.remove()
      res.json({ message: "Deleted Item" });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
})

/* Middleware */
async function getItem(req, res, next) {
   let i;
   try {
      i = await item.findById(req.params.id);
      if (i == null) {
         return res.status(404).json({ message: "Cannot find item" });
      }
   } catch (err) {
      return res.status(500).json({ message: err.message })
   }

   res.item = i;
   next();
}

module.exports = router;