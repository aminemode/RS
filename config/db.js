const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://Amine:AMINEnaruto123@cluster0.xa240.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    )
    .then(() => console.log('connected youpi'))
    .catch((err) => console.log('connection error ' + err))