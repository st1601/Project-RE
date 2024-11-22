const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
