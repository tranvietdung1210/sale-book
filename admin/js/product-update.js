async function showUpdateProduct()  {
    var id = new URLSearchParams(location.search).get('id')
    if(id) {
        let doc = await firebase.firestore().collection('product')
            .doc(id).get()
        if(doc.exists) {
            let product = doc.data()
            product.id = doc.id
            console.log(doc.id);
            update = `
                <label for="name">Tên sách</label>
                <input type="text" id="name" name="name" value="${product.name}">
            
                <label for="author">Tên tác giả</label>
                <input type="text" id="author" name="author" value="${product.author}" >
            
                <label for="image">Hình ảnh</label>
                <input type="text" id="image" name="image" value="${product.image}">

                <label for="category">Thể loại</label>
                <input type="text" id="category" name="category" value="${product.category}">

                <label for="price">Giá</label>
                <input type="number" id="price" name="price" value="${product.price}">

                <label for="description">Mô tả</label>
                <input type="text" id="description" name="description" value="${product.description}">
                    `
            
            document.getElementById("update").innerHTML = update
        }

    } 
    
    
}

// async function deleteApp(i){
//     for(j in firebase.firestore().collection('product')){
//         console.log(j);
//         if (j.data() = i.data){
//             await firebase.firestore().collection('product').doc(j).delete()
//         }
//     }
// }
setTimeout(showUpdateProduct, 200)

function updateProduct(){
    newName = document.getElementById("name").value
    newauthor = document.getElementById("author").value
    newCategory = document.getElementById("category").value
    newDescription = document.getElementById("description").value
    newPrice = document.getElementById("price").value
    newImage = document.getElementById("image").value

    var id = new URLSearchParams(location.search).get('id')
    if(id) {
        let doc = firebase.firestore().collection('product')
            .doc(id).get()
        firebase.firestore().collection("product").doc(id).update({
        "name" : newName,
        "author" : newauthor,
        "category" : newCategory,
        "description" : newDescription,
        "price" : newPrice,
        "image" : newImage
    })
}
}