import { Table, TableBody, TableContainer } from '@carbon/react';

import { SmsDataTable, ExpandingDataTableHeader, SimpleRow } from 'components/SmsDataTable';

export function PendingApplications(groupApplications) {
    const headers = [
        { key: 'firstName', header: 'First Name' },
        { key: 'lastName', header: 'Last Name' },
        { key: 'email', header: 'Email' },
        { key: 'message', header: 'Message' }
        // TODO: add management logic
        // { key: 'options', header: 'Options' }
    ];
    const applications = groupApplications.groupApplications;
    return (
        <SmsDataTable rows={applications} headers={headers} className='groups-page__datatable'>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
                <TableContainer
                    title='Pending Group Application'
                    description='This is a list of all the group application for this semester.'
                >
                    <Table {...getTableProps()}>
                        <ExpandingDataTableHeader
                            headers={headers}
                            getHeaderProps={getHeaderProps}
                        />
                        <TableBody>
                            {rows.map(row => (
                                <SimpleRow row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </SmsDataTable>
    );
}
