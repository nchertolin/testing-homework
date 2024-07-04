import { getURL } from './helpers/getURL';
import { Page } from '../model/page';


describe('Menu', async function () {
    const page = Page.Contacts;
    
    beforeEach(async ({ browser }) => {
        await browser.setWindowRect(0, 0, 576 - 1, 932);
    })
    
    it('On width < 576px menu should be hide', async ({ browser }) => {
        await browser.url(getURL(page));
        const menu = await browser.$('.Application-Menu');
        
        expect(await menu.isDisplayed()).toBe(false);
        
        
        await browser.setWindowRect(0, 0, 430, 932);
        expect(await menu.isDisplayed()).toBe(false);
        
        
        await browser.setWindowRect(0, 0, 1920, 1080);
        expect(await menu.isDisplayed()).toBe(true);
    });
    
    it('Open menu on burger button click', async ({ browser }) => {
        await browser.url(getURL(page));
        const menu = await browser.$('.Application-Menu');
        const burger = await browser.$('.Application-Toggler');
        
        expect(await menu.isDisplayed()).toBe(false);
        
        await burger.click();
        
        expect(await menu.isDisplayed()).toBe(true);
    });
    
    it('Close menu on double-click burger button', async ({ browser }) => {
        await browser.url(getURL(page));
        
        const menu = await browser.$('.Application-Menu');
        const burger = await browser.$('.Application-Toggler');
        
        await Promise.all([burger.click(), burger.click()]);
        
        
        expect(await menu.isDisplayed()).toBe(false);
    });
    
    it('Close menu on menu-item click', async ({ browser }) => {
        await browser.url(getURL(page));
        const menu = await browser.$('.Application-Menu');
        const links = await browser.$$('.nav-link');
        const burger = await browser.$('.Application-Toggler');
        
        
        await burger.click();
        await links[0].click();
        
        
        expect(await menu.isDisplayed()).toBe(false);
    });
});
