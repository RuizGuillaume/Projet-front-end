class Model {
    constructor() {
        this.api = new ProductAPI()
         this.apiList = new ProductListAPI()
    }
    async getAllProducts() {
        let products = []
        for (let product of await this.api.getAll()) {
            products.push(Object.assign(new Product(), product))
        }
        return products
    }
    async getAllProductList() {
        let productList = []
        for (let productList of await this.apiList.getAll()) {
            productList.push(Object.assign(new ProductList(), productList))
        }
        return productList
    }
    async getProduct(id) {
        try {
            return Object.assign(new Product(), await this.api.get(id))
        } catch (e) {
            if (e === 404) return null
            return undefined
        }
    }
    delete(id) {
        return this.api.delete(id).then(res => res.status)
    }
    insert(product) {
        return this.api.insert(product).then(res => res.status)
    }
    update(product) {
        return this.api.update(product).then(res => res.status)
    }
}