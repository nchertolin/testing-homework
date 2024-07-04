import { CartState } from '../../../src/common/types';

export function getOrderTotal(cart: CartState) {
    return Object.values(cart).reduce((sum, { count, price }) => sum + count * price, 0);
}
