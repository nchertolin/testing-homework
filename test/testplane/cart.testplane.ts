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
    
    it('Add to cart, filling and sending form', async ({ browser }) => {
        const productId = 1;
        await browser.url(getURL(Page.Product + '/' + productId));
        
        
        const button = await browser.$('.ProductDetails-AddToCart');
        await button.click();
        
        await browser.url(getURL(Page.Cart));
        
        
        try {
            const name = await browser.$('.Form-Field_type_name');
            const phone = await browser.$('.Form-Field_type_phone');
            const address = await browser.$('.Form-Field_type_address');
            
            
            await name.setValue('Nikita');
            await phone.setValue('+79999999999');
            await address.setValue('New York, 1st street');
        } catch (err) {
            throw new Error('Cart is empty');
        }
        
        const submitButton = await browser.$('.Form-Submit');
        
        await submitButton.click();
        
        const alert = await browser.$('.Cart-SuccessMessage');
        await alert.waitForDisplayed();
        // const success = await browser.$('.alert-success');
        const classnames = await alert.getAttribute('class');
        
        expect(classnames).toContain('alert-success');
        
        
        const orderId = await browser.$('.Cart-Number');
        expect(await orderId.getText()).toBe('1');
    });
    
});