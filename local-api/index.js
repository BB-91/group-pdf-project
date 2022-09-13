import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/profileAPI.js";
import { sequelize } from "./db/index.js";
import LOCAL_API from "../src/data/localAPI.mjs"

const app = express();
const port = process.env.PORT || LOCAL_API.PORT;

sequelize.sync()
.then(result => {
    console.log(`result: `, result);
})
.catch(err => {
    console.log(`err: `, err)
})

app.use(cors({origin: "http://localhost:3000"}))
app.use(bodyParser.json());
app.use(LOCAL_API.PATH, router);

app.listen(port, (req, res) => {
    console.log("Server is running on port " + port);
});