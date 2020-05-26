class Product {
    constructor(productName, quantity, checked, list) {
        this.productName = productName;
        this.quantity = quantity;
        this.checked = checked;
        this.list = list
    }
    toString() {
        return `${this.productName}`
    }
}