const classificationdata = require('./classificationdata.json');
const players = require('./playerdata.json');

const gcPoints = [500, 400, 300, 250, 200, 180, 160, 140, 125, 110, 100, 95, 90, 85, 80,
                 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5];
let scPoints, mcPoints, ycPoints;
scPoints = mcPoints = ycPoints = [250, 200, 150, 125, 100, 90, 80, 70, 60, 50, 40, 30, 
                                 20, 10, 5];

const gcRiders = classificationdata.General;
const scRiders = classificationdata.Sprint;
const mcRiders = classificationdata.Mountain;
const ycRiders = classificationdata.Youth;

let gc = {}, sc = {}, mc = {}, yc = {};

for (let i = 0; i < 30; i++) {
    gc[gcRiders[i].ShortName] = gcPoints[i];
}

for (let i = 0; i < 15; i++) {
    sc[scRiders[i].ShortName] = scPoints[i];
}

for (let i = 0; i < 15; i++) {
    mc[mcRiders[i].ShortName] = mcPoints[i];
}

for (let i = 0; i < 15; i++) {
    yc[ycRiders[i].ShortName] = ycPoints[i];
}

let playerPoints = {};

players.forEach(player => {
    playerPoints[player.name] = player.points;

    player.riders.forEach(rider => {
        let riderUppercase = rider.toUpperCase(); 

        if (gc[riderUppercase]) {
            playerPoints[player.name] += gc[riderUppercase];
        }

        if (sc[riderUppercase]) {
            playerPoints[player.name] += sc[riderUppercase];
        }

        if (mc[riderUppercase]) {
            playerPoints[player.name] += mc[riderUppercase];
        }

        if (yc[riderUppercase]) {
            playerPoints[player.name] += yc[riderUppercase];
        }
    });
});

console.log(playerPoints);
