let model = {
    conversations: [],
    currentConversation: null,
}

model.saveConversation = function(conversations) {
    model.conversations = conversations
}

model.saveCurrentConversation = function(conversation) {
    model.currentConversation = conversation
}

model.updateConversation = function(conversation) {
    // //nếu thêm 1 conversation mới
    // model.conversations.push(conversation)

    // model.saveCurrentConversation(conversation)
    //     //nếu chỉnh sửa thông tin của conversation

    //tìm hiểu xem conversation truyền vào có tồn tại trong model hay không
    let foundIndex = model.conversations.findIndex(function(item) {
        return item.id == conversation.id
    })

    if (foundIndex >= 0) {
        //nếu tìm thấy  conversation -> thay đổi các giá trị của conversation cũ
        model.conversations[foundIndex] = conversation
    } else {
        //nếu không tìm thấy conversation -> thêm conversation vào trong models
        model.conversations.push(conversation)
    }
    model.saveCurrentConversation(conversation)
}