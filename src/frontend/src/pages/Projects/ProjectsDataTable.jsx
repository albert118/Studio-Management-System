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

export function ProjectsDataTable({ projects }) {
    const headers = [
        { key: 'title', header: 'Name' },
        { key: 'description', header: 'Description' },
        { key: 'principalOwnerName', header: 'Principal Owner' },
        { key: 'ownerNames', header: 'Owner(s)' }
    ];

    const navigate = useNavigate();

    const getRow = rowId => projects.find(({ id }) => id == rowId);

    return (
        <SmsDataTable rows={projects} headers={headers} className='projects-page__datatable'>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps, onInputChange }) => (
                <TableContainer
                    title='Projects'
                    description='This is a list of all the project for this semester.'
                >
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
        <div className='projects-page__datatable-row-detail'>
            <div className='goto-action'>
                <GoToButton text='View project' url={`${AppRoutes.project}/${row.id}`} />
            </div>
        </div>
    );
}
