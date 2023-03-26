import React from 'react';
import { HyrdateRowObjects } from './utils';

import {
    TableHead,
    TableHeader,
    TableExpandHeader,
    TableRow,
    TableExpandRow,
    TableExpandedRow,
    TableCell,
    DataTable
} from 'carbon-components-react';

export { SmsDataTable, ExpandingDataTableHeader, ExpandingRowFragment };

function SmsDataTable({ rows, headers, tableHeader, ...optionalProps }) {
    // add a loading check here,
    // we can use the CBS skeleton prop, see here:
    // https://carbondesignsystem.com/developing/react-tutorial/step-3#add-loading
    return (
        <DataTable
            className={optionalProps.className != undefined && optionalProps.className}
            rows={HyrdateRowObjects(rows)}
            headers={headers}
            useZebraStyles={true}
            isSortable={true}
        >
            {optionalProps.children}
        </DataTable>
    );
}

function ExpandingDataTableHeader({ headers, getHeaderProps }) {
    return (
        <TableHead>
            <TableRow>
                <TableExpandHeader />
                {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                ))}
            </TableRow>
        </TableHead>
    );
}

function ExpandingRowFragment({ row, headers, getRowProps }) {
    return (
        <React.Fragment key={row.id}>
            <TableExpandRow {...getRowProps({ row })}>
                {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
            </TableExpandRow>
            {row.isExpanded && (
                <TableExpandedRow colSpan={headers.length + 1}>
                    <p>Expanded!</p>
                </TableExpandedRow>
            )}
        </React.Fragment>
    );
}
