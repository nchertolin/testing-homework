import events from '@testing-library/user-event';
import { CartApi, ExampleApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { render } from '@testing-library/react';
import { app } from './application';
import '@testing-library/jest-dom';
import { Form } from '../../src/client/components/Form';
import React from 'react';


const basename = '/hw/store';

describe('Form', () => {
    const user = events.setup();
    
    it('Form should be successful validated', async () => {
        const store = initStore(new ExampleApi(basename), new CartApi());
        const { getByRole } = render(app(store, <Form onSubmit={() => {
        }} />));
        
        const name = getByRole('textbox', { name: 'Name' });
        const phone = getByRole('textbox', { name: 'Phone' });
        const address = getByRole('textbox', { name: 'Address' });
        const button = getByRole('button', { name: 'Checkout' });
        
        await user.type((name), 'Nikita');
        await user.type((phone), '+79999999999');
        await user.type((address), 'New York, 1st street');
        
        await user.click((button));
        
        expect(name.getAttribute('class')).not.toContain('is-invalid');
        expect(phone.getAttribute('class')).not.toContain('is-invalid');
        expect(address.getAttribute('class')).not.toContain('is-invalid');
    });
});
