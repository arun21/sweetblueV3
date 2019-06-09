const User = require('../models/user');
const Product = require('../models/product');
const productFields = 'title vendor imageUrls price salePrice onSale stock';

module.exports = function () {
    this.getFavourites = async (userId) => {
        try {
            return await User.findById(userId, { favourites: 1 })
                .populate('favourites', productFields)
                .exec();
        } catch (err) {
            console.log('Get favourites error', err);
            throw 'Unexpected error occurred while getting favourites';
        }
    }

    this.getCartItems = async (userId) => {
        try {
            return await User.findById(userId, { cart: 1 })
                                        .populate('cart.product', productFields)
                                        .exec();
        } catch (err) {
            console.log('Get cart items error', err);
            throw 'Unexpected error occurred while getting cart items';
        }
    }

    this.putProductsInCart = async (userId, cartItems) => {
        try {
            const productIds = cartItems.map(i => i.product);
            const findUser = User.findById(userId);
            const findProducts = Product.find({ _id: { $in: productIds} }, { _id: 1});
            const [user, products]= await Promise.all([findUser, findProducts]);
            if (!products || products.length == 0) {
                throw 'Products not found';
            }
            cartItems.forEach(item => {
                const isProductFound = products.some(p => p._id === item.product);
                if (isProductFound) {
                    const index = user.cart.findIndex(cartItem => cartItem.product == item.product);
                    if (index !== -1) {
                        user.cart[index].quantity += item.quantity;
                    } else {
                        user.cart.push(item);
                    }
                }
            });
            await user.save();
            return await this.getCartItems(userId);
        } catch (err) {
            console.log('Put cart item error', err);
            throw typeof err === 'string' ? err : 'Unexpected error occurred while saving product to cart';
        }
    }

    this.removeProductFromCart = async (userId, itemId) => {
        try {
            await User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        'cart': { '_id': itemId }
                    }
                }
            );
        } catch (err) {
            console.log('Remove cart item error', err);
            throw 'Unexpected error occurred while removing product from cart';
        }
    }
}