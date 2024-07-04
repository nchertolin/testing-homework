import events from '@testing-library/user-event';
import { CartApi, ExampleApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { render, screen } from '@testing-library/react';
import { app } from './application';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import '@testing-library/jest-dom';
import React from 'react';


const basename = '/hw/store';

describe('Badge', () => {
    const user = events.setup();
    let cart: CartApi;
    
    beforeEach(() => {
        cart = new CartApi();
    });
    
    it('Badge "Item in cart" must shows on "Add to Cart" button click', async () => {
        const product = {
            id: 1, name: 'Product', price: 100, description: 'example', material: 'example', color: 'example'
        };
        const store = initStore(new ExampleApi(basename), cart);
        const { getByText } = render(app(store, <ProductDetails product={{
            ...product,
            
        }} />));
        const button = getByText('Add to Cart');
        
        
        await user.click((button));
        
        expect(await screen.findByText('Item in cart')).toBeInTheDocument();
    });
    
    it('"Item in cart" badge should be displayed if the item is in the cart', () => {
        const product = { id: 1, name: 'Product', price: 100, count: 1 };
        cart.setState({
            [product.id]: product,
        })
        const store = initStore(new ExampleApi(basename), cart);
        const { getByText } = render(app(store, <ProductDetails product={{
            ...product,
            description: 'example',
            material: 'example',
            color: 'example',
        }} />));
        
        
        expect(getByText('Item in cart')).toBeInTheDocument();
    });
    
    it('"Item in cart" badge should NOT be displayed if the item is NOT in the cart', () => {
        const product = { id: 1, name: 'Product', price: 100, count: 1 };
        const product2 = {
            id: 2,
            name: 'Product 2',
            price: 100,
            description: 'example',
            material: 'example',
            color: 'example'
        };
        cart.setState({
            [product.id]: product,
        })
        const store = initStore(new ExampleApi(basename), cart);
        const { queryByText } = render(app(store, <ProductDetails product={product2} />));
        
        
        expect(queryByText('Item in cart')).not.toBeInTheDocument();
    });
    
});
