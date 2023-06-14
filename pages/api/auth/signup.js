import db from "models"
import Backend from "backend"

export default async function handler(req, res) {
    if (req.method === "POST") {
      if (typeof req.body.email !== "string") {
        res.statusCode = 400
        return res.json({ error: "missing_email", message: "Email missed" })
      } else if (typeof req.body.first_name !== "string") {
        res.statusCode = 400
        return res.json({ error: "missing_first_name", message: "Input first name!" })
      } else if (typeof req.body.last_name !== "string") {
        res.statusCode = 400
        return res.json({ error: "missing_last_name", message: "Input last name!" })
      } else if (typeof req.body.password !== "string") {
        res.statusCode = 400
        return res.json({ error: "missing_password", message: "Password is too weak!" })
      } else if (typeof req.body.repeat !== "string") {
        res.statusCode = 400
        return res.json({ error: "missing_confirm_password", message: "Password doesn't match!"})
      }
  
      const email = req.body.email.trim()
  
      if (await db.User.emailTaken(email)) {
        res.statusCode = 409
        return res.json({ error: "email_taken", message: "Email already registed!" })
      }
  
      //? Password strength
  
      if (req.body.password !== req.body.repeat) {
        res.statusCode = 400
        return res.json({ error: "passwords_are_not_the_same", message: "Password doesn't match!" })
      } else if (req.body.password.length < 8) {
        res.statusCode = 400
        return res.json({ error: "password_too_short", message: "Password is too weak!" })
      } else if (!req.body.password.match(/[a-z]/g)) {
        res.statusCode = 400
        return res.json({ error: "password_lowercase_weakness", message: "Password is too weak!" })
      } else if (!req.body.password.match(/[A-Z]/g)) {
        res.statusCode = 400
        return res.json({ error: "password_uppercase_weakness", message: "Password is too weak!" })
      } else if (!req.body.password.match(/[0-9]/g)) {
        res.statusCode = 400
        return res.json({ error: "password_number_weakness", message: "Password is too weak!" })
      } else if (!req.body.password.match(/[^0-9a-zA-Z\s]/g)) {
        res.statusCode = 400
        return res.json({ error: "password_special_weakness", message: "Password is too weak!" })
      }
  
      const { first_name, last_name, password } = req.body
      const user = await db.User.build({
        first_name, last_name,
        email,
        password: '',
        status: 0,
        createAt: new Date(),
        updatedAt: new Date(),
      })
  
      await user.setPassword(password)
      await user.save()
  
    var _token = Math.floor(1000 + Math.random() * 9000);
    await Backend.sendEmailVerificatioinSMTP(user.email, _token);
    
      const token = await Backend.login({
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
        verificationCode: _token,
      })
  
      res.statusCode = 200
      res.json({ success: true,
        logedIn: false,
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
        isVerified: false })
    } else {
      res.statusCode = 405
      res.json({ error: "method_not_allowed" })
    }
  }
  