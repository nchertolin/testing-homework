import { addToCart, clearCart, initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';
import { render } from '@testing-library/react';
import events from '@testing-library/user-event';
import { appWithRouter } from './application';
import { getProductDataInRow } from './helpers/getProductDataInRow';
import { getOrderTotal } from './helpers/getOrderTotal';
import '@testing-library/jest-dom'
import { Page } from '../model/page';


const basename = '/hw/store';
const page = Page.Cart;

describe('Cart', () => {
    let user = events.setup();
    let cart: CartApi;
    
    beforeEach(() => {
        cart = new CartApi();
        cart.setState({
            1: { name: 'Product 1', price: 100, count: 1 },
            2: { name: 'Product 2', price: 200, count: 2 },
        });
    });
    
    it('Link to the catalog must be displayed if the cart is empty', () => {
        cart.setState({})
        const store = initStore(new ExampleApi(basename), cart);
        const { getByRole } = render(appWithRouter(store, page));
        
        const link = getByRole('link', { name: 'catalog' });
        
        
        expect((link)?.getAttribute('href')).toBe(Page.Catalog);
    });
    
    it('Product in the cart must displays the name, price, count and total.', () => {
        const store = initStore(new ExampleApi(basename), cart);
        const product = { id: 2, ...cart.getState()[2] };
        const { getByTestId } = render(appWithRouter(store, page));
        
        
        const { name, count, price, total } = getProductDataInRow(getByTestId(product.id))
        
        expect(name).toBe(product.name);
        expect(count).toBe(product.count);
        expect(price).toBe(product.price);
        expect(total).toBe(product.price * product.count);
    });
    
    it('Cart total must calculated correctly', () => {
        const store = initStore(new ExampleApi(basename), cart);
        const { container } = render(appWithRouter(store, page));
        const totalElement = container.querySelector('.Cart-OrderPrice');
        const total = Number(totalElement?.textContent?.replace('$', ''));
        
        
        const expected = getOrderTotal(cart.getState());
        
        
        expect(total).toBe(expected);
    });
    
    it('Add product to cart', async () => {
        cart.setState({});
        const product = {
            id: 1,
            name: 'Product',
            price: 100,
            description: 'example',
            material: 'example',
            color: 'example',
        }
        const store = initStore(new ExampleApi(basename), cart);
        
        store.dispatch(addToCart(product));
        
        
        expect(store.getState().cart[product.id]?.count).toBe(1);
    });
    
    it('Increase product count in the cart', async () => {
        cart.setState({});
        const product = {
            id: 1,
            name: 'Product',
            price: 100,
            description: 'example',
            material: 'example',
            color: 'example',
            count: 1,
        }
        cart.setState({ [product.id]: product })
        const store = initStore(new ExampleApi(basename), cart);
        
        
        store.dispatch(addToCart(product))
        
        
        expect(store.getState().cart[product.id]?.count).toBe(product.count + 1);
    });
    
    it('Clear cart', async () => {
        const store = initStore(new ExampleApi(basename), cart);
        
        
        store.dispatch(clearCart());
        
        
        expect(store.getState().cart).toStrictEqual({});
    });
    
    it('Header must show the number of unique items in the cart', async () => {
        const store = initStore(new ExampleApi(basename), cart);
        const { queryByRole } = render(appWithRouter(store, page));
        
        
        const cartLength = Object.keys(store.getState().cart).length;
        
        
        expect(queryByRole('link',
            { name: `Cart (${cartLength})` }
        )).toBeInTheDocument();
    });
    
    it('Cart should be saved between page reloads', async () => {
        const product = { id: 1, name: 'Product 1', price: 100, count: 1 };
        const cartState = {
            [product.id]: {
                name: product.name,
                price: product.price,
                count: 1
            }
        };
        cart.setState(cartState)
        const store = initStore(new ExampleApi(basename), cart);
        const app = appWithRouter(store, page);
        const { rerender } = render(app);
        
        
        rerender(app)
        
        
        expect(store.getState().cart).toStrictEqual(cartState);
    });
    
    it('There should be a clear cart button on the page', async () => {
        const product = {
            id: 1,
            name: 'Product 1',
            price: 100,
            count: 1,
            color: 'red',
            material: 'wood',
            description: 'cool'
        };
        const cartState = {
            [product.id]: {
                name: product.name,
                price: product.price,
                count: 1
            }
        };
        cart.setState(cartState);
        const store = initStore(new ExampleApi(basename), cart);
        const { findByRole } = render(appWithRouter(store, Page.Cart))
        const button = await findByRole('button', { name: 'Clear shopping cart' });
        
        expect(button).toBeInTheDocument();
        
        
        await user.click(button)
        
        
        expect(store.getState().cart).toStrictEqual({});
    });
});


