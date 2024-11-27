const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server hoạt động bình thường!');
});

app.use("/api/auth", authRoutes);

app.use((req, res) => {
    res.status(404).send('Endpoint không tồn tại.');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
