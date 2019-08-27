async function showProduct()  {
    let result = await firebase.firestore().collection("bill").get();
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
        let datas = _loadTable()
        // let doc = await result.get()
        for(i in products){
            let data = datas.find(d => d.id == products[i].id)
            let confirmed = data && data.confirmed
            html = `
            <tr id="">
                <th>${parseInt(i,10)+1}</th>
                <td>${products[i].name}</td>
                <td>${products[i].email}</td>
                <td>${products[i].phone}</td>
                <td>${products[i].option}</td>
                <td>${products[i].address}</td>
                <td>${products[i].price}</td>
                <td><button class="btn btn-success" id="confirm${products[i].id}" type="button">
                    ${confirmed ? 'Đã xác nhận' : 'Xác nhận'}
                </button></td>
                <td><button class="btn btn-danger" id="delete${products[i].id}" type="button">
                    Xóa
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
                await firebase.firestore().collection("bill").doc(id).delete()
                window.location.reload()
            }
        }
            
        

    } catch (error){
        console.log("Error",error);
    }
    for(let i in products) {
        let id = products[i].id
        let button = document.getElementById("confirm"+id)
        button.onclick = async function() {
            document.getElementById("confirm"+id).innerHTML = "Đã xác nhận"
            _saveTable({ id, confirmed: true })
        }
    }
    
}

function _saveTable(data) {
    let datas = _loadTable()
    let foundIndex = datas.findIndex(d => d.id == data.id)
    if(foundIndex < 0) {
        datas.push(data)
    } else {
        datas[foundIndex] = data
    }
    localStorage.setItem('table-bill', JSON.stringify(datas))
}

function _loadTable() {
    let dataStr = localStorage.getItem('table-bill')
    return dataStr ? JSON.parse(dataStr) : []
}
setTimeout(showProduct, 200)
