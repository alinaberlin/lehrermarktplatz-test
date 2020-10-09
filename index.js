//const loginShowButton = await driver.findElement(By.xpath("//div[contains(text(),'Anmelden')]"))
//const facebookButton = await driver.findElement(By.className('custom-fa-icon'))
//await driver.get('https://lehrermarktplatz.de/')
const { remote } = require('webdriverio');

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

(async () => {
    const browser = await remote({
        logLevel: 'trace',
        capabilities: {
            browserName: 'chrome'
        }
    })

    await browser.url('https://lehrermarktplatz.de/')
    // login
    const loginShowButton = await browser.$('//div[contains(text(),\'Anmelden\')]')
    await loginShowButton.click()

    const email = await browser.$('#formBasicEmail')
    await email.setValue(process.env.SITE_USER)
    const password = await browser.$('#formBasicPassword')
    await password.setValue(process.env.SITE_PASSWORD)

    const submitBtn = await browser.$('//button[contains(text(),\'Anmelden\')]')
    await submitBtn.click()
    await (await browser.$('//div[@class="ellipsis user-name"]')).waitForExist({reverse: true, timeout: 5000})
    await sleep(2000)
    // search
    //const searchInput = await browser.$('//div[@class="main-search d-none d-lg-flex input-group"]/div[2]/input')
    //*[@id="root"]/div/div[1]/div/div[2]/div[2]/div/input
    // search
    const searchInput = await browser.$('.react-autosuggest__input')
    await searchInput.setValue('homeschooling')
    const searchButton = await browser.$('.search')
    await searchButton.click()
    // filter
    const priceFacet = await browser.$('//input[@id="prc-<2€"]')
    await priceFacet.click()
    const yearFacet = await browser.$('//input[@id="ly-1. Lernjahr"]')
    await yearFacet.click()
    await sleep(2000)
    // add product to wish list
    const favouriteButton = await browser.$('.favorite-label-long')
    await favouriteButton.click()

    // logout
    const showUserMenuButton = await browser.$('//div[@class="ellipsis user-name"]')
    await showUserMenuButton.click()
    const logoutLink = await browser.$('.logout-link')
    await logoutLink.click()
    browser.acceptAlert()
    //a class="" data-amount="1" href="/merkzettel"
   // await browser.deleteSession()
})().catch((e) => console.error(e))
