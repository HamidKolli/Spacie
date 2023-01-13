const { ObjectId } = require("mongodb");

class MessageBase {
  constructor(db) {
    this.db = db;
  }

  create(message,priv,image,sender,message_id) {
    return new Promise((resolve, reject) => {
      let doc = {
        message : message,
        priv : priv,
        image : image,
        sender : sender,
        date: Date.now(),
        stars : [],
      }
      if(message_id)
        doc["message_id"] = message_id

      this.db
        .insertOne(doc)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  delete(message_id) {
    return new Promise((resolve, reject) => {
      this.db
        .deleteOne({ _id: ObjectId(message_id) })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  find(login) {
    return new Promise((resolve, reject) => {
      this.db
        .findOne({ _id: login })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  

  update(message_id, doc) {
    return new Promise((resolve, reject) => {
      console.log("bdd " +message_id + " " + doc)
      this.db
        .updateOne(
          { _id: message_id },
          {
            $set: doc,
          }
        )
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
        console.log('getAllBdd')
        this.db
        .find({})
        .sort({date:-1})
        .toArray()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
       });
  }

  getMessageByMotif(message){
    
    return new Promise((resolve, reject) => {
      
      this.getAll()
      .then((res) => resolve(res.filter(msg => msg.message.includes(message))))
      .catch((err) => reject(err));
     });
  }

  getMessageById(message_id){
    return new Promise((resolve, reject) => {
      this.db
      .findOne( {_id: new ObjectId(message_id)})
      .then((res) => resolve(res))
      .catch((err) => reject(err));
     });
  }
}

module.exports = {MessageBase}