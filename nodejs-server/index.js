const admin = require('firebase-admin')
const express = require('express')
const app = express()

var serviceAccount = require("./messenger-776c7-firebase-adminsdk-4iiv7-d7725f2209.json");
app.use(express.json())
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


app.post('/send-noti', (req, res) => {
    console.log(req.body)
    const message = {
        notification: {
            title: req.body.userName,
            body: req.body.message
        },
        tokens: req.body.tokens
    }

    admin.messaging().sendMulticast(message).then(res => {
        console.log('send success')
    }).catch(err => {
        console.log(err)
    })
})

app.listen(3000, () => {
    console.log('surver running')
})