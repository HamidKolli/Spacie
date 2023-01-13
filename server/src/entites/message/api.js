const messageFile =  require("./modele");
const notificationsFile = require("../notif/modele");
const token = require('../../../tools/token.js');
const message = new messageFile.Message()
const  notif  = new notificationsFile.Notifications()
class Api {
   
    constructor(db) {
      message.setDataBase(db)
      notif.setDataBase(db)
    }
    
    async getAll(req, res) {
        const {login} = req.body
        message.getAll(login).then(resp => {
          res.status(200).send(resp)
        }
        ).catch(err =>
          res.status(404).send(err))
    }

    
    async newMessage(req, res) {
      const messageText = req.body.messageText
      const image = req.body.image
      const priv = req.body.priv
      const login = token.getLoginFromToken(req)
      console.log("1: "+login)
      // const login  = req.body.login
      message.newMessage(login, messageText,priv, image).then(resp => 
          res.status(200).send(resp)
      ).catch(err => {console.log(err);res.status(400).send(err)})
    }

    async update(req, res) {
      const messageText = req.body.messageText
      const image = req.body.image
      const priv = req.body.priv
      const {message_id} = req.params
      message.update(message_id, messageText, image, priv).then(resp => 
          res.status(200).send(resp)
      ).catch(err => res.status(404).send(err))
    }

    async getCommentaire(req, res) {
      const {message_id} = req.params
      message.getAll(undefined)
      .then(resp=> {res.status(200).send(resp.filter(message => message.message_id === message_id))})
      .catch((err) => res.status(500).send(err))
    }

    async get(req, res) {
      const mesg = req.body.message
      const login = req.body.login
      message.getMessageByMotif(mesg,login)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(500).send(err))
    }

    async getMessageById(req, res) {
      const message_id = req.params.message_id
      message.getMessageById(message_id)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(500).send(err))
    }


    async getHashtags(req, res) {
     
      const login = req.params.login
      const mesg = req.body.message_id
      message.getMessageByMotif('#'+mesg,login)
      .then((resp) => {res.status(200).send(resp)})
      .catch((err) => {res.status(500).send(err)})
    }

    async star(req, res) {
      const login = token.getLoginFromToken(req)
      const {message_id,liked} = req.body
      message.getMessageById(message_id).then((msg) => {
        console.log("sender star message "+msg.sender);
        notif.addNotif(msg.sender,token.getLoginFromToken(req) + ' a star votre message').then(() => {
         
          message.star(login, message_id,liked)
          .then((resp) => res.status(200).send(resp))
          .catch((err) => res.status(500).send(err))
        }
        )
        .catch((err) => {res.status(515).send({message: err})})
      }

      )    
    }

    async newCommentaire(req, res) {
      const { messageText , image, priv } = req.body
      const {message_id} = req.params
      const login = token.getLoginFromToken(req)
     
      message.getMessageById(message_id).then((msg) => {
        message.newMessage(login, messageText, image,priv, message_id).
        then(resp => 
          {
            notif.addNotif(msg.sender, login + ' a commente votre message'  )
            .then(() => res.status(200).send(resp))
          .catch((err) => {res.status(503).send({message: err})})}
        ).catch(err => res.status(404).send(err))
        
      })     
      
  }

    async repost(req, res) {
      const {message_id} = req.params
      // const login = req.body.login
      const login = token.getLoginFromToken(req)
      message.getMessageById(message_id).then((message) => {
        notif.addNotif(message.sender,login+ ' a reposte votre message'  )
        .catch((err) => {res.status(503).send({message: err})})
      })
      message.repost(login,message_id)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(500).send(err))
    }

   
    async delete(req, res) {
      const message_id = req.params.message_id
      const login = token.getLoginFromToken(req)
      message.delete(message_id,login)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(500).send(err))
    }


} 


module.exports = {Api}