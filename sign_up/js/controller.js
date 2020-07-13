// điều hương view and model
let controller = {}
const NAME_COLLECTION = 'conversations'
controller.signUp = async function(name, email, password) {
    //xí xoá thông báo lỗi và thành công ở quá trinhg sign up cũ
    // document.getElementById("sign-up-error").innerHTML = ""
    // document.getElementById("sign-up-success").innerHTML = ""
    view.setText('sign-up-error', '')
    view.setText('sign-up-success', '')
    view.setActive('sign-up-btn', false)
    try {
        //tạo tài khoản --> tự động đăng nhập --> currentUser
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            //thay đổi displayname
        await firebase.auth().currentUser.updateProfile({
                displayName: name
            })
            // xác thực tài khoản
        await firebase.auth().currentUser.sendEmailVerification()

        //thông báo đăng ký thành công
        view.setText('sign-up-success', 'an email verification has been sent')
    } catch (error) {
        // document.getElementById('sign-up-error').innerHTML = error.message
        view.setText('sign-up-error', error.message)
        view.setActive('sign-up-btn', true)
            // console.log('kết thúc việc đăng ký tài khoản')   
    }
}

controller.signIn = async function(email, password) {
    //xí xoá lỗi
    view.setText('sign-in-error', '')
    view.setActive('sign-in-btn', false)
        // signInWithEmailAndPassword(email, password)
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            // console.log('sign in successfully')
            //chuyển qua giao diện chat

        // view.showScreen('chat')
    } catch (error) {
        view.setText('sign-in-error', error.message)
    }

    view.setActive('sign-in-btn', true)
}

controller.loadConversations = async function() {
    //load dữ liệu từ firebase
    let currentEmail = firebase.auth().currentUser.email
    let result = await firebase.firestore()
        .collection('conversations')
        .where('users', "array-contains", currentEmail)
        .get()
    let conversations = []
    for (let doc of result.docs) {
        conversations.push(refineData(doc))
    }
    //cache dữ liệu vào model
    model.saveConversation(conversations)

    //gán 1 conversation nào đó cho currenConversation
    if (conversations.length > 0) {
        //gán currenConversation là phẩn tử conversation đầu tiên
        model.currentConversation = model.conversations[0]
    }
}

controller.addConversation = async function(title, friendEmail) {
    try {
        //kiểm tra friendEmail
        //nhập vào chính email người dùng hiện tại
        let currentEmail = firebase.auth().currentUser.email
        if (friendEmail == currentEmail) {
            throw new Error('Invalid email')
        }
        //nhập vào email không tồn tại trong hệ thống
        let signInMethods = await firebase.auth().fetchSignInMethodsForEmail(friendEmail)
        if (signInMethods.length == 0) {
            throw new Error("Your friend email doesn't exist")
        }

        //thêm vào collection conversation 1 conversation mới
        let newConversation = {
            title: title,
            messages: [],
            users: [
                currentEmail,
                friendEmail
            ],
            createAt: new Date().toLocaleString()
        }

        await firebase.firestore().collection("conversations").add(newConversation)
            // newConversation.id = result.id

        // // cache newConversation vào trong model
        // model.updateConversation(newConversation)

        // //hiển thị lại các conversation
        // view.showConversation()

    } catch (error) {
        view.setText("friend-email-error", error.message)
    }

}

controller.sendMessage = async function(messageContent) {
    // console.log(messageContent)
    let currentEmail = firebase.auth().currentUser.email
    let message = {
        content: messageContent,
        owner: currentEmail,
        createdAt: new Date().toLocaleString()
    }

    //cập nhật mesage vào trong curentConversation trên firestore

    await firebase
        .firestore()
        .collection(NAME_COLLECTION)
        .doc(model.currentConversation.id)
        .update({
            message: firebase.firestore.FieldValue.arrayUnion(message)
        })
}

controller.listenRealtimeUpdate = function() {
    let isFirstRun = true
    firebase.firestore().collection(NAME_COLLECTION).onSnapshot(function(snapshot) {
        if (isFirstRun) {
            isFirstRun = false
            return
        }

        snapshot.docChanges().forEach(function(change) {
            if (change.type == 'added') {
                console.log('ko chay dc')
                    //refine data
                let conversation = refineData(change.doc)

                //cập nhật vào trong model
                model.updateConversation(conversation)

                //Hiển thị ra màn hình
                view.showConversation()
            } else if (change.type == 'modified') {
                //refine data
                let conversation = refineData(change.doc)

                //cập nhật vào trong model
                model.updateConversation(conversation)

                //Hiển thị ra màn hình
                view.showCurrentConversation()
            }
        })
        console.log(snapshot.docChanges())
    })
}