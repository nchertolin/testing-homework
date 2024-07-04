import { CartApi, ExampleApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { appWithRouter } from './application';
import { checkRender } from './helpers/checkRender';
import { Page } from '../model/page';

describe('Pages should open:', () => {
    let store: any;
    
    beforeAll(() => {
        store = initStore(new ExampleApi(''), new CartApi());
    });
    
    it('Home', () => {
        const app = appWithRouter(store, Page.Home);
        checkRender(app, 'Home');
    });
    
    it('Catalog', () => {
        const app = appWithRouter(store, Page.Catalog);
        checkRender(app, 'Catalog');
    });
    
    it('Delivery', () => {
        const app = appWithRouter(store, Page.Delivery);
        checkRender(app, 'Delivery');
    });
    
    it('Cart', () => {
        const app = appWithRouter(store, Page.Cart);
        checkRender(app, 'Cart');
    });
});
