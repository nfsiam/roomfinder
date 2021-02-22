import cors from 'cors';

const whitelist = [
    'http://localhost:3000',
    'https://roomfinder.nfsiam.me',
    'https://covidroomfinder.netlify.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        // console.log(origin);
        if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

export default () => cors(corsOptions);