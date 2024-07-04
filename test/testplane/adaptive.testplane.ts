import { getURL } from './helpers/getURL';
import { Page } from '../model/page';


describe('Adaptive', async function () {
    
    beforeEach(async ({ browser }) => {
        await browser.setWindowRect(0, 0, 430, 932,);
    })
    
    afterEach(async ({ browser }) => {
        await browser.assertView(`plain`, 'body');
    })
    
    it('Home', async ({ browser }) => {
        await browser.url(getURL(Page.Home));
    });
    
    it('Catalog', async ({ browser }) => {
        await browser.url(getURL(Page.Catalog));
    });
    
    it('Delivery', async ({ browser }) => {
        await browser.url(getURL(Page.Delivery));
    });
    
    it('Contacts', async ({ browser }) => {
        await browser.url(getURL(Page.Contacts));
    });
    
    it('Cart', async ({ browser }) => {
        await browser.url(getURL(Page.Cart));
    });
    
    it('Product', async ({ browser }) => {
        await browser.url(getURL(Page.Product + '/1'));
    });
});
