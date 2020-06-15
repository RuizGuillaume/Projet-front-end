class IndexController extends BaseController {
    constructor() {
        super()
        this.tableAllProducts = $('#tableAllProducts')
        this.tableBodyAllProducts = $('#tableBodyAllProducts')
        //this.displayAllProducts()
    }
    // async displayAllProducts() {
    //     let content = ''
    //     this.tableAllProducts.style.display = "none"
    //     try {
    //         for (const product of await this.model.getAllProducts()) {
    //             const date = product.builddate.toLocaleDateString()
    //             content += `<tr><td>${product.toString()}</td>
    //                 <td>${product.price}</td>
    //                 <td>${date}</td>
    //                 <td class="icon">
    //                 <button class="btn" onclick="indexController.displayConfirmDelete(${product.id})"><i class="material-icons">delete</i></button>
    //                 <button class="btn" onclick="indexController.edit(${product.id})"><i class="material-icons">edit</i></button>
    //                 </td></tr>`
    //         }
    //         this.tableBodyAllProducts.innerHTML = content
    //         this.tableAllProducts.style.display = "block"
    //     } catch (err) {
    //         console.log(err)
    //         this.displayServiceError()
    //     }
    // }
    async displayAllProductList() {
        let content = ''
        this.tableAllProducts.style.display = "none"
        try {
            for (const productList of await this.model.getAllProductList()) {
                const date = productList.date.toLocaleDateString()
                content += `<tr><td>${productList.toString()}</td>
                    <td>${productList.label}</td>
                    <td>${date}</td>
                    <td class="icon">
                    <button class="btn" onclick="indexController.displayConfirmDelete(${productList.id})"><i class="material-icons">delete</i></button>
                    <button class="btn" onclick="indexController.edit(${productList.id})"><i class="material-icons">edit</i></button>
                    </td></tr>`
            }
            this.tableBodyAllProductList.innerHTML = content
            this.tableAllProductList.style.display = "block"
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async edit(id) {
        try {
            const object = await this.model.getProduct(id)
            if (object === undefined) {
                this.displayServiceError()
                return
            }
            if (object === null) {
                this.displayNotFoundError()
                return
            }
            this.selectedProduct = object
            navigate('edit')
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    undoDelete() {
        if (this.deletedProduct) {
            this.model.insert(this.deletedProduct).then(status => {
                if (status == 200) {
                    this.deletedProduct = null
                    this.displayUndoDone()
                    this.displayAllProducts()
                }
            }).catch(_ => this.displayServiceError())
        }
    }
    async displayConfirmDelete(id) {
        try {
            const product = await this.model.getProduct(id)
            super.displayConfirmDelete(product, async () => {
                switch (await this.model.delete(id)) {
                    case 200:
                        this.deletedProduct = product
                        this.displayDeletedMessage("indexController.undoDelete()");
                        break
                    case 404:
                        this.displayNotFoundError();
                        break
                    default:
                        this.displayServiceError()
                }
                this.displayAllProducts()
            })
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
}
window.indexController = new IndexController()
