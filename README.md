# Poules-tour-standings

Provides provisional standings for tour de france 2019 poules on poules.com. In this provisional standings the points for each classement is added to your score.

## Installation

1. Install [Node.JS](https://nodejs.org/en/download/).
2. Download or clone the repository.
3. Open a shell in the folder.
4. Run `npm install` to download the dependencies.
5. Set up the `config.json` file.

## Usage  
  
1. Run the scrape classification script with `node scrapeClassification`
2. Scrape the teams of your poule with `node scrapeTeams`
3. Scrape the standings of your poule with `node scrapePouleStandings`
4. Calculate the provisional standings with `node calculateProvisionalStandings`

## Configuration settings
`classementUrl`: The URL of your poules.com classement (should end with /klassement)

## Todo
- [ ] Make code more resilient.
- [ ] Order the provisional standings.
- [ ] Make the script runnable with one single command (npm start).
- [ ] Create webserver
- [ ] Improve naming
- [ ] Improve clarity in todo's
