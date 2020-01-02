const express = require('express');
const app = express();
app.use(express.static('./client/dist'))

app.listen(process.env.PORT, () => console.log('hii'))

