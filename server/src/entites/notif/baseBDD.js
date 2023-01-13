const { ObjectId } = require("mongodb");
class NotificationsBase {
    constructor(db) {
      this.db = db;
    }
  
    create(doc) {
      return new Promise((resolve, reject) => {
        doc.date = new Date()
        this.db
          .insertOne(doc)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    }
  
    delete(id) {
      return new Promise((resolve, reject) => {
        this.db
          .deleteOne({ _id: new ObjectId(id) })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    }
  
 
  
    find(doc) {
      return new Promise((resolve, reject) => {
        this.db
          .find(doc,{})
          .sort({date:-1})
          .toArray()
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    }
  
  
  }
  
module.exports = {NotificationsBase}