const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import book from "./image/book.png"

const bookshelfSchema = new Schema({
  onlineId : String,
  imageUrl: {type:String, default:"./image/book.png"},
  title: String,
  author: [String],
  description: String,
  category:[String],
  buyLink:String,
  price: Number,
  
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const BookShelf = mongoose.model('BookShelf', bookshelfSchema);
module.exports = BookShelf;
