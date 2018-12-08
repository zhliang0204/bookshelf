const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  category:[{ type: String}],
  author:[{type:String}]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const History = mongoose.model('History', historySchema);
module.exports = History;
