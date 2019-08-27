async function loadHome() {
        let result = await firebase.firestore().collection('product').limit(12)
            .get()
        // console.log(result.docs.map(doc => {
        //     let product = doc.data()
        //     product.id = doc.id
        //     return product
        // }))

        let products = result.docs.map(function(doc){
            let product = doc.data()
            product.id = doc.id
            return product
        })
        
        // async function deleteApp(){
        //     firebase.firestore().collection("product").doc("1.2").delete()
        // }
        try{
            // let doc = await result.get()
            for(i in products){
                priceFM = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(products[i].price)
                html = `
                
                <div class="col-sm-3">
                <div class="single-item">
                <div class="single-item-header" >
                    
                        <img src="${products[i].image}" id="img${products[i].id}" >
                    
                </div>
                <div class="single-item-body">
                    <p class="single-item-title">
                    ${products[i].name}
                    </p>
                    <p class="single-item-author">
                    ${products[i].author}
                    </p>
                    <div class="single-item-cart">
                        <button type="button" src="${products[i].name}" id="cart${products[i].id}" class="btn btn-outline-info">Cart</button>
                        <span class="single-item-price">
                        ${priceFM}
                        </span>
                    </div>
                </div>
                </div>
                </div>
                        `
                
                document.getElementById("home").innerHTML += html
            }
            for(let i in products) {
                let id = products[i].id
                let button = document.getElementById("img"+id)
                button.onclick = async function change(_id) {
                    if(_id.target.src == products[i].image){
                        window.location = "product_detail.html?id=" + id
                    }
                }
                
            }
            for(let i in products) {
                let id = products[i].id
                let button = document.getElementById("cart"+id)
                button.onclick = async function change(_id) {
                    if(_id.target.id == "cart"+products[i].id){
                        // window.location = "cart.html?id=" + id
                        addToCart(products[i])
                        alert("Sản phẩm bạn chọn đã được thêm vào giỏ hàng!")
                    }
                }
                
            }
        }  catch (error){
                    console.log("Error");
                    console.log(error)
                }


    
}
setTimeout(loadHome, 200)

function signOut(){
    firebase.auth().signOut()
}

function myFunction() {
    var input = document.getElementById("Search");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('col-sm-3');
  
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(filter)) {
        nodes[i].style.display = "block";
      } else {
        nodes[i].style.display = "none";
      }
    }
  }