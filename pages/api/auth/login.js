import db from "models";
import Backend from "backend"

export default async function handler(req, res) {
    if (req.method === "POST") {
      let user = await Backend.getAuthenticatedUser({req, res});
      let newUser = false;

      if(!user) {
        newUser = true;

        if (typeof req.body.email !== "string") {
          res.statusCode = 400
          return res.json({ error: "missing_email", message: "Incorrect credentials!" })
        } else if (typeof req.body.password !== "string") {
          res.statusCode = 400
          return res.json({ error: "missing_password", message: "Incorrect credentials!"})
        }
        user = await db.User.findOne({
          where: {
            email: req.body.email.trim(),
          },
        })
  
        if (!user) {
          res.statusCode = 401
          return res.json({ error: "invalid_credentials", message: "Incorrect credentials!" })
        } else if (!(await user.checkPassword(req.body.password))) {
          res.statusCode = 401
          return res.json({ error: "wrong_password" })
        }
      }
      
      if (user.status > 1) {
        res.statusCode = 401
        return res.json({ error: "not_verified", message: "You account is not inactive." })
      }
  
      let token = "";

      if(newUser) {
        var __token = Math.floor(1000 + Math.random() * 9000);
        await Backend.sendEmailVerificatioinSMTP(user.email, __token);

        token = await Backend.login({
          req, res
        }, {
          id: user.id, 
          email: user.email, 
          first_name: user.first_name, 
          laste_name: user.last_name,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
          status: user.status,
          verificationCode: __token
        })
      } else {
        token = user.token
      }


      let logedIn = true;
      if(newUser || user.status == 0)
      {
        logedIn = false;
      }

      res.statusCode = 200
      res.json({
        logedIn,
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
        phone: user.phone,
        country: user.country,
        state: user.state,
        city: user.city,
        apartment: user.apartment,
        address: user.address,
        zipcode: user.zipcode,
        role: user.role,
        status: user.status,
        authToken: token,
        isVerified: logedIn,
      })
    } else {
      res.json({ error: "method_not_allowed" })
    }
  }
  