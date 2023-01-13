const notificationsBase = require("./baseBDD");
const {getCollection} = require("../../../connectionMongoDB.js")
const { ObjectId, ObjectID } = require("mongodb");
class Notifications {
  constructor() {
  }

  setDataBase(db) {
    this.notif = new  notificationsBase.NotificationsBase(getCollection("Notifications",db));
  }


  addNotif(login1, message,demande_id) {
    return new Promise((resolve, reject) => {
      const doc = {
        notifier: login1,
        message: message,
        date : Date.now()
      }

      if (demande_id) {
        doc.demande_id = new ObjectId(demande_id);
      }
      this.notif.create(doc).then((res) => resolve(res)).catch((err) => reject(err));
    })
  }

  getAllNotif(login) {
    return new Promise((resolve, reject) => {
      this.notif
        .find({ notifier: login })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
  getNotifications(notifier,demande){
    return new Promise((resolve, reject) => {
      this.notif.find({ notifier: notifier,demande_id : new ObjectId(demande)  })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    })
  }

  deleteNotification(id){
    return new Promise((resolve, reject) => {
      this.notif.delete(id).then((res) => resolve(res)).catch((err) => reject(err));
    })
  }
}

module.exports = {Notifications}
