module.exports = function(productService){
    this.productService = productService;

    this.getProducts = async (req, res) => {
        try {
            const page = req.query.page;
            const pageNumber = (page && page > 0) ? page : 0;
            const [count, products] = await this.productService.getProducts(pageNumber, req.query.q);
            res.send({
                totalPages: Math.floor(count/this.productService.docsPerPage),
                products: products
            });
        }
        catch(err) {
            res.status(500).send({ message: err});
        }
    }

    this.getProductById = async (req, res) => {
        try {
            const id = req.params.id;
            const product= await this.productService.getProductById(id);
            res.json(product);
        }
        catch(err) {
            res.status(500).send({ message: err});
        }
    }

    this.getNewArrivals = async (req, res) => {
        try {
            const products = await this.productService.getNewArrivals();
            res.send(products);
        }
        catch(err) {
            res.status(500).send({ message: err});
        }
    }
}