//Set up

const server = require('./api/server.js');

//LISTENING HERE
server.listen(5000, () => {
  console.log('\n*** Server Running on http://localhost:5000 ***\n');
});
