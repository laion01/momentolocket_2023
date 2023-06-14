import db from "models";
import Backend from "backend"

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const color = await db.Color.build({
                name: req.body.color.name,
                image: req.body.color.image,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        
            await color.save()

            const colors = await db.Color.findAndCountAll({
                order: [
                  ['id', 'ASC'],
                ],
              });
            res.statusCode = 200;
            res.json({ colors, new: color.id })
        } catch (e) {
            res.statusCode = 400;
            res.json({error: 'unable to add this chain'})
        }
        
    } else if (req.method === "PUT") {
        try {
            const color = await db.Color.findByPk(req.body.color.id)
            color.name = req.body.color.name;
            color.image = req.body.color.image;
            await color.save()

            const colors = await db.Color.findAndCountAll({
                order: [
                  ['id', 'ASC'],
                ],
              });
            res.statusCode = 200;
            res.json({ colors })
            
        } catch (e) {
            res.statusCode = 400;
            res.json({error: 'unable to add this chain'})
        }
    } else if (req.method === "DELETE") {
        try {
            const color = await db.Color.findByPk(req.body.color.id)
            await color.destroy()

    
            const colors = await db.Color.findAndCountAll({
                order: [
                  ['id', 'ASC'],
                ],
              });
            res.statusCode = 200;
            res.json({ colors })
            
        } catch (e) {
            res.statusCode = 400;
            res.json({error: 'unable to add this chain'})
        }
    }
    
  }
  