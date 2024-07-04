import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

export function checkRender(app: any, text: string) {
    const { container } = render(app);
    
    const element = container.querySelector(`.${text}`);
    
    
    expect(element).toBeInTheDocument();
}
