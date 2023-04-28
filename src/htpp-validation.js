export default async function urlValidation(links) {
    const linksExtracted = extrackLinks(links);
    const status = await checkStatus(linksExtracted);

    return links.map((object, index) => ({
        ...object,
        status: status[index]
    }))
}

function extrackLinks(links) {

    return links.length !== 0 && links !== 'links not found!' ? links.map((o) => Object.values(o).join()) : 'links not found!';

}

function onError(erro) {

    if (erro.cause.code === 'ENOTFOUND')
        return 'invalid url';
    return 'request error';

}

async function checkStatus(urlList) {
    return await Promise.all(
        urlList.map(async (url) => {
                try {
                    const response = await fetch(url, {method: 'HEAD'});
                    return response.status;
                } catch (error) {
                   return onError(error);
                }
            }
        )
    )
        ;
}





