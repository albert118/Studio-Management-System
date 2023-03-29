import { IRowObject } from './DataTableInterfaces';

// Hydrate row data with common details required by the Carbon Desgin System datatable implementation
export function HyrdateRowObjects(dehydratedRows: Array<IRowObject>) {
    return dehydratedRows.map(row => {
        return {
            ...row,
            key: row.id,
            disabled: false,
            isSelected: false,
            isExpanded: false
        };
    });
}
