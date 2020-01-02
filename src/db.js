import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(
    process.env.PRODUCTION ? 
        process.env.MONGO_URL_PROD : process.env.MONGO_URL,
    {
        dbName: 'awesome-tube',
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

const db = mongoose.connection;

const handleOpen = () => {
    console.log('✅  Connected to DB');
};

const handleError = () => {
    console.error('❌  Error on DB');
};

db.once('open', handleOpen);
db.on('error', handleError);