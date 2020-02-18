const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

function initialize(passport, getUserByUsername, getUserById){
    const authenticateUser = async (username,password,done)=>{
        const user = await getUserByUsername(username);
        if(user==null){
            return done(null,false,{message:'No user with that username'});
        }

        try{
            if(await bcrypt.compare(password,user.password)){
                //Authenticated
                return done(null,user);

            }
            else{
                return done(null,false, {message:'Password incorrect'});
            }
        }
        catch(e){
            return done(e);
        }

    }

    passport.use(new localStrategy({usernameField : 'username'},authenticateUser));
    passport.serializeUser((user,done)=>{ done(null,user._id); });
    passport.deserializeUser((id,done)=>{
        return done(null,getUserById(id)) 
    });
}

module.exports = initialize;