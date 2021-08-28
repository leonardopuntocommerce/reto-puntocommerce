const User = require('../models/user');

exports.createUser = (req, res, next) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    status: req.body.status
  });

  user.save().then(
    (result) => {
      res.status(201).json({
        message: 'User saved successfully!',
          data: result
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.searchDuplicateEmails = (req, res, next) => {
  User.find(
    { "email": { "$regex": req.params.searchValue, "$options": "i" } }).sort({'_id': -1}).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.getAllUsers = (req, res, next) => {
  User.find().sort({'_id': -1}).then(
    (users) => {
      res.status(200).json(users);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.orderUserEmails = (req, res, next) => {

  let letras = [{"letra":"A", "contador": 0},{"letra":"B", "contador": 0},{"letra":"C", "contador": 0},{"letra":"D", "contador": 0},{"letra":"E", "contador": 0},
  {"letra":"F", "contador": 0},{"letra":"G", "contador": 0},{"letra":"H", "contador": 0},{"letra":"I", "contador": 0},{"letra":"J", "contador": 0},{"letra":"K", "contador": 0},{"letra":"L", "contador": 0},
  {"letra":"M", "contador": 0},{"letra":"N", "contador": 0},{"letra":"O", "contador": 0},{"letra":"P", "contador": 0},{"letra":"Q", "contador": 0},{"letra":"R", "contador": 0},{"letra":"S", "contador": 0},
  {"letra":"T", "contador": 0},{"letra":"U", "contador": 0},{"letra":"V", "contador": 0},{"letra":"W", "contador": 0},{"letra":"X", "contador": 0},{"letra":"Y", "contador":0},{"letra":"Z", "contador":0}];

  let letrasEncontradas = [];

  User.find().sort({'_id': -1}).then(
    (users) => {

      for(let user of users) {
        let email = user.email.toUpperCase();
        
        for(let itemLetras of letras){
          let letraBuscar = itemLetras.letra;

          for (let i = 0;  i < email.length; i ++) {
            const letraEmail = email[i];

            if(letraBuscar == letraEmail) {
              itemLetras.contador ++;

            }
          }
        }
      }

      // Eliminar letras contador 0
      for(let item of letras ) {
        if(item.contador != 0 ) {
          letrasEncontradas.push(item);
        }
      }

      // Ordenar contador de letras forma descendente
      letrasEncontradas.sort((a, b) => parseFloat(b.contador) - parseFloat(a.contador));

      // Response
      res.status(200).json(letrasEncontradas)

    }).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};


exports.updateUser = (req, res, next) => {
  
  let user = {
     _id: req.params.id,
     name: req.body.name,
     username: req.body.username,
     email: req.body.email,
     status: req.body.status
   };
 
 User.updateOne({_id: req.params.id}, user).then(
   () => {
     res.status(201).json({
       message: 'User updated successfully'
     });
   }
 ).catch(
   (error) => {
     res.status(400).json({
       error: error
     });
   }
 );
};

exports.deleteUser = (req, res, next) => {
  User.findOne({_id: req.params.id}).then(
    (user) => {
        User.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'User deleted'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
    }
  );
};