import { initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import { app } from './application';


const basename = '/hw/store';


describe('Product', () => {
    let cart: CartApi;
    
    beforeEach(() => {
        cart = new CartApi();
    });
    
    it('Product page should displays product\'s name, description, price, color, material', async () => {
        const product = {
            id: 1,
            name: 'Product',
            price: 100,
            description: 'description',
            material: 'material',
            color: 'color'
        };
        const store = initStore(new ExampleApi(basename), cart);
        
        
        const { queryByText } = render(app(store, <ProductDetails product={product} />));
        
        
        expect(queryByText(product.name)).toBeInTheDocument();
        expect(queryByText(product.description)).toBeInTheDocument();
        expect(queryByText(`$${product.price}`)).toBeInTheDocument();
        expect(queryByText(product.color)).toBeInTheDocument();
        expect(queryByText(product.material)).toBeInTheDocument();
        
    });
});


