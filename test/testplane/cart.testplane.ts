import { getURL } from './helpers/getURL';
import { Page } from '../model/page';


describe('Cart', function () {
    
    afterEach(async ({ browser }) => {
        await browser.execute(() => {
            localStorage.clear();
        });
        await browser.refresh();
    });
    
    it('There should be a clear cart button on the page', async ({ browser }) => {
        await browser.url(getURL(Page.Catalog));
        
        
        const button = await browser.$('.Cart-Clear');
        
        
        expect(button).not.toBeNull();
    });
    
    it('Add to cart, filling and successful checkout', async ({ browser }) => {
        const productId = 1;
        await browser.url(getURL(Page.Product + '/' + productId));
        
        try {
            const button = await browser.$('.ProductDetails-AddToCart');
            await button.click();
        } catch (err) {
            throw new Error('Product not found');
        }
        
        await browser.url(getURL(Page.Cart));
        
        
        try {
            const name = await browser.$('.Form-Field_type_name');
            const phone = await browser.$('.Form-Field_type_phone');
            const address = await browser.$('.Form-Field_type_address');
            
            
            await name.setValue('Nikita');
            await phone.setValue('+79999999999');
            await address.setValue('New York, 1st street');
        } catch (err) {
            throw new Error('Product not added to cart');
        }
        
        const submitButton = await browser.$('.Form-Submit');
        
        await submitButton.click();
        
        let classnames: string;
        try {
            const alert = await browser.$('.Cart-SuccessMessage');
            await alert.waitForDisplayed();
            classnames = await alert.getAttribute('class');
        } catch (err) {
            throw new Error('Form in not valid or checkout error');
        }
        
        expect(classnames).toContain('alert-success');
        
        const orderId = await browser.$('.Cart-Number');
        expect(await orderId.getText()).toBe('1');
    });
    
});
