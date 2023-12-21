const express = require('express');
const uploadRouter = require('./router');

const app = express();

app.get('/', (_req, res) => {
   res.sendFile(__dirname + "/index.html");
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(uploadRouter);

app.listen(5000, () => {
   console.log('Server running on port 5000');
})


