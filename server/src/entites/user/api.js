
  const userFile = require("./modele");
  const crypto = require("crypto");
  const jwt = require('jsonwebtoken')
  const { getLoginFromToken } = require("../../../tools/token");

  const user =  new userFile.User()
  class Api {
      constructor(db) {
        user.setDataBase(db)
      }
      
      async signup(req,res) {
          const {login ,date,email,motDePasse} = req.body
          if(!login || !motDePasse || !date || !email)
          {
            res.status(401).send({message : "mot de passe ou le login est incorrect"})
            return
          }
          user.create(login,motDePasse,email,date).then(() =>{     
              console.log("then signup");
              res.send({token : jwt.sign({userId : login},"RANDOM_TOKEN_SECRET",{expiresIn: '2h'}), login : login})
              console.log("token envoye signup")
              return

            }).catch(err => 
              {
                console.log("catch signup ")
                res.status(404).send({message : err})
              }
            )
      }

      async signin (req, res) {
        const {login , motDePasse} = req.body
        if(login == "" || motDePasse == ""){
          res.status(401).send({message : "mot de passe ou le login est incorrect"})
          return
        }
        user.find(login).then(resp => {
            if(crypto.
              createHash("sha256").
              update(motDePasse).
              digest("hex") == resp.motDePasse
            ){
              console.log("password correct signin",login)
              res.send({token : jwt.sign({userId : login},"RANDOM_TOKEN_SECRET",{expiresIn: '2h'}), login : login})
              console.log("token envoye signin")
              return
            }
            res.status(401).send({message : "Mot de passe incorrect"})
            return 
          }
          ).catch(err => {
            console.log(err)
            res.status(401).send({message : "login ou mot de passe incorrect"})
            }
          )
    
      }

      async signout(req, res) {
        console.log("signout")
        res.status(200).send({token : "",login : ""})
        console.log("signout out")

      }

      async edit(req, res) {
        console.log("editApi")
        const {login , nickName, password, biographie, photo,ancienMotDePasse} = req.body
        user.find(login).then(resp => {
          if(crypto.
            createHash("sha256").
            update(ancienMotDePasse).
            digest("hex") == resp.motDePasse
          ){
            user.update(login , nickName, password, biographie, photo).then((resp) => {
              console.log("then edit")
              res.status(200).send({message : resp})
              console.log("fin edit")
            }).catch(err => res.status(500).send({message : err}))
            
            return
          }
          res.status(401).send({message : "Mot de passe incorrect"})
          return 
        }).catch(err => {
          console.log(err)
          res.status(401).send({message : "login ou mot de passe incorrect"})
          }
        )
      
      }

      async delete(req, res) {
        const {login} = req.params
        user.delete(login).then((resp) => {
          console.log("then delete")
          res.status(200).send({message : resp})
          console.log("fin delete")
          
        }).catch(err => res.status(500).send({message : err}))
      }


      async get(req, res) {
        const {login} = req.params
        user.find(login).then((resp) => {
          console.log("then get "+login)
          res.status(200).send(resp)
          console.log("fin get ")
        }).catch(err => res.status(200).send([]))
      }

      async getInfos(req, res) {
        console.log("getInfosApi")
        user.getAll().then((resp) => {
          console.log("then getInfos")
          res.status(200).send(resp)
          console.log("fin getInfos")
          
        }).catch(err => res.status(500).send(err))
      }

      async getInfo(req, res) {
        const {login} = req.params
        console.log("getInfoApi",login)

        user.getInfo(login).then((resp) => {
          console.log("then getInfo")
          res.status(200).send(resp)
          console.log("fin getInfo")
          
        }
        ).catch(err => res.status(500).send({message : "erreur getInfo"}))
      }


      async  removeTermeBloque(req, res) {
        const {terme} = req.body
        console.log("supprimerTermeApi",terme)
        const login = getLoginFromToken(req);
        user.removeTermeBloque(login,terme).then((resp) => {
          console.log("then supprimerTerme")
          res.status(200).send(resp)
        }).catch(err => 
          res.status(500).send({message : "erreur supprimerTerme"}))
        }


        async  addTermeBloque(req, res) {
          const {terme} = req.body
          console.log("addTermeBloqueApi",terme)
          const login = getLoginFromToken(req);
          user.addTermeBloque(login,terme).then((resp) => {
            console.log("then addTermeBloque")
            res.status(200).send(resp)
          }).catch(err =>{
            res.status(500).send(err)
            console.log(err)
          })
          }
  }



module.exports = {Api}