if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const flash = require("express-flash");
//const session = require('express-session');
const bcrypt = require("bcryptjs");
const Users = require("./models/Users");
const session = require("cookie-sessions");
const cookieparser = require("cookie-parser");

const app = express();
const url = process.env.MONGO_URL;
mongoose.connect(url);

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (username) => {
    return Users.findOne({ username: username })
      .exec()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  },
  (id) => {
    return Users.findById(id)
      .exec()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
);

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(flash());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized : false
// }));
app.use(
  session({
    name: "blogSession",
    secret: process.env.SESSION_SECRET,
    keys: [process.env.SESSION_SECRET],
    // keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.post('/login', passport.authenticate('local',{
//     successRedirect: '/userinfo',
//     failureRedirect: '/login',
//     failureFlash: true,
//     successMessage : "Logged in",
//     failureMessage : 'Couldnt log in'
// }));
app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    } else {
      req.login(user, (err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          user.password = "";
          req.session.user = user;
          res.status(200).json(user);
        }
      });
    }
  })(req, res, next);
});

app.get("/logout", checkAuth, (req, res) => {
  req.logOut();
  req.session = null; //req.session.destroy if youre using session instead of cookie-session
  res.status(200).json({ msg: "Successfully logged out" });
});

//app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/logintest", (req, res) => {
  res
    .status(200)
    .send(
      `<form method="post" action="/login"> <input type="text" name="username" /> <input type="text" name="password" /> <button type="submit">Submit</button> </form>`
    );
});

//`<form method="post" action="/login"> <input type="text" name="username" /> <input type="text" name="username" /> <button type="submit">Submit</button> </form>`

app.use("/", require("./routes/api/user"));

//Check auth middleware
function checkAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(200).json({ msg: "Not logged in" });
  }
}
// ---------------------------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = app;
