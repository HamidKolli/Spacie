 class UserBase {
  constructor(db) {
    this.db = db;
  }

  create(login, motDePasse, email, dateNaissance, dateCreation) {
    return new Promise((resolve, reject) => {
      this.db
        .insertOne({
          _id: login,
          nickName: login,
          photo : "https://media.spacie.fr/default/imgutils/default_profil.jpg",
          motDePasse: motDePasse,
          email: email,
          dateNaissance: dateNaissance,
          dateCreation: dateCreation,
          biographie: "",
          amis : [],
          messages : [],
          termeBloque : [],
        })
        .then((res) => {console.log("BLU");resolve(res)})
        .catch((err) => {console.log("BLI");reject(err)});
    });
  }

  find(login) {
    return new Promise((resolve, reject) => {
      console.log(login)
      this.db
        .findOne({ _id: login }, { _id: 1, email: 1, dateNaissance: 1, dateCreation: 1, amis: 1, messages: 1 })
        .then((res) => {resolve(res); console.log(res)})
        .catch((err) => reject(err));
    });
  }

  delete(login) {
    return new Promise((resolve, reject) => {
      this.db
        .deleteOne({ _id: login })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  update(login, doc) {
    return new Promise((resolve, reject) => {
      this.db
        .updateOne(
          { _id: login },
          
             doc,
          
        )
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getAll() {
    console.log("getAllBdd")
    return new Promise((resolve, reject) => {
      this.db
        .find({}, { _id: 1, nickName: 1, photo: 1 })
        .toArray()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getInfo(login) {
    console.log("getInfoBdd",login)
    return new Promise((resolve, reject) => {
      console.log("getInfoBdd",login)
      this.db
        .findOne({ _id: login }, { _id: 1, nickName: 1, photo: 1 })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  addFriend(login1, login2) {
    console.log("login2:  ", login2)
    return this.getInfo(login1).then((res) => {
      res.amis.push(login2)
      this.update(login1, { amis: res.amis})
    })
  }
  
  removeFriend(login1, login2) {
    this.getInfo(login1).then((res) => {
      this.update(login1, { amis: res.amis.filter((friend) => friend !== login2) })
    })
  }
  
  getFriend(login) {
    return new Promise((resolve, reject) => {
      this.db
        .find({ _id: login }, { _id: 1, friends: 1 })
        .toArray()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

module.exports = {UserBase}
