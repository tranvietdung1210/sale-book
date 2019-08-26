async function showProduct()  {
    let result = await firebase.firestore().collection("product").get();
    // console.log(result);
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
            html = `
            <tr id="">
                <th>${parseInt(i,10)+1}</th>
                <td>${products[i].name}</td>
                <td>${products[i].author}</td>
                <td class="cart-image"><img src="${products[i].image}"</td>
                <td>${products[i].category}</td>
                <td>${products[i].price}</td>
                <td><button id="delete${products[i].id}" type="button">
                    Xóa
                </button></td>
                <td><button id="update${products[i].id}" type="button">
                    Sửa
                </button></td>
            </tr>

                    `
            
            document.getElementById("html").innerHTML += html
        }
        for(let i in products) {
            let id = products[i].id
            let button = document.getElementById("delete"+id)
            button.onclick = async function() {
                // console.log('delete product id:', id)
                await firebase.firestore().collection("product").doc(id).delete()
                window.location.reload()
            }
            
        }
        for(let i in products) {
            let id = products[i].id
            let button = document.getElementById("update"+id)
            button.onclick = async function() {
                // console.log('delete product id:', id)
                window.location = "product-update.html?id="+id
            }
            
        }

    } catch (error){
        console.log("Error",error);
    }
    
}
setTimeout(showProduct, 200)