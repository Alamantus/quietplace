var express = require('express');
var app = express();

app.use(express.static('./docs/'));

app.listen(3013, function () {
  console.log('Example app listening on port 3013!');
});
