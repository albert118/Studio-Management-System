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

import {
    Table,
    TableBody,
    TableContainer,
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch
} from '@carbon/react';

export function GroupsDataTable({ groups }) {
    const headers = [
        { key: 'name', header: 'Name' },
        { key: 'project', header: 'Project' },
        { key: 'members', header: 'Members' }
    ];

    const getRow = rowId => groups.find(({ id }) => id == rowId);

    return (
        <SmsDataTable rows={groups} headers={headers} className='groups-page__datatable'>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps, onInputChange }) => (
                <TableContainer title='Groups'>
                    <TableToolbar>
                        <TableToolbarContent>
                            <TableToolbarSearch defaultExpanded={true} onChange={onInputChange} />
                        </TableToolbarContent>
                    </TableToolbar>
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
                                >
                                    {/* <p>{getRowDescription(row.id)}</p> */}
                                    <ExpandedRowDetail row={getRow(row.id)} />
                                </ExpandingRowFragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </SmsDataTable>
    );
}
function ExpandedRowDetail({ row }) {
    return (
        <div className='groups-page__datatable-row-detail'>
            <p>
                <h5>Description</h5>
                {row && row.description ? row.description : ''}
            </p>
            <div>
                <h5>Group Members</h5>
                <ul>
                    {row && row.MemberInfo?.members
                        ? row.MemberInfo.members.map(member => (
                              <li>
                                  <p>{member}</p>
                              </li>
                          ))
                        : ''}
                </ul>
            </div>
        </div>
    );
}
