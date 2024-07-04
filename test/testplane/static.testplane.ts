import { getURL } from './helpers/getURL';
import { Page } from '../model/page';


describe('Static pages must have static content', async function () {
    
    afterEach(async ({ browser }) => {
        await browser.assertView(`plain`, 'body');
    })
    
    it('Home', async ({ browser }) => {
        await browser.url(getURL(Page.Home));
    });
    
    it('Delivery', async ({ browser }) => {
        await browser.url(getURL(Page.Delivery));
    });
    
    it('Contacts', async ({ browser }) => {
        await browser.url(getURL(Page.Contacts));
    });
});
