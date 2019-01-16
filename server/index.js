const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

/// Middle ware
app.use(bodyParser.json());

app.use(cors());

//routes
const posts = require('./routes/api/posts');

app.use('/api/posts', posts);
app.use('/', posts);

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));
