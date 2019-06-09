module.exports = function(cartService){
    this.cartService = cartService;

    this.getFavourites = async (req, res) => {
        try {
            const userId = req.params.userId || req.currentUser.id;
            const favourites = await this.cartService.getFavourites(userId);
            res.json(favourites);
        } catch(err) {
            res.status(500).send({ message: err });            
        }
    }

    this.getCartItems = async (req, res) => {
        try {
            if (req.params.userId !== req.currentUser.id) {
                throw 'Not Authorized';
            }
            const user = await this.cartService.getCartItems(req.params.userId);
            if (user) {
                res.json(user.cart);
            } else {
                throw 'User not found';
            }
        } catch(err) {
            res.status(500).send({ message: err });            
        }
    }

    this.putProductsInCart = async (req, res) => {
        try {
            const userId = req.params.userId || req.currentUser.id;
            const cartItems = await this.cartService.putProductsInCart(userId, req.body);
            res.json(cartItems.cart);
        } catch(err) {
            res.status(500).send({ message: err });
        }
    }

    this.removeProductFromCart = async (req, res) => {
        try {
            const userId = req.params.userId || req.currentUser.id;
            const itemId = req.params.itemId;
            await this.cartService.removeProductFromCart(userId, itemId);
            res.status(200).send();
        } catch(err) {
            res.status(500).send({ message: err });
        }
    }

/*     this.putFavourites = async (req, res) => {
        try {
            const userId = req.params.userId || req.currentUser.id;
            await this.cartService.putFavourites(userId, req.body);
            res.send('Favourites added successfully');
        } catch(err) {
            res.status(500).send({ message: err });            
        }
    } */
}