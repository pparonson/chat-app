const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const public = path.join(__dirname, "../public");
app.use(express.static(public));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
