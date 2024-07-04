import { getURL } from './helpers/getURL';
import { Page } from '../model/page';


describe('Product', async function () {
    
    it('Product page should displays product\'s name, description, price, color, material', async ({ browser }) => {
        await browser.url(getURL(Page.Product + '/1'));
        
        const name = await browser.$('.ProductDetails-Name');
        const description = await browser.$('.ProductDetails-Description');
        const price = await browser.$('.ProductDetails-Price');
        const color = await browser.$('.ProductDetails-Color');
        const material = await browser.$('.ProductDetails-Material');
        
        
        expect(await name.isDisplayed()).toBe(true);
        expect(await description.isDisplayed()).toBe(true);
        expect(await price.isDisplayed()).toBe(true);
        expect(await color.isDisplayed()).toBe(true);
        expect(await material.isDisplayed()).toBe(true);
    });
    
    it('"Add to Cart" button must be large size', async ({ browser }) => {
        await browser.url(getURL(Page.Product + '/1'));
        
        const button = await browser.$('.ProductDetails-AddToCart');
        
        expect(await button.getAttribute('class')).toContain('btn-lg');
    });
    
});
