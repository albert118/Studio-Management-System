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
} from '@carbon/react';

export function SmsDataTable({ rows, headers, tableHeader, ...optionalProps }) {
    // add a loading check here,
    // we can use the CBS skeleton prop, see here:
    // https://carbondesignsystem.com/developing/react-tutorial/step-3#add-loading
    return (
        <DataTable
            className={optionalProps.className != undefined && optionalProps.className}
            rows={HyrdateRowObjects(rows)}
            headers={headers}
            isSortable={true}
        >
            {optionalProps.children}
        </DataTable>
    );
}

export function ExpandingDataTableHeader({ headers, getHeaderProps }) {
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

export function ExpandingRowFragment({ row, headers, getRowProps, ...optionalProps }) {
    return (
        <React.Fragment key={row.id}>
            <TableExpandRow {...getRowProps({ row })}>
                {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
            </TableExpandRow>
            {row.isExpanded && (
                <TableExpandedRow colSpan={headers.length + 1}>
                    {optionalProps.children}
                </TableExpandedRow>
            )}
        </React.Fragment>
    );
}

export function SimpleHeader({ headers, getHeaderProps }) {
    return (
        <TableHead>
            <TableRow>
                {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })} isSortable={!!header.isSortable}>
                        {header.header}
                    </TableHeader>
                ))}
            </TableRow>
        </TableHead>
    );
}

export function SimpleRow({ row }) {
    return (
        <TableRow key={row.id}>
            {row.cells.map(cell => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
            ))}
        </TableRow>
    );
}
