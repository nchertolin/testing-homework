import { CartApi, ExampleApi } from '../../src/client/api';
import { getURL } from './helpers/getURL';
import { Page } from '../model/page';

const basename = process.env.BASENAME || 'http://localhost:3000/hw/store';

describe('Catalog', function () {
    let api: ExampleApi;
    let cart: CartApi;
    
    beforeEach(() => {
        api = new ExampleApi(basename);
        cart = new CartApi();
    });
    
    it('Product card correct displays the name and price', async ({ browser }) => {
        await browser.url(getURL(Page.Catalog));
        
        const item = await browser.$('.ProductItem ');
        const name = await item.$('.ProductItem-Name');
        const price = await item.$('.ProductItem-Price');
        
        
        expect(await name.isDisplayed()).toBe(true);
        expect(await price.isDisplayed()).toBe(true);
        
        
        expect((await name.getText()).length).not.toBe(0);
        expect(Number((await price.getText()).slice(1))).toBeGreaterThan(0);
        
    });
    
    it('Catalog should display products, fetched from the server', async ({ browser }) => {
        const productsFromApi = (await api.getProducts()).data;
        const productsNamesFromApi = productsFromApi.map((product) => product.name || '');
        
        
        await browser.url(getURL(Page.Catalog));
        const names = await Promise.all(
            await browser.$$('.ProductItem').map((product) => product.$('.ProductItem-Name').getText())
        );
        
        
        expect(names).toStrictEqual(productsNamesFromApi.filter(Boolean));
    });
});
