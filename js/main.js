controller = {}
view = {}
controller.logIn = async function (logInInfo) {
    document.getElementById('log-in-btn').setAttribute('disabled', true)
    try {
        let result = await firebase.auth().signInWithEmailAndPassword(
            logInInfo.email, logInInfo.password
        )
        // 1. Nguoi dung chua verify email --> bao loi ng dung verify
        // 2. da verify --> dieu huong sang man hinh chat
        // signIn >> authStateChanged >> authStateChangedHandler >> load
        if(!result.user.emailVerified){
            throw new Error('Email not verified!')
        }

    } catch (error) {
        console.log(error);
        document.getElementById('log-in-error').innerText = error.message
        document.getElementById('log-in-btn').removeAttribute('disabled')
    }

}

controller.register = async function (registerInfo) {
    document.getElementById('register-btn').setAttribute('disabled', true)
    try {
        // ham createUser la 1 ham bat dong bo nen can phai await no
        await firebase.auth().createUserWithEmailAndPassword(registerInfo.email
            , registerInfo.password)
        await firebase.auth().currentUser.updateProfile({
            displayName: registerInfo.firstname + " " + registerInfo.lastname
        })
        await firebase.auth().currentUser.sendEmailVerification()
        view.setText('register-error', '')
        view.setText('register-success', 'A confirmation link has been sended to your email')
    } catch (error) {
        view.setText('register-success', '')
        view.setText('register-error', error.message)
    }
    document.getElementById('register-btn').removeAttribute('disabled')
}

function initLogin(){

//Case Login
    let form = document.getElementById('form-log-in')
    form.onsubmit = formSubmitHandler

    function formSubmitHandler(e) {
        e.preventDefault()
        // 1. lay du lieu nguoi dung dien vao form
        // 2. validate thong tin
        // 3. gui thong tin nguoi dung len sever
        let logInInfo = {
            email: form.email.value,
            password: form.password.value
        }

        if (logInInfo.email) {
            // xoa message loi
            // document.getElementById('email-eror').innerText = ""
            document.getElementById('email-error').innerText = ""
        }
        else {
            // hien thi loi
            // document.getElementById('email-eror').innerText = "Invalid email!"
            document.getElementById('email-error').innerText = 'Invalid email!'
        }

        if (logInInfo.password) {
            //xoa message loi
            document.getElementById('password-error').innerText = ""
        }
        else {  
            // hien thi loi
            document.getElementById('password-error').innerText = 'Invalid password!'
        }

        // 3. Gui thong tin nguoi dung len sever    
        if (logInInfo.email && logInInfo.password) {
            controller.logIn(logInInfo)
        }
    }

    firebase.auth().onAuthStateChanged(authStateChangedHandler)
    async function authStateChangedHandler(user) {
        if (user && user.emailVerified) {
            window.location = "../admin/product.html"
            //authenticated
            // await firebase.firestore().collection('conversation').get()
        }

    }
}
function initRegister(){
// Case Register
    let form = document.getElementById('form-register')
    form.onsubmit = formSubmitHandler

    function formSubmitHandler(e) {
        e.preventDefault()
        // 1. Lay du lieu ng dung dien voa
        let registerInfo = {
            firstname: form.firstname.value,
            lastname: form.lastname.value,
            email: form.email.value,
            password: form.password.value,
            confirmPassword: form.confirmPassword.value
        }
        // 2. validate registerInfo
        if (registerInfo.firstname) { // firstname != 0 !=null !=undefind !=false !=NaN
            view.setText('firstname-error', '')
        }
        else {
            view.setText('firstname-error', 'Invalid firstname!')
        }
        if (registerInfo.lastname) {
            view.setText('lastname-error', '')
        }
        else {
            view.setText('lastname-error', 'Invalid lastname!')
        }
        if (registerInfo.email) {
            view.setText('email-error', '')
        }
        else {
            view.setText('email-error', 'Invalid email!')
        }
        if (registerInfo.password) {
            view.setText('password-error', '')
        }
        else {
            view.setText('password-error', 'Invalid password!')
        }
        if (registerInfo.confirmPassword && registerInfo.password == registerInfo.confirmPassword) {
            view.setText('confirm-password-error', '')
        }
        else {
            view.setText('confirm-password-error', 'Invalid confirm password!')
        }
        //3. gui thong tin ng dung len sever
        if (registerInfo.firstname
            && registerInfo.lastname
            && registerInfo.email // validateEmail(registerInfo.email)
            && registerInfo.password
            && registerInfo.confirmPassword
            && registerInfo.password == registerInfo.confirmPassword)
            controller.register(registerInfo)
    }

}
view.setText = function (id, text) {
    document.getElementById(id).innerText = text
}
function logOut(){
    firebase.auth().signOut()
    window.location = "../html/home.html"
}



