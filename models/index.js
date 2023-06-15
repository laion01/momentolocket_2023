'use strict';

import fs from "fs"
import path from "path"
import { Sequelize, Model } from "sequelize";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
import configs from "config/config.json";
const config = configs[env]

/* Custom handler for reading current working directory */
const models = process.cwd() + '/models/' || __dirname;
console.log("=======================================================================")
console.log(Model);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const db = {};

import userModel from "./user.js"
db.User = userModel(sequelize, Sequelize.DataTypes);

import addressModel from "./address.js"
db.Address = addressModel(sequelize, Sequelize.DataTypes);

import orderModel from "./order.js"
db.Order = orderModel(sequelize, Sequelize.DataTypes);

import colorModel from "./color.js"
db.Color = colorModel(sequelize, Sequelize.DataTypes);

import metalModel from "./metal.js"
db.Metal = metalModel(sequelize, Sequelize.DataTypes);

import productModel from "./product.js"
db.Product = productModel(sequelize, Sequelize.DataTypes);

import fileModel from "./file.js"
db.File = fileModel(sequelize, Sequelize.DataTypes);

import locketModel from "./locket.js"
db.Locket = locketModel(sequelize, Sequelize.DataTypes);

import soldModel from "./SoldProduct.js"
db.SoldProduct = soldModel(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
