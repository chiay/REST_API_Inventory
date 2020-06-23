/* Database schema */
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
   name: {
      type : String,
      required: true
   },
   description: {
      type : String,
      required: true
   },
   createdOn: {
      type : Date,
      required: true,
      default: Date.now
   },
   unit: {
      type: String,
      required: true
   },
   quantity: {
      type : Number,
      required: true,
      default: 0
   },
   barcode: {
      type : String,
      required: true
   }
})

module.exports = mongoose.model('Item', itemSchema);