const express = require('express');
const router = require('./routes/upload.routes');

const app = express();

app.get('/', (_req, res) => {
   res.sendFile(__dirname + "/index.html");
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(5000, () => {
   console.log('Server running on port 5000');
})


