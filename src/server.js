const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
// require the router module
const router = require("./router");

// use the router in your app
app.use(express.json(), router);

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
