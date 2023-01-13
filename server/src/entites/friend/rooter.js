const express = require("express");
const auth = require("../../../middleware/auth");
const apiFile = require("./api.js")
const  {getConnection}  = require("../../../connectionMongoDB");

function friendRoute(){
  return new Promise((resolve, reject) => {
    const rooter = express.Router();
    rooter.use(express.json());
    getConnection().then(db => {
    const api = new apiFile.Api(db)
    rooter
      .get("/", auth,api.getFriendsConnected) // AmiPage
      .get("/:login", api.getFriends) //Profil
      .post("/:login",auth, api.addFriend) // AjouterButton
      .delete("/:login",auth, api.delFriend) // SupprimerAmiButton
      .post("/accept/:demande",auth, api.acceptFriend) // Notification
      .delete("/demande/:demande",auth, api.delDemande); // Notification
      console.log("Friend")
      resolve(rooter)
    }).catch(err => {
      console.log(err)
    })
  })
}
module.exports = {friendRoute}
