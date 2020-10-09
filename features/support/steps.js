const { Given, When, Then, BeforeAll, AfterAll } = require("@cucumber/cucumber")
const { remote } = require('webdriverio')

let browser

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
BeforeAll(async () => {
    browser = await remote({
        logLevel: 'trace',
        capabilities: {
            browserName: 'chrome'
        }
    })
})

AfterAll(async () => {
    await browser.deleteSession()
})

Given('the website is open', async () => {
    await browser.url('https://lehrermarktplatz.de/')
})

When('I click on login menu', async () => {
    const loginShowButton = await browser.$('//div[contains(text(),\'Anmelden\')]')
    await loginShowButton.click()
})

When('I fill in username and password', async () => {
    const email = await browser.$('#formBasicEmail')
    await email.setValue(process.env.SITE_USER)
    const password = await browser.$('#formBasicPassword')
    await password.setValue(process.env.SITE_PASSWORD)
})

When('I click on login button', async () => {
    const submitBtn = await browser.$('//button[contains(text(),\'Anmelden\')]')
    await submitBtn.click()
})

When('I wait for user icon', async () => {
    await (await browser.$('//div[@class="ellipsis user-name"]')).waitForExist({reverse: true, timeout: 5000})
    sleep(1000)
})

When('I search for {string}', async (searchString) => {
    const searchInput = await browser.$('.react-autosuggest__input')
    await searchInput.setValue(searchString)
    const searchButton = await browser.$('.search')
    await searchButton.click()
})

When('I filter by {string}', async (filterSelector) => {
    const facet = await browser.$(filterSelector)
    await facet.click()
})



Then('I should find the user icon', async () => {
    await (await browser.$('//div[@class="ellipsis user-name"]')).waitForExist({reverse: true, timeout: 5000})
    sleep(1000)
})

Then('I click on logout button', async () => {
    const showUserMenuButton = await browser.$('//div[@class="ellipsis user-name"]')
    await showUserMenuButton.click()
    const logoutLink = await browser.$('.logout-link')
    await logoutLink.click()
    browser.acceptAlert()
})
