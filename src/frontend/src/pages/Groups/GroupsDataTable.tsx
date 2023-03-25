// @ts-nocheck

// Most carbon components lack typescript definitions
// this is notable around something complex like the DataTable used here,
// so we disable ts for the whole file as a workaround this is exported back to to View though, which still enables TS.

// see here for the current progress of adding TypeScript support to @carbon/react
// https://github.com/carbon-design-system/carbon/discussions/10752#discussioncomment-4710978

import {
    DataTable,
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableContainer,
    TableBody,
    TableCell
} from 'carbon-components-react';

export function GroupsDataTable({ groups }) {
    const headers = [
        { key: 'name', header: 'Name' },
        { key: 'project', header: 'Project' },
        { key: 'members', header: 'Members' }
    ];

    return (
        <DataTable rows={groups} headers={headers}>
            {({ rows, headers, getHeaderProps, getTableProps }) => (
                <TableContainer title='Groups'>
                    <Table {...getTableProps()}>
                        <TableHead>
                            <TableRow>
                                {headers.map(header => (
                                    <TableHeader {...getHeaderProps({ header })}>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.cells.map(cell => (
                                        <TableCell key={cell.id}>{cell.value}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </DataTable>
    );
}
