function loadCart() {
    let result = _loadCart()
    for(i in result){
        priceFM = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(result[i].price)
            // console.log(result[i].id);  
            html = `
                
            <div class="container">
                    <table>
                    <tr>
                    <td class="cart-image">
                        <a href="#">
                            <img src="${result[i].image}">
                        </a>
                    </td>
                    <td class="name-book">${result[i].name}</td>
                    <td >${result[i].author}</td>
                    <td class="price">${priceFM}</td>
                    
                    <td class="button-delete"><button id="${result[i].id}" type="button">
                        Xóa
                    </button></td>

                </table>
            </div>
            `
        
            
            document.getElementById('cart').innerHTML += html      
    }
    for(i in result) {
        let id = result[i].id
        let button = document.getElementById(id)
        button.onclick = function() {
            // console.log('delete product id:', id)
            // localStorage.removeItem()
            let index = result.findIndex(function(element){
                return element.id == id
            })
            console.log(index);
            result.splice(index, 1)
            _saveCart(result)
            window.location.reload()
        }
        
    }
}
setTimeout(loadCart, 200)
