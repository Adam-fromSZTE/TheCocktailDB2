const express = require('express');
const cors = require('cors');

// Express route
const route = require('../backend/routes/drink.route');
  
const app = express();
app.use(cors());
app.use('/api', route)
  
// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
  
// 404 Error
app.use((req, res, next) => {
  res.status(404).send('Error 404!')
});
  
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});