const notificationsFile =  require("./modele");
const jwt = require("jsonwebtoken");
const { getLoginFromToken } = require("../../../tools/token");
const notif = new notificationsFile.Notifications();
class Api {
  constructor(db) {
   notif.setDataBase(db);
  }

  async getNotifs(req, res) {
    console.log("getNotifs");
    const login = getLoginFromToken(req);
    notif.getAllNotif(login).then((resp) => res.send(resp)).catch(err => res.stattus(503).send({ message: err }));
  }

}

module.exports = {Api}