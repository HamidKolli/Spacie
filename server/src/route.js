const {userRoute}  = require("./entites/user/rooter")
const {messageRoute}  = require('./entites/message/rooter')
const {notificationRoute}  = require('./entites/notif/rooter')
const {friendRoute}  = require('./entites/friend/rooter')


function router(app) {
  return new Promise((resolve, reject) => {
    messageRoute().then(message => {
      app.use('/api/message', message)
      friendRoute().then(friend => {
        app.use('/api/friend',friend )
        notificationRoute().then(notif => {
          app.use('/api/notification', notif)
          userRoute().then(user => {
            app.use('/api/user', user)
            resolve()
          })
        })
      })
    })
  })    
}

exports.default = router
