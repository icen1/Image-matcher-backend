import * as dotenv from 'dotenv';
import path from 'path';
import commandLineArgs from 'command-line-args';

const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String,
    },
]);

dotenv.config({
    path: path.join(__dirname, `../env/${String(options.env)}.env`),
});
