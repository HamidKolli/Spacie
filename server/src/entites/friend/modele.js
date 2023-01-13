const friendsBase = require("./baseBDD");
const {getCollection} = require("../../../connectionMongoDB")

 class Friends {
  constructor() {
  }


  setDataBase(db) {
    this.friend = new friendsBase.FriendsBase(getCollection("Friends",db));
  }

  find(id) {
    return new Promise((resolve, reject) => {
      this.friend
        .find(id)
        .then((res) => {resolve(res)})
        .catch((err) => {reject(err)});
    });
  }
  addFriend(login1, login2) {
    return new Promise((resolve, reject) => {
      this.friend.create(login1, login2).then((res) => resolve(res)).catch((err) => reject(err));
    })
  }
  removeFriend(id) {
    return new Promise((resolve, reject) => {
      this.friend.delete(id)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    })
  }

}

module.exports = {Friends}