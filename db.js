const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let mongo;
if (process.env.NODE_ENV === 'production') {
    mongo = 'mongo';
} else {
    mongo = 'localhost';
}
mongoose.connect(`mongodb://${mongo}:27017/squatinator`, { useNewUrlParser: true }, (err) => {
    if (!err)
        console.log('MongoDB connection succeeded..');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));  //convert object 'err' into string
});

module.exports = mongoose;
