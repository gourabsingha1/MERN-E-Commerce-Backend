const { Cart } = require("../model/Cart")

exports.fetchCartByUser = async (req, res) => {
    const { user } = req.query;
    try {
        const cartItems = await Cart.find({ user: user }).populate('user').populate('product');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.addToCart = async (req, res) => {
    const cart = new Cart(req.body);
    try {
        const doc = await cart.save();
        const result = await doc.populate('product');
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = new Cart.findByIdAndDelete(id, req.body, { new: true });
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = new Cart.findByIdAndUpdate(id, req.body, { new: true });
        const result = await doc.populate('product'); // on changing qty, thumbnail wont be gone
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};