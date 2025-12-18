const mongoose= require ('mongoose');
const {Schema, model} = mongoose
const User= require ('./User');
const PostSchema= new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});

module.exports= model('Post', PostSchema);