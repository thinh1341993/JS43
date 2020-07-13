// // đồng bộ - bất đồng bộ
// // console.log('hello world')
// // setTimeout(function() {
// //         console.log('this is my program')
// //         setTimeout(function() {
// //             console.log('end program')
// //         }, 2000)
// //     },
// //     3000)

// // xử lý bất đồng bộ --> làm cho quy trình trở lên đồng bộ

// //xử lý lỗi
// //chương trình gặp lỗi thì dừng
// // try {
// // //đoạn chương trình có thể gây lỗi
// // } catch (error) {
// // //xử lý lỗi
// // }

// // let input = prompt('input id of element to change content')
// // let element = document.getElementById(input)
// // try {
// //     element.innerHTML = 'content changed'
// // } catch (error) {
// //     console.log(error)
// // }
// // console.log('end program')

// // let input = Number(prompt('input a number'))
// // try {
// //     if (input > 0) {
// //         console.log(input * input)
// //     } else {
// //         throw new Error('number must be greater than 0')
// //     }
// // } catch (error) {
// //     // console.log(error)
// //     console.error(error)
// // }
// // console.log('end program')

// //CURD
// //create
// async function createData(data = {}) {
//     let newData = await firebase.firestore().collection('sandals').add({
//         brand: 'Thượng Đình',
//         color: 'purple',
//         size: 45,
//         price: 30
//     })

//     console.log(newData)
// }

// async function readData() {
//     // //lấy ra tất cả bản ghi nằm trong sandals
//     // let result = await firebase.firestore().collection('sandals').get()
//     // for (let doc of result.docs) {
//     //     console.log(doc.data())
//     // }

//     //lấy ra những bản ghi thoả mãn điều kiện
//     let result = await firebase.firestore().collection('sandals').where('price', '<=', 40).where('brand', "==", 'Thượng Đình').get()
//     for (let doc of result.docs) {
//         console.log(doc.data())
//     }

// }

// //delete
// async function deleteData(docId) {
//     await firebase.firestore().collection('sandals').doc(docId).delete()
// }

// //delete nhiều data
// async function deleteAllData() {
//     //get all sandals
//     let result = await firebase.firestore().collection('sandals').get()
//         //delete each sandal with id
//     for (let doc of result.docs) {
//         await deleteData(doc.id)
//     }
// }

// //update data
// async function updateData(docId) {
//     await firebase.firestore().collection('sandals').doc(docId).update({
//         brand: 'Nike',
//         price: 100
//     })
// }

//listen for realtime update
firebase.firestore().collection("conversations").onSnapshot(function(snapshot) {
    if (isFirstRun) {
        isFirstRun = false
        return
    }
    snapshot.docChange().forEach(function(change) {
        console.log(change.type)
        console.log(change.doc.data())
    })

})