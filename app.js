const express = require('express');
const path = require('path');


let app = express();
app.set('port', process.env.PORT || 3000); // Set port to 3000 or the provided PORT variable

//to load home page

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res) => {

  res.sendFile(path.join(__dirname, './dist/index.html'));

});
app.listen(app.get('port'), () => {

  console.log(`App listening on port ${app.get('port')}!`);

});
