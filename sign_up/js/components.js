//lưu trữ html
let components = {}

components.signUp = `
<section class="sign-up-container">
<form id="form-sign-up" class="form-sign-up">
    <h2 class="form-title">Sign Up</h2>
    <div class="input-wrapper">
        <label for="name"><i class="fa fa-user"></i></label>
        <input type="text" name="name" id="name" placeholder="Your name">
    </div>
    <span class="message-erro" id="name-erro"></span>

    <div class="input-wrapper">
        <label for="email"><i class="fa fa-envelope"></i></label>
        <input type="text" name="email" id="email" placeholder="Your email">
    </div>
    <span class="message-erro" id="email-erro"></span>

    <div class="input-wrapper">
        <label for="password"><i class="fa fa-lock"></i></label>
        <input type="password" name="password" id="password" placeholder="Password">
    </div>
    <span class="message-erro" id="password-erro"></span>

    <div class="input-wrapper">
        <label for="password-Confirmation"><i class="fa fa-lock"></i></label>
        <input type="password" name="passwordConfirmation" id="password-Confirmation" placeholder="Password Confirmation">
    </div>
    <span class="message-erro" id="password-Confirmation-erro"></span>

    <div><button class="btn-primary" id="sign-up-btn">Registr</button></div>
    <div class="message-erro" id="sign-up-error"></div>
    <div class="message-success" id="sign-up-success"></div>
</form>
<div class="decoration-container">
    <img class="decoration-img" src="./images/signupDecoration.jpg" alt="This is sign up decoration">
    <div class="decoration-link-container">
        <a id="sign-in-link" href="#" class="decoration-link">Sign In</a>
    </div>
</div>
</section>`

components.signIn = `
        <section class="sign-up-container">
            <form id="form-sign-in" class="form-sign-up">
                <h2 class="form-title">Sign In</h2>
                <div class="input-wrapper">
                    <label for="email"><i class="fa fa-envelope"></i></label>
                    <input type="text" name="email" id="email" placeholder="Your email" >
                </div>
                <span class="message-erro" id="email-erro"></span>

                <div class="input-wrapper">
                    <label for="password"><i class="fa fa-lock"></i></label>
                    <input type="password" name="password" id="password" placeholder="Password">
                </div>
                <span class="message-erro" id="password-erro"></span>

                <div><button class="btn-primary" id="sign-in-btn">Login</button></div>
                <div class="message-erro" id="sign-in-error"></div>
            </form>

            <div class="decoration-container">
                <img class="decoration-img" src="./images/signupDecoration.jpg" alt="This is sign up decoration">
                <div class="decoration-link-container">
                    <a id="sign-Up-link" href="#" class="decoration-link">Sign Up</a>
                </div>
            </div>
        </section>
        `

components.chat = `<section class="aside-left">
<div class="title">Conversations</div>

<form id="form-add-conversation" class="form-add-conversation">
    <div class="input-wrapper">
        <label for="title"><i class="fa fa-group" aria-hidden="true"></i></label>
        <input type="text" name="title" id="title">
    </div>
    <div class="mesage-error" id="title-error"></div>

    <div class="input-wrapper">
        <label for="friend-email"><i class="fa fa-envelope" aria-hidden="true"></i></label>
        <input type="text" name="friendEmail" id="friend-email">
    </div>
    <div class="mesage-error" id="friend-email-error"></div>

    <button class="btn-primary" id="btn-add-conversation">Add</button>
</form>

<div id="conversations-list" class="conversations-list">
    <div class="conversation">
    </div>
</div>
</section>

<section class="chat-container">
<div class="title" id="chat-title">Chat: Title 1</div>

<div class="messages-list" id="messages-list">

</div>

<form action="" class="form-add-message" id="form-add-message">
    <div class="input-wrapper">
        <input type="text" name="messageContent" id="">
    </div>

    <button class="btn-primary">Send</button>
</form>
</section>

<section class="aside-right">
<div class="title" id="chat-detail">Detail</div>

<div class="conversation-detail">
    <div class="conversation-members" id='chat-member'>

    </div>

    <div class="conversation-created-at" id='chat-created-at'>
    </div>
</div>
</section>
`