class EditController extends BaseFormController {
    constructor() {
        super()
        if (indexController.selectedProduct) {
            self.product = indexController.selectedProduct
            indexController.selectedProduct = null
            $('#editTitle').innerText = self.product.toString()
            $("#fieldProductLabel").value = self.product.label
            $("#fieldProductQuantity").value = self.product.quantity
            $("#fieldProductChecked").value = self.product.checked
            $("#fieldProductList").value = self.product.list
        }
    }
    async save() {
        let label = this.validateRequiredField('#fieldProductlabel', 'Nom')
        let quantity = this.validateRequiredField("#fieldProductQuantity", 'Quantité')
        let currentList = 1
        if ((label != null) && (quantity != null) && (currentList != null)) {
            try {
                if (self.product) {
                    self.product.label = label
                    self.product.quantity = quantity
                    self.product.list = currentList
                    if (await this.model.update(self.product) === 200) {
                        this.toast("L'article à bien été modifié")
                        self.product = null
                        navigate('index')
                    } else {
                        this.displayServiceError()
                    }
                } else {
                    if (await this.model.insert(new Product(label, quantity, true, false, currentList)) === 200) {
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
