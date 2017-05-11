const m = require('../messages/messages.json'); 
module.exports = (app, passport, User) => {

  app.get('/', (req, res) => {
    res.render('login', {
      error: req.flash('error'), 
      success: null
    });
  }); 

  app.route('/register')
    .get((req, res) => {
      res.render('register', { error: null }); 
    })
    .post((req, res) => { 
      if(req.body.username && req.body.password) {
        User.create(req.body)
          .then(() => res.render('login', {
              error: null, 
              success: m.m1
            })
          )
          .catch(err => console.log(err)); 
      } else {
        res.render('register', {
          error: m.e1
        }); 
      }
  }); 

  app.route('/login')
    .post(passport.authenticate('local', {
        failureFlash: true, 
        successRedirect: '/profile', 
        failureRedirect: '/login' 
      }))
    .get((req, res) => {
      if (req.isAuthenticated()) {
        res.redirect('/profile')
      } else {
        let error = req.flash('error')[0];   
        res.render('login', { error, success: null });
      }    
    })

  app.get('/profile', (req, res) => { 
    if (req.isAuthenticated()) {
      res.render('profile', { user: req.user });
    } else {
      res.redirect('/'); 
    }
  });

  app.get('/logout', (req, res) => {
    req.logout(); 
    res.render('login', {
      error: null, 
      success: m.m2
    }); 
  });
}