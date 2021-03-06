const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  googleID: String,
  slackID: String,
  pictureUrl: String,
  isFirstTime: {type: Boolean,default: true},
  likes:[{type: String}],
  _booklist: [{type:Schema.Types.ObjectId, ref: 'BookShelf' }],
  // _booklist: [{type:String }],

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
