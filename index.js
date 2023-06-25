const express = require("express");
const app = express();
const path = require("path");
const {sequelize} = require('./models');
const { customerRouter } = require("./routes/customer.route");
const { rootRouter } = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const publicPathDirection = path.join(__dirname,"./publuc");
app.use(express.static(publicPathDirection));

app.use("/api/v1",rootRouter);

app.listen(5000,async() => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
})
