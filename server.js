const express = require("express");
const app = express();
const parser = require("body-parser");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

const cors = require("cors");

dotenv.config();

app.use(parser.json());
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");

MongoClient.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
})
  .then((client) => {
    const db = client.db("castles_db");
    const castlesCollection = db.collection("castles");
    const castlesRouter = createRouter(castlesCollection);
    app.use("/api/castles", castlesRouter);
  })
  .catch(console.err);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on port ${this.address().port}`);
});
