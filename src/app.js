import fs from "fs";

const log = console.log;
const encoding = 'utf-8';
function onError(error) {
    log(error);
    throw new Error(error);
}

async function getFileAsync(file) {
    try {
        const text = await fs.promises.readFile(file, encoding);
        return extractLinks(text);
    } catch (error) {
        onError(error);
    }
}

function extractLinks(text) {

    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

    const captures = [...text.matchAll(regex)];

    return captures.length !== 0 ? captures.map(a => ({[a[1]]: a[2]})) : 'links not found!';

}

export default getFileAsync;
