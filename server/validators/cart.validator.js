module.exports = {
    validateCartItems: (req, res, next) => {
        try {
            if (req.body.length == 0) {
                res.status(400).json({ message: 'No items to add to cart' });
            }
            req.body.forEach(item => {
                if (!item.product || !item.quantity) {
                    throw 'Invalid cart item';
                }
            });
            next();
        } catch (err) {
            console.log('validateCartItems error', err);
            res.status(400).json({ message: 'Validation failed for one of the items being added to cart' });
        }
    }
}