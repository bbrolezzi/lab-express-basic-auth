const { Router } = require('express');
const router = Router();
//to use bcrypt
const bcrypt = require('bcryptjs');
//to get the model of the user
const User = require('./../models/user');

const routeAuthenticationGuard = require('./../middleware/route-authentication-guard');

router.get('/', (request, response, next) => {
  response.render('index');
});

//SIGN UP
router.get('/signup', (request, response, next) => {
  response.render('authentication/signup');
});

router.post('/signup', (request, response, next) => {
  const { name, password } = request.body;
  console.log(name);
  bcrypt
    .hash(password, 10)
    .then(hashAndSalt => {
      return User.create({
        name,
        passwordHashAndSalt: hashAndSalt
      });
    })
    .then(user => {
      request.session.userId = user._id;
      response.redirect('/private');
    })
    .catch(error => {
      next(error);
    });
});

//SIGN IN
router.get('/signin', (request, response, next) => {
  response.render('authentication/signin');
});

router.post('/signin', (request, response, next) => {
  const { name, password } = request.body;
  let user;

  User.findOne({ name })
    .then(document => {
      user = document;
      if (!user) {
        return Promise.reject(
          new Error("No user with that name, darling. You can't sit with us")
        );
      }
      const passwordHashAndSalt = user.passwordHashAndSalt;
      return bcrypt.compare(password, passwordHashAndSalt);
    })
    .then(comparison => {
      if (comparison) {
        request.session.userId = user._id;
        response.redirect('/private');
      } else {
        const error = new Error('Password did not match.');
        return Promise.reject(error);
      }
    })
    .catch(error => {
      response.render('authentication/signin', { error: error });
    });
});

router.get('/private', routeAuthenticationGuard, (request, response, next) => {
  response.render('private');
});

module.exports = router;
