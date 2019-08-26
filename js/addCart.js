function addToCart(product){
    //Add cart to firebase
        // let result = await firebase.firestore().collection("product").get();
        // // console.log(result);
        // let products = result.docs.map(function(doc){
        //     let product = doc.data()
        //     product.id = doc.id
        //     return product
        // })
        // await firebase.firestore().collection("cart").add({
        //     name: products[i].name,
        //     author: products[i].author,
        //     category: products[i].category,
        //     description: products[i].description,
        //     price: products[i].price,
        //     image: products[i].image,
        // })
        // window.location.reload()
    let cart = _loadCart()
    cart.push(product)
    _saveCart(cart)
}

function _loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    return cart instanceof Array
        ? cart
        : []
}

function _saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}
function _deleteCart(cart){
    localStorage.removeItem('cart')
}