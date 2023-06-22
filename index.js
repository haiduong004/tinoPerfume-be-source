const express = require("express");
const app = express();
const path = require("path");
const {sequelize} = require('./models');
const { customerRouter } = require("./routes/customer.route");
const { rootRouter } = require("./routes");

app.use(express.json());

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