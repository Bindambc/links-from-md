import chalk from "chalk";
import fs from 'fs'
import getFileAsync from "./app.js";
import urlValidation from "./htpp-validation.js"

const argument = process.argv;
const log = console.log;

async function processText(argument) {
    const path = argument[2];
    const checkUrl = argument[3] === 'checkurl';
    log(checkUrl);
    try {
        fs.lstatSync(path);
    } catch (error) {
        if (error === 'ENOENT')
            log('File  or directory not found!');
        return;

    }


    if (fs.lstatSync(path).isFile()) {
        const result = await getFileAsync(path);
      await  showResults(path, result, checkUrl);
        return;
    }

    if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);

        for (const fileName of files) {
            const fullFileName = `${path}/${fileName}`;
            const file = await getFileAsync(fullFileName);
           await showResults(fullFileName, file, checkUrl);

        }

    }


}

async function showResults(filename = '', result, checkUrl) {

    if(checkUrl){
        log(chalk.bold.bgWhite.black('File:'), filename);
        log(chalk.bold.bgRed.black.overline('Links:'), await urlValidation(result));

    }else {
        log(chalk.bold.bgWhite.black('File:'), filename);
        log(chalk.bold.bgYellow.black('Links:'), result);
    }
}

await processText(argument);



