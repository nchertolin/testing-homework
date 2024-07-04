import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import { Page } from '../model/page';


export const app = (store: any, component: ReactNode) => (
    <Provider store={store}>
        {component}
    </Provider>
);


export const appWithRouter = (store: any, currentPage?: Page) => (
    <MemoryRouter initialEntries={[currentPage]}
                  initialIndex={0}>
        <Provider store={store}>
            <Application />
        </Provider>
    </MemoryRouter>
);
