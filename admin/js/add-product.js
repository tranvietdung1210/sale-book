async function addProduct(){
    await firebase.firestore().collection("product").add({
        name: document.getElementById("name").value,
        author: document.getElementById("author").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value,
    })
    window.location.reload()
}