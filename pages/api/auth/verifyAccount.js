import db from "models"
import Backend from "backend"

export default async function handler(req, res) {
    if (req.method === "POST") {
        let user = await Backend.getAuthenticatedUser({ req, res });
        const token = req.body.token;
        const email = req.body.email;
        
        const data = await Backend.verifyAccount({ req, res }, token)
        res.statusCode = 200
        const _user = await db.User.findByPk(user.id)
            _user.status = 1;
            _user.save();
        }
        res.json({
            success: data.success,
            token: data.newToken
        })
    } else {
        res.json({ error: "method_not_allowed" })
    }
}
