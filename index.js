const puppeteer = require('puppeteer')
const fs = require('fs')

const links = [
    "https://www.ducks.org/hunting/waterfowl-id/mallard",
    "https://www.ducks.org/hunting/waterfowl-id/northern-pintail",
    "https://www.ducks.org/hunting/waterfowl-id/gadwall",
    "https://www.ducks.org/hunting/waterfowl-id/green-winged-teal",
    "https://www.ducks.org/hunting/waterfowl-id/wood-duck",
    "https://www.ducks.org/hunting/waterfowl-id/blue-winged-teal",
    "https://www.ducks.org/hunting/waterfowl-id/american-wigeon",
    "https://www.ducks.org/hunting/waterfowl-id/canvasback",
    "https://www.ducks.org/hunting/waterfowl-id/redhead",
    "https://www.ducks.org/hunting/waterfowl-id/bufflehead",
    "https://www.ducks.org/hunting/waterfowl-id/lesser-scaup",
    "https://www.ducks.org/hunting/waterfowl-id/common-goldeneye",
    "https://www.ducks.org/hunting/waterfowl-id/hooded-merganser",
    "https://www.ducks.org/hunting/waterfowl-id/king-eider",
    "https://www.ducks.org/hunting/waterfowl-id/canada-goose",
    "https://www.ducks.org/hunting/waterfowl-id/snow-goose",
    "https://www.ducks.org/hunting/waterfowl-id/ross-goose",
    "https://www.ducks.org/hunting/waterfowl-id/brant",
    "https://www.ducks.org/hunting/waterfowl-id/white-fronted-goose",
    "https://www.ducks.org/hunting/waterfowl-id/cackling-goose",
    "https://www.ducks.org/hunting/waterfowl-id/emperor-goose",
    "https://www.ducks.org/hunting/waterfowl-id/ruddy-duck",
    "https://www.ducks.org/hunting/waterfowl-id/american-coot",
    "https://www.ducks.org/hunting/waterfowl-id/sandhill-crane",
    "https://www.ducks.org/hunting/waterfowl-id/tundra-swan",
    "https://www.ducks.org/hunting/waterfowl-id/mute-swan",
    "https://www.ducks.org/hunting/waterfowl-id/trumpeter-swan",
    "https://www.ducks.org/hunting/waterfowl-id/black-bellied-whistling-duck",
]

async function main() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    let database = []
    for (let link of links) {
        await page.goto(link)
        let h1 = await page.$('h1')
        let name = await h1.evaluate(node => node.textContent)
        let img = await page.$('picture img')
        let imageSrc = await img.evaluate(node => node.src)
        let strongs = await page.$$('p > strong')
        let facts = []
        for (let strong of strongs) {
            let key = await strong.evaluate(node => node.textContent)
            let value = await strong.evaluate(node => node.parentElement.textContent)
            value = value.substring(key.length + 2);
            facts.push([key, value])
        }
        database.push({name, imageSrc, facts, link})
    }
    fs.writeFileSync('ducks.json', JSON.stringify(database, null, 4))
    await browser.close()
}

main()