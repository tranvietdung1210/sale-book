view = {}
function thanhToan() {
    let result = _loadCart()
    let totalPrice = 0
    for(let i=0; i in result; i++){
        totalPrice = totalPrice + result[i].price
    }
    priceTT = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(totalPrice)
    for(i in result){
        priceFM = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(result[i].price)
            // console.log(result[i].id);
            html = `
                    <tr>
                        <td class="cart-image">
                            <img src="${result[i].image}">
                        </td>
                        <td class="name-book">${result[i].name}</td>
                        <td class="amount">1</td>
                        <td class="price">${priceFM}</td>
                    </tr>
            </div>
            `
            document.getElementById('thanhtoan').innerHTML += html      
            document.getElementById('totalPrice').innerHTML = priceTT    
    }
    if(result.length == 0 ){
        document.getElementById('addBill').setAttribute('disabled', true)
        document.getElementById("return").innerText="Cảm ơn bạn đã đặt hàng, chúng tôi sẽ sớm liên hệ cho bạn để xác nhận đơn hàng!"
    }
}
setTimeout(thanhToan, 200)
async function addBill(){
    let form = document.getElementById('form-thanhtoan')
    let registerInfo = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
    }
    if (registerInfo.name) { // firstname != 0 !=null !=undefind !=false !=NaN
        view.setText('name-error', '')
    }
    else {
        view.setText('name-error', 'Invalid name!')
    }
    if (registerInfo.email) { // firstname != 0 !=null !=undefind !=false !=NaN
        view.setText('email-error', '')
    }
    else {
        view.setText('email-error', 'Invalid email!')
    }
    if (registerInfo.phone) { // firstname != 0 !=null !=undefind !=false !=NaN
        view.setText('phone-error', '')
    }
    else {
        view.setText('phone-error', 'Invalid phone!')
    }
    if (registerInfo.address) { // firstname != 0 !=null !=undefind !=false !=NaN
        view.setText('address-error', '')
    }
    else {
        view.setText('address-error', 'Invalid address!')
    }
    if (registerInfo.name
        && registerInfo.email
        && registerInfo.phone
        && registerInfo.address)
        {
            let result = _loadCart()
            let totalPrice = 0
            for(let i=0; i in result; i++){
                totalPrice = totalPrice + result[i].price
            }
            priceTT = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(totalPrice)
            await firebase.firestore().collection("bill").add({
                email: document.getElementById("email").value,
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                address: document.getElementById("address").value,
                option: document.getElementById("option").value,
                price: priceTT,
            })
            
            _deleteCart()
            await window.location.reload()
            
        }
}

view.setText = function (id, text) {
    document.getElementById(id).innerText = text
}
