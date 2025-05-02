var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

var authSchema = new Schema(
    {
        id: objectId,
        name:{type:String, required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        
    }
);

var authModel = mongoose.model("User", authSchema);
module.exports = authModel;