const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

// Define a secret key for signing the token
const client_secret = "abc-store-api";

// Create an API endpoint that requires authentication
app.get("/protected", (req, res) => {
  // Get the token from the request headers
  console.log(req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1];
  console.log("token", token);
  // Verify the token using the verify() method
  jwt.verify(token, client_secret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    // If the token is valid, return the protected data
    res.send(`Hello, This API... ! This is protected data...`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
