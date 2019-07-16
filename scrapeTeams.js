const config = require('./config.json');
const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapePlayerUrls() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(config.classementUrl);
    await page.waitForSelector('div[class="entry"]');
    const playerTeamUrls = await page.$$eval('div[class="entry"]', (entryDivs) => {
        let links = [];
        entryDivs.forEach(div => links.push(div.getAttribute('href')));
        return links;
    });

    await browser.close();

    return playerTeamUrls;
}

async function scrapePlayer(url) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });

    await page.goto(url);
    await page.waitForSelector('h3[data-bind="text: page2.member.user.fullName"]');
    const name = await page.$eval('h3[data-bind="text: page2.member.user.fullName"]', 
        nameDiv => nameDiv.innerHTML);
    const riders = await page.$$eval('div[class="box"]', (entryDivs) => {
        let links = [];
        entryDivs.forEach(div => {
            if (!div.innerText.includes("Onbeschikbaar")) {
                links.push(div.innerText)
            }
        });
        return links;
    });

    await browser.close();

    let player = {name: name, riders: riders};
    return player;
}

async function main() {
    const playerTeamUrls = await scrapePlayerUrls();
    let players = [];

    /** 
     * This could be way quicker when all the request are start at the same time, or
     * when chosen to keep one instance of puppeteer open. But the asyncForEach now
     * acts as a rate limiter and means we don't have to check when the last player
     * is scraped. Also I'm probably the only one ever using this script.
     */
    await asyncForEach(playerTeamUrls, async relativeUrl => {
        var player = await scrapePlayer("https://poules.com" + relativeUrl);
        players.push(player);
    });

    fs.writeFile("playerdata.json", JSON.stringify(players), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

//Ty https://github.com/Atinux
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

main();
