const crypto = require("crypto");
const userBase  = require("./baseBDD");
const {getCollection} = require("../../../connectionMongoDB")

 class User {
  constructor() {
  }

  setDataBase(db) {
    this.user = new userBase.UserBase(getCollection("Users",db));
  }

  create(login, motDePasse, email, date) {
    return new Promise((resolve, reject) => {
      this.user
        .create(
          login,
          crypto.createHash("sha256").update(motDePasse).digest("hex"),
          email,
          new Date(date),
          new Date()
        )
        .then((res) => {resolve(res)})
        .catch((err) => {reject("Ce login existe deja choisissez un autre")});
    });
  }

  find(login) {
    return new Promise((resolve, reject) => {
      this.user
        .find(login)
        .then((res) => {resolve(res)})
        .catch(() => reject(login+" n'existe pas"));
    });
  }

  delete(login) {
    return new Promise((resolve, reject) => {
      this.user
        .delete(login)
        .then((res) => resolve(res))
        .catch((err) =>
          reject("impossible de supprimer" +login+" n'existe pas")
        );
    });
  }

  update(login, nickName, motDePasse, biographie, photo) {
    return new Promise((resolve, reject) => {
      const doc = { _id: login };
      if (nickName) doc['nickName'] = nickName;
      if (motDePasse) doc['motDePasse'] = motDePasse;
      if (biographie) doc['biographie'] = biographie;
      if (photo) doc['photo'] = photo;
      this.user
        .update(login, {$set : doc})
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  addTermeBloque(login, terme){
    return new Promise((resolve, reject) => {
      this.find(login).then((user) => {
        if(user.termeBloque.includes(terme)){
          reject("Ce terme est déjà bloqué")
          return
        }else{
          this.user.update(login, {$push: {termeBloque: terme}})
          .then((res) => {resolve(res)})
          .catch((err) => {reject(err)});
        }
      })
    })
  }

  removeTermeBloque(login, terme){
    return new Promise((resolve, reject) => {
      this.find(login).then((user) => {
        if(!user.termeBloque.includes(terme)){
          reject("Ce terme n'est pas bloqué")
          return
        }else{
          this.user.update(login, {$pull: {termeBloque: terme}})
          .then((res) => {resolve(res)})
          .catch((err) => {reject(err)});
        }
      })
    })
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.user
        .getAll()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getInfo(login) {
    return new Promise((resolve, reject) => {
      this.user
        .getInfo(login)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  addFriend(login1, login2) {
    return new Promise((resolve, reject) => {
      this.user.addFriend(login1, login2)
      .then(() => {
        this.user.addFriend(login2, login1)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
  });
}

  removeFriend(login1, login2) {
    return new Promise((resolve, reject) => {
      this.user.removeFriend(login1, login2)
      
        this.user.removeFriend(login2, login1)
        resolve()
          
    });
  }
  getFriends(login){
      return new Promise((resolve, reject) => {
        this.find(login).then((res) => {
          resolve(res.amis)
        }).catch((err) => {
          reject(err)
        })

      })
    }
}

module.exports = {User}