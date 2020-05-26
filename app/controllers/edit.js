class EditController extends BaseFormController {
    constructor() {
        super()
        if (indexController.selectedProduct) {
            self.product = indexController.selectedProduct
            indexController.selectedProduct = null
            $('#editTitle').innerText = self.product.toString()
            $("#fieldProductName").value = self.product.productName
            $("#fieldProductQuantity").value = self.product.quantity
            $("#fieldProductChecked").value = self.product.checked
            $("#fieldProductList").value = self.product.list
        }
    }
    async save() {
        let productName = this.validateRequiredField('#fieldProductName', 'Nom')
        let quantity = this.validateRequiredField("#fieldProductQuantity", 'Quantité')
        let currentList = 1
        if ((productName != null) && (quantity != null) && (currentList != null)) {
            try {
                if (self.product) {
                    self.product.productName = productName
                    self.product.quantity = quantity
                    //self.product.checked = checked
                    //self.product.list = list
                    if (await this.quantity.update(self.product) === 200) {
                        this.toast("L'article a bien été modifé")
                        self.product = null
                        navigate('index')
                    } else {
                        this.displayServiceError()
                    }
                } else {
                    if (await this.quantity.insert(new Product(productName, quantity, true, false, currentList)) === 200) {
                        this.toast("L'article a bien été inséré")
                        navigate('index')
                    } else {
                        this.displayServiceError()
                    }
                }
            } catch (err) {
                console.log(err)
                this.displayServiceError()
            }
        }
    }
}

window.editController = new EditController()
