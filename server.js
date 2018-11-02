const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

const mongoKey = require("./config/keys").MongoURI;

mongoose
  .connect(mongoKey)
  .then(() => console.log("Mongoose Connected..."))
  .catch(err => console.error("Error Connecting to MongoDB..."));

app.use("/api/items", items);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server listening on ${port}`));
