import { CartItem } from '../../../src/common/types';

interface CartRow extends CartItem {
    total: number
}

export function getProductDataInRow(row: HTMLElement): CartRow {
    return {
        name: row.querySelector<HTMLTableCellElement>('.Cart-Name')?.textContent ?? '',
        price: Number(row.querySelector<HTMLTableCellElement>('.Cart-Price')?.textContent.replace('$', '')) ?? 0,
        count: Number(row.querySelector<HTMLTableCellElement>('.Cart-Count')?.textContent) ?? 0,
        total: Number(row.querySelector<HTMLTableCellElement>('.Cart-Total')?.textContent.replace('$', '')) ?? 0,
    }
}
