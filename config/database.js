var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/carolinastore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
).then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));