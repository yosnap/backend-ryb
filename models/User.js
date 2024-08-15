const mongoose = require('mongoose') 
const { Schema } = mongoose;

const UsersSchema = new Schema({
   restaurant_id: {
     type: mongoose.Schema.Types.ObjectId,
     ref : "Restaurant",
   },
 username:
 {
    type:String
 },
 restaurant_name:
 {
    type:String
 },

 password:
 {
    type:String
 }
});
const Users = mongoose.model('Users', UsersSchema);

// Export the model
module.exports = Users;