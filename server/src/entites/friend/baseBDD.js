const { ObjectId } = require("mongodb");

class FriendsBase {
  constructor(db) {
    this.db = db;
  }

  create(login1, login2) {
    return new Promise((resolve, reject) => {
      
      this.db
        .insertOne({
          emeteur: login1,
          recepteur: login2,
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: new ObjectId(id) })
      .then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      }
      );
    })
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.db
        .deleteOne({ _id: id })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

}

module.exports = { FriendsBase };