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
    TableToolbarSearch,
    Button
} from '@carbon/react';

import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { GoToButton } from 'components';

export function GroupsDataTable({ groups }) {
    const headers = [
        { key: 'name', header: 'Name' },
        { key: 'project', header: 'Project' },
        { key: 'memberCount', header: 'Members' }
    ];

    const navigate = useNavigate();

    const getRow = rowId => groups.find(({ id }) => id == rowId);

    return (
        <SmsDataTable rows={groups} headers={headers} className='groups-page__datatable'>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps, onInputChange }) => (
                <TableContainer
                    title='Groups'
                    description='This is a list of all the project for this semester.'
                >
                    <TableToolbar>
                        <TableToolbarContent>
                            <TableToolbarSearch defaultExpanded={true} onChange={onInputChange} />
                            <Button
                                onClick={() => navigate(`${AppRoutes.groups}/add`)}
                                kind='primary'
                            >
                                Create a new group
                            </Button>
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
                                    key={row.id}
                                    row={row}
                                    headers={headers}
                                    getRowProps={getRowProps}
                                >
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
            <div className='row-detail--r1'>
                <div className='description'>
                    <label>Description</label>
                    <p>{row && row.description ? row.description : ''}</p>
                </div>
                <div>
                    <label>Group members</label>
                    <ul>
                        {row && row.memberInfo?.members
                            ? row.memberInfo.members.map((member, idx) => (
                                  <li key={idx}>
                                      <p>{member.name}</p>
                                  </li>
                              ))
                            : ''}
                    </ul>
                </div>
                <div className='goto-action'>
                    <GoToButton text='View group' url={`${AppRoutes.group}/${row.id}`} />
                </div>
            </div>

            <div className='row-detail--r2'>
                <label>Project preferences</label>
                <ul className='preferences'>
                    {row.preferences && row.preferences.length > 0
                        ? row.preferences.map(preference => <li>{preference.title}</li>)
                        : 'This group has no project preferences (yet)'}
                </ul>
            </div>
        </div>
    );
}
