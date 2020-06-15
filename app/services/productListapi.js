const serviceBaseUrlList = "http://localhost:5555/productList"
class ProductListAPI {
    getAll() {
        return fetchJSON(serviceBaseUrlList)
    }
    get(id) {
        return fetchJSON(`${serviceBaseUrlList}/${id}`)
    }
    delete(id) {
        return fetch(`${serviceBaseUrlList}/${id}`, { method: 'DELETE' })
    }
    insert(product) {
        return fetch(serviceBaseUrlList, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
    }
    update(product) {
        return fetch(serviceBaseUrlList, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
    }
}
