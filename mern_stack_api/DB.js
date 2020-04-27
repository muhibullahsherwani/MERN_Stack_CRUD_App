const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/postManagerDB', {useNewUrlParser:true, useUnifiedTopology:true},
err => {
    if(!err)
        console.log("MongoDB Connection Created Successfully");
    else
        console.log("Error While Connecting To MongoDB", JSON.stringify(err, undefined, 2));
});
