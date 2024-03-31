const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, min: [0, 'wrong min price'], max: [10000, 'wrong max price'], required: true },
    discountPercentage: { type: Number, min: [1, 'wrong min discount'], max: [99, 'wrong max discount'] },
    rating: { type: Number, min: [0, 'wrong min rating'], max: [5, 'wrong max rating'], default: 0, required: true },
    stock: { type: Number, min: [0, 'wrong min stock'], max: [100, 'wrong max stock'], default: 0, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    deleted: { type: String, default: false },
})

const virtual = productSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Product = mongoose.model('Product', productSchema)