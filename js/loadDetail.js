async function loadCategoryProduct() {
    var id = new URLSearchParams(location.search).get('id')
    if(id) {
        let products = await firebase.firestore().collection('product')
            .doc(id).get()
        if(products.exists) {
            let product = products.data()
            product.id = products.id
            priceFM = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(product.price)
            html = `
                
            <div class="container">
                <div class="row ">
                    <div class="left-product-detail col-3">
                        <img src="${product.image}">
                    </div>
                    <div class="right-product-detail col-9">
                        <div class="name-product-detail">
                            <span>${product.name}</span>
                        </div>
                        <div class="author-product-detail">
                            <span>${product.author}</span>
                        </div>
                        <div class="price-product-detail">
                            <span>${priceFM}</span>
                        </div>
                        <div class="description-product-detail">
                            <span>${product.description}
                            </span>
                        </div>
                        <div class="cart-product-detail">
                            
                        <div class="">
                                <button type="button" src="${product.name}" id="cart${product.id}" class="btn btn-outline-info">Cart</button>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="space35">&nbsp;</div>

            <div class="">
                <div class="review-product-head">
                    GIỚI THIỆU SÁCH
                </div>
                <div class="review-product-detail">
                    <span>
                    ${product.description}
                    </span>
                </div>
            </div>
            </div>
            `
            document.getElementById('details').innerHTML = html

            let button = document.getElementById("cart"+id)
            button.onclick = async function change(_id) {
                if(_id.target.id == "cart"+product.id){
                    // window.location = "cart.html?id=" + id
                    addToCart(product)
                }
            }
        }     
    }
}
setTimeout(loadCategoryProduct, 200)


