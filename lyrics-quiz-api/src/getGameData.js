const axios = require('axios');
const cheerio = require('cheerio');

const extractTitle = (fullHTML) => {
    const $ = cheerio.load(fullHTML);
    return $('title').html().split('|')[0].trim();
}

const extractLyrics = (fullHTML) => {
    const $ = cheerio.load(fullHTML);

    let lyrics = $('div.lyrics').text()

        /* genius.org serves two DOMs for its lyrics pages, the below
           scrapes the second style (that does not contain a lyrics div) */

        if(!lyrics){
            $('[class^=Lyrics__Container]').each((i, el) => {
                const html = $(el).html()
                const lined = html.replace(/<br\s*[\/]?>/gi, "\n")
                const stripped = lined.replace(/<[^>]+>/ig, '')
                const trimmed = stripped.trim()
                const final = trimmed + '\n';
                lyrics += final
            })
        }
        if(!lyrics || fullHTML.includes('Lyrics for this song have yet to be')) {
            console.log('Failed to capture lyrics or none present')
            if(fullHTML.includes('Burrr!'))
                console.log('could not find url ', url)
            return null
        }
    return lyrics;
}

const getGameData = async (resource) => {
    let gameData = {}            
    gameData.link = `https://genius.com/${resource}`;

    const res = await axios.get(gameData.link);

    try {
        const fullHTML = res.data;
        gameData.title = extractTitle(fullHTML)
        gameData.lyrics = extractLyrics(fullHTML);
    } catch (e) {
        console.log(e);
        gameData.title = null;
        gameData.lyrics = null;
    }

    return gameData;
}

module.exports =  getGameData;
