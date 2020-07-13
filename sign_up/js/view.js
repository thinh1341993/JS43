// hiển thị, xử lý giao diện
let view = {}

view.showScreen = async function(screenName) {
    let content = document.getElementById('content')

    switch (screenName) {
        case 'signIn':
            //hiển thị giao diện của signIn
            content.innerHTML = components.signIn
            let signUpLink = document.getElementById('sign-Up-link')
            signUpLink.onclick = function() {
                view.showScreen('signUp')
            }

            //xử lý form sign-in
            let formSignIn = document.getElementById('form-sign-in')
            formSignIn.onsubmit = function(event) {
                event.preventDefault()
                let email = formSignIn.email.value
                let password = formSignIn.password.value

                let validateResult = [
                    view.validate(email != '', 'email-erro', 'Input your email'),
                    view.validate(password != '', 'password-erro', 'Input your password')
                ]
                if (isPassed(validateResult)) {
                    //gửi dữ liệu
                    controller.signIn(email, password)
                }
            }
            break

        case 'signUp':
            //hiển thị giao diện của signUp
            content.innerHTML = components.signUp

            // thêm sự kiện click cho sign-in-link --> giao diện sign in
            let signInLink = document.getElementById('sign-in-link')
            signInLink.onclick = function() {
                view.showScreen('signIn')
            }

            //xử lý form-sign-up
            let formSignUp = document.getElementById('form-sign-up')
            formSignUp.onsubmit = function(even) {
                event.preventDefault() // chặn mặc định ko cho button reload lại trang
                    //lấy dữ liệu từ form
                let name = formSignUp.name.value.trim()
                let email = formSignUp.email.value.trim()
                let password = formSignUp.password.value.trim()
                let passwordConfirmation = formSignUp.passwordConfirmation.value.trim()

                // kiểm tra  dữ liệu
                let validateResult = [
                    view.validate(name != '', 'name-erro', 'Input your name'),
                    view.validate(email != '' && validateEmail(email), 'email-erro', 'Input your email'),
                    view.validate(password != '', 'password-erro', 'Input your password'),
                    view.validate(passwordConfirmation != '' && password == passwordConfirmation, 'password-Confirmation-erro', 'password Confirmation is not match')
                ]

                console.log(validateResult)
                console.log(isPassed(validateResult))
                    // gửi dữ liệu và lưu trong cơ sở dữ liệu
                    //nếu dữ liệu thoả mãn --> gửi dữ liệu
                if (isPassed(validateResult)) {
                    // gửi dữ liệu qua controller
                    controller.signUp(name, email, password)
                }

            }
            break

        case "chat":
            //hiển thị giao diện chat
            content.innerHTML = components.chat

            //xử lý form thêm conversation
            let formAddConversation = document.getElementById('form-add-conversation')
            formAddConversation.onsubmit = function(event) {
                event.preventDefault()
                    //lấy title, friendEmail từ form-add-conversation
                let title = formAddConversation.title.value.trim()
                let friendEmail = formAddConversation.friendEmail.value
                    //kiểm tra title, friendEmail
                let validateResult = [
                    view.validate(title != '', 'title-error', 'Invalid title'),
                    view.validate(friendEmail != '' && validateEmail(friendEmail), 'friend-email-error', 'Invalid friend Email'),
                ]

                console.log(validateResult)
                console.log(isPassed(validateResult))
                    // gửi dữ liệu và lưu trong cơ sở dữ liệu
                    //nếu dữ liệu thoả mãn --> gửi dữ liệu
                if (isPassed(validateResult)) {
                    // gửi dữ liệu qua controller
                    controller.addConversation(title, friendEmail)
                }
                //gửi lên controller để xử lý
            }

            //xử lý form add message (gửi tin nhắn)
            let formAddMessage = document.getElementById('form-add-message')
            formAddMessage.onsubmit = function(event) {
                    event.preventDefault()
                    let messageContent = formAddMessage.messageContent.value.trim()
                    if (messageContent == "") return

                    controller.sendMessage(messageContent)

                    formAddMessage.reset()
                }
                //lấy conversation
            await controller.loadConversations()

            //hiển thị conversation
            view.showConversation()
                //hiển thị cuộc hội thoại hiện tại
            view.showCurrentConversation()

            //lắng nghe sự thay đổi từ phía database
            controller.listenRealtimeUpdate()
            break
    }
}

view.showConversation = function() {
    //lấy dữ liệu từ model và hiển thị lên giao diện
    let conversationsList = document.getElementById("conversations-list")

    conversationsList.innerHTML = ''
    for (let conversation of model.conversations) {
        let html = `
        <div class="conversation" id="conversation-${conversation.id}">
        <p class="conversation-title">${conversation.title}</p>
        <p class="conversation-members">${conversation.users.length} ${(conversation.users.length == 1) ? 'member' : 'members'}</p>
    </div>
        `

        conversationsList.innerHTML += html
    }

    //bắt sự kiện cho từng conversation
    for (let conversation of model.conversations) {
        let conversationDom = document.getElementById("conversation-" + conversation.id)
        conversationDom.onclick = function() {
            //gán lại current conversation
            model.saveCurrentConversation(conversation)
                //hiển thị lại current conversation
            view.showCurrentConversation()
        }
    }
}

//hiển thị các tin nhắn, thông tin chi tiết của conversation mà người dùng chọn
view.showCurrentConversation = function() {

    if (model.currentConversation == null) return

    //hiển thị tin nhắn
    //lấy messages-list
    let currentEmail = firebase.auth().currentUser.email
    let messagesList = document.getElementById("messages-list")
    messagesList.innerHTML = ''
    for (let message of model.currentConversation.message) {
        let isYourMessage = (message.owner == currentEmail) ? 'your' : ''
        let html = `
        <div class="message ${isYourMessage}">
        <span>${message.content}</span>
    </div>
        `
        messagesList.innerHTML += html
    }
    //hiển thị thông tin chi tiết
    let chatTitle = document.getElementById('chat-title')

    chatTitle.innerHTML = model.currentConversation.title

    let member = document.getElementById('chat-member')
    member.innerHTML = ''
    for (let user of model.currentConversation.users) {
        member.innerHTML += `<p>${user}</p>`
    }

    let createdAt = document.getElementById('chat-created-at')
    createdAt.innerHTML = model.currentConversation.createAt
}

// kiểm tra nhập đẻ báo lỗi
view.validate = function(condition, errortag, message) {
    if (!condition) {
        // document.getElementById(errortag).innerHTML = message
        view.setText(errortag, message)
        return false
    } else {
        // document.getElementById(errortag).innerHTML = ''
        view.setText(errortag, '')
        return true
    }
}

view.setText = function(tagId, text) {
    document.getElementById(tagId).innerHTML = text
}

view.setActive = function(tagId, active) {
    document.getElementById(tagId).disabled = !active
}