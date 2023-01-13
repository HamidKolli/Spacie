const friendsFile =  require("./modele");
const notifFile = require("../notif/modele");
const userFile = require("../user/modele");
const jwt = require('jsonwebtoken');
const { getLoginFromToken } = require("../../../tools/token");

const friends = new friendsFile.Friends();
const user = new userFile.User();
const notif = new notifFile.Notifications();
class Api {

  constructor(db) {
      friends.setDataBase(db);
      user.setDataBase(db);
      notif.setDataBase(db);
  }

  async getFriendsConnected(req, res) {
    
    const login = getLoginFromToken(req);
    user.getFriends(login).then((resp) => {
      res.status(200).send( resp )
    }).catch((err) => {
      res.status(404).send( err )
    })
  }

  async getFriends(req, res) {
    console.log("quelque chose")
    const { login } = req.params;
    user.getFriends(login).then((resp) => {
      res.status(200).send(resp )
    }).catch((err) => {
      res.status(402).send( err )
    })
  }

  async addFriend(req, res) {
    const { login } = req.params
    const login_emeteur = getLoginFromToken(req);
    if(login == login_emeteur) {
      res.status(401).send({ message: "Vous ne pouvez pas vous ajouter vous-même" })
      return
    } 
    friends.addFriend(login_emeteur, login).then((resp) => {
      notif.addNotif(login,login_emeteur+" vous as ajouté en amis",resp.insertedId)
      .then(() => {
          res.status(200).send({ message: "Validé" })
      }).catch((err) => {
        res.status(500).send({ message: "probleme dans notifications" })
      })
    }).catch(err => res.status(402).send({ message: err }))
  }

  async delFriend(req, res) {
    const { login } = req.params;

    const login_emeteur = getLoginFromToken(req);
    user.removeFriend(login_emeteur, login).then(() => {
      res.status(200)
    })
    .catch((err) => {res.status(503).send({message: err})}); 
  }

 
  async acceptFriend(req, res) {
    const { demande } = req.params;
    console.log(" la demande : "+demande)
    friends.find(demande).then((resp) => { 
      console.log("resp "+resp.recepteur+" "+resp.emeteur)
      const login_emeteur = resp.emeteur; 
      const login_recepteur = resp.recepteur;
      user.addFriend(login_emeteur, login_recepteur).then(() => {
        console.log("ajouté")
        notif.addNotif(
          login_recepteur,
          login_emeteur+" vous as ajouté en amis")
        .then(() => {
          friends.removeFriend(demande).then(() => {
            notif.getNotifications(login_recepteur,demande)
            .then((resp) => {
              resp.forEach(element => {
                notif.deleteNotification(element._id)
                .catch(() => {
                  throw new Error("probleme dans notifications")
                })
              });
              res.sendStatus(200)
            }).catch((err) => {
              user.removeFriend(login_emeteur, login_recepteur).then(() => 
              {res.status(503).send({message: err})})
            })
          }).catch(() => {
            res.status(500).send({ message: "probleme dans notifications" })
          })
        })
        .catch((err) => {
          res.status(503).send({message: err})
        })
    
      }).catch((err) => {
          user.removeFriend(login_emeteur, login_recepteur)
            .then((err) => {res.status(503).send({message: err})}); 
      })
    }).catch((err) => {
      res.status(410).send({ message: err })
    })
  }

  async delDemande(req, res) {
    const { demande } = req.params;
    friends.find(demande).then((resp) => { 
        const login_recepteur = resp.recepteur;
        friends.removeFriend(demande).then(() => {
          notif.getNotifications(login_recepteur,demande)
            .then((resp) => {
              resp.forEach(element => {
                notif.deleteNotification(element._id)
                .catch((err) => {
                  res.status(500).send({ message: "probleme dans notifications" })
                })
              });
            }).catch((err) => {
              res.status(500).send({ message: "probleme dans notifications" })
            })
        res.status(200).send({ message: "Validé" })})
      .catch((err) => {
        res.status(500).send({ message: "Erreur suppression amis" })
      })
    })
  }
  
}

module.exports = {Api}

