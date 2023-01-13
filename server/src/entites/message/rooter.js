const express = require("express");
const auth = require("../../../middleware/auth");
const apiFile = require("./api.js")
const  {getConnection}  = require("../../../connectionMongoDB");

function messageRoute(){
    return new Promise((resolve, reject) => {
        const rooter = express.Router();
        rooter.use(express.json());
        getConnection().then(db => {
            const api = new apiFile.Api(db)
            rooter
                .get("/", api.getAll)//Accueil
                .post('/commentaire/:message_id',auth ,api.newCommentaire)//NewMessage
                .post('/update/:message_id',auth, api.update)//NewMessage
                .post('/create',auth,api.newMessage)//NewMessage
                .get("/commentaire/:message_id", api.getCommentaire)//CommentePage
                .post("/repost/:message_id",auth, api.repost)//RepostButton
                .post("/star", auth, api.star)//StarButton
                .delete("/:message_id",auth,api.delete)// SupprimerButton
                .get("/recherche", api.get)//ResultatReacherche
                .get("/recherche/hashtags", api.getHashtags)//ResultatReacherche
                .get("/recherche/:message_id", api.getMessageById)//Profil
            
                console.log("message")
            resolve(rooter)
        }).catch(err => {
            console.log(err)
        })
    })
}
module.exports = {messageRoute}
