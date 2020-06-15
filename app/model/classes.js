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
class ProductList {
    constructor(shop, date, archived) {
        this.shop = shop;
        this.date = date;
        this.archived = archived;
    }
    toString() {
        return `${this.shop + " " + this.date}`
    }
}