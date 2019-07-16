const config = require('./config.json');
const playerdata = require('./playerdata.json');
const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeScores(url) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(config.classementUrl);
    await page.waitForSelector(`span[class="name"]`);
    const players = await page.evaluate(() => {
        let players = [];

        const ul = document.querySelector(`ul[class="members striped"]`);
        const text = ul.innerText
        const lines = text.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const nameRegex = /.*[A-Z][a-z]* [A-Z][.].*/;

            if (lines[i].match(nameRegex)) {
                const points = parseInt(lines[i+1], 10);
                let player = {name: lines[i], points: points};
                players.push(player);
            }
        }

        return players;
    });

    await browser.close();
    return players;
}

async function addScoresToData() {
    const playerScores = await scrapeScores(config.classementUrl);
    playerScores.forEach(playerScore => {
        playerdata.forEach(player => {
            if (playerScore.name === player.name) {
                player.points = playerScore.points;
            }
        });
    });

    fs.writeFile("playerdata.json", JSON.stringify(playerdata), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

addScoresToData();
