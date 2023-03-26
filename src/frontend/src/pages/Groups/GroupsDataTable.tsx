// @ts-nocheck

// Most carbon components lack typescript definitions
// this is notable around something complex like the DataTable used here,
// so we disable ts for the whole file as a workaround this is exported back to to View though, which still enables TS.

// see here for the current progress of adding TypeScript support to @carbon/react
// https://github.com/carbon-design-system/carbon/discussions/10752#discussioncomment-4710978

import {
    SmsDataTable,
    ExpandingDataTableHeader,
    ExpandingRowFragment
} from 'components/SmsDataTable/SmsDataTable';

import { Table, TableBody, TableContainer } from 'carbon-components-react';

export function GroupsDataTable({ groups }) {
    const headers = [
        { key: 'name', header: 'Name' },
        { key: 'project', header: 'Project' },
        { key: 'members', header: 'Members' }
    ];

    return (
        <SmsDataTable rows={groups} headers={headers} className='groups-page__datatable'>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
                <TableContainer title='Groups'>
                    <Table {...getTableProps()}>
                        <ExpandingDataTableHeader
                            headers={headers}
                            getHeaderProps={getHeaderProps}
                        />
                        <TableBody>
                            {rows.map(row => (
                                <ExpandingRowFragment
                                    row={row}
                                    headers={headers}
                                    getRowProps={getRowProps}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </SmsDataTable>
    );
}
