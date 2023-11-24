const express = require("express");
const path = require("path");
require(path.join(__dirname, "../db/mongoose/connect.js"));
const UserRouter = require("../routers/user_router.js");
const cors = require("cors");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());

app.use("/users", UserRouter);

const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log(`Listening on port: http://localhost:${port}`);
});
