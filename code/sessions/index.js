const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* 
    @param: secret: a secret that is used to sign the session ID
    @param: resave: forces session to be saved back to store
    @param: saveUninitialized: Forces a session that is "uninitialized" to be saved to the store.
    @param: cookie: Settings object for the session ID cookie. 
*/
app.use(
  session({
    secret: 'some awesome secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

/*
    For production, trust proxy and set cookie to secure
    Secure will only sent over HTTPS

    $ export NODE_ENV=production

    If using Ngrok to test, simply trust proxy and set to secure
    (don't set NOD_ENV=production because of memory leak)
*/
if (app.get('env') === 'production') {
  console.log('Production');
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

/* 
    If they have a session, let them know how many times they have viewed pages
    Else add user (using sessionID as an example) and set page views to 1
*/
app.get('/', function (req, res) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>User / Session ID: ' + req.session.user + '</p>');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.write('<p>expires in: ' + req.session.cookie.maxAge / 1000 + 's</p>');
    res.end();
  } else {
    req.session.user = req.sessionID;
    req.session.views = 1;
    res.end('welcome to the session demo. refresh!');
  }
});

// If user has "logged in" above, show them the secrets
app.get('/secret', function (req, res) {
  if (req.session.user) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>You can see the secrets</p>');
    res.write('<p>User / Session ID: ' + req.session.user + '</p>');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.write('<p>expires in: ' + req.session.cookie.maxAge / 1000 + 's</p>');
    res.end();
    return;
  }
  res.send('No secrets for you');
});

app.listen(3000);
