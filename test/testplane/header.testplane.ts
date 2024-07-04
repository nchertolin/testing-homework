import { getURL } from './helpers/getURL';
import { Page } from '../model/page';


const path = '/hw/store';

describe('Header', function () {
    
    it('Brand name in the header should be a link to the main page', async ({ browser }) => {
        await browser.url(getURL(Page.Home));
        
        
        const brandElement = await browser.$('.Application-Brand')
        const brandLink = await brandElement.getAttribute('href')
        
        expect(brandLink).toBe(path + Page.Home)
    });
    
    
    it('Header displays links to store catalog, delivery, contacts and cart pages', async ({ browser }) => {
        await browser.url(getURL(Page.Home));
        
        
        const links = await browser.$$('.nav-link').map(async (link) => await Promise.all([
            link.getText(),
            link.getAttribute('href')
        ]));
        
        expect(links).toStrictEqual([
            ['Catalog', path + Page.Catalog],
            ['Delivery', path + Page.Delivery],
            ['Contacts', path + Page.Contacts],
            ['Cart', path + Page.Cart],
        ]);
    });
    
});
