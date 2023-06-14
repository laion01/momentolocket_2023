import formidable from "formidable";
import fs from "fs";
import db from "models";
import Backend from "backend"

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    try {
      const filename = await saveFile(files.file);

      let user = await Backend.getAuthenticatedUser({req, res});
      if(user.id == fields.userId)
      {
        user = await db.User.findByPk(fields.userId)
        user.avatar = filename;
        user.save();
      }
      return res.status(201).send({ filename });
    } catch (e) {
      return res.status(400).send({ error: "upload failed" });
    }
    

  });
};

const saveFile = async (file) => {
  const timestamp = (new Date()).getTime();
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/images/avatars/${timestamp}_${file.originalFilename}`, data);
  const filename = `/images/avatars/${timestamp}_${file.originalFilename}`;
  fs.unlinkSync(file.filepath);
  return filename;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
