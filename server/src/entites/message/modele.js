const  messageBase = require("./baseBDD");
const userBase = require("../user/baseBDD")
const {getCollection} = require("../../../connectionMongoDB");
const { ObjectId } = require("mongodb");
class Message {
  constructor() {
  }

  setDataBase(db) {
    this.dbMessage = new messageBase.MessageBase(getCollection("Messages",db));
    this.dbUser = new userBase.UserBase(getCollection("Users",db))
  }

  getAll(login) {
    return new Promise((resolve, reject) => {
      this.dbMessage.getAll(login).then(messages => {
        this.dbUser.find(login).then(res => {
          messages = messages.filter(message => 
            res.amis.filter(ami => ami == message.sender)>length > 0 || !message.private)
          messages = messages.filter(message => res.termeBloque.filter(terme =>  message.message.include(terme)).length == 0)
          resolve(messages)
        }).catch(err => resolve(messages))
      }).catch(err => {reject(err); console.log(err)});
    })
  }

  newMessage(login,message,priv,image,message_id) {
    return new Promise((resolve, reject) => {
      this.dbUser.find(login)
        .then((resUser) => {    
          console.log("loooogin " + login)      
          this.dbMessage.create(message,priv,image,resUser._id,message_id)
              .then((resMessage) => {
                resUser.messages.push(resMessage.insertedId)
                this.dbUser.update(login,{messages : resUser.messages}).
                then(() => {
                  resolve("l'ajout est bien effectue")
                })  
                .catch((err) =>{
                  this.dbMessage.delete(resMessage._id)
                  reject(err)
                })
              })
              .catch(err => reject(err))
         
        }).catch(err => {
          reject(err)
        })

      
    })

  }

  update(message_id, message, image, priv){
    return new Promise((resolve, reject) => {
      const doc = { _id: new ObjectId(message_id) };
      if (message) doc['message'] = message;
      if (image) doc['image'] = image;
      if (priv) doc['priv'] = priv;
      
      console.log("model " +message)

      this.dbMessage
        .update(message_id, doc)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getMessageById(message_id){
    return new Promise((resolve, reject)=>{
      this.dbMessage.getMessageById(message_id)
      .then((res) => resolve(res))
      .catch((err) => reject(err));

    })
  }

  getMessageByMotif(message,login){

    return new Promise((resolve, reject) => {
      this.dbMessage.getMessageByMotif(message)
      .then(messages => {
        if(login)
        this.dbUser.find(login).then(res => {
          messages = res.filter(message => res.amis.
            filter(ami => ami == message.sender)>length > 0 || !message.private)
          messages = messages.filter(message => res.termeBloque.filter(terme =>  message.message.include(terme)).length == 0)

          resolve(messages)
        }).catch(err => resolve(messages))
        else 
        resolve(messages)
      })
      .catch((err) => reject(err));
    })
  }

  star(login, message_id,isLiked){
    
    return new Promise((resolve, reject) => {
      
      this.getMessageById(message_id).then( res =>{
            
            console.log("star ")
            if(isLiked)
            res.stars = res.stars.filter(item => item != login)
            else{
              res.stars.push(login)
            }
            console.log("star "+ res.stars)
            this.dbMessage.update(message_id,{stars:res.stars}).then(() =>
              resolve(!isLiked)
            ).catch(err => reject(err))
        }).catch(err => reject(err))
    })
  }

  repost(login,message_id){
   return new Promise((resolve, reject) =>{
      this.getMessageById(message_id).then( res =>{
        this.newMessage(login,res.message,res.private,res.image)
        .then(res =>resolve("le message est reposte"))
        .catch(err => reject(err))
      }).catch(err => reject(err))
    }
    )
  }

  delete(message_id,login) {
    return new Promise((resolve, reject) => {
      this.dbMessage.delete(message_id)
      .then(res => { 
          this.dbUser.find(login).then(res => {
            this.dbUser.update(login,{
              messages : res.messages.filter(item => item != new ObjectId(message_id))
            })
            .then(() => resolve("le message est supprime"))
            .catch(err => reject(err))
          }).catch(err => {
              reject(err)
          }
        )
        
        resolve(res)
      })
      .catch(err => reject(err))
    })
  }

}

module.exports = { Message };
