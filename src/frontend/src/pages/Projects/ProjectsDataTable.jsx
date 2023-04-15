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

export function ProjectsDataTable({ projects }) {
    const headers = [
        { key: 'title', header: 'Name' },
        { key: 'description', header: 'Description' },
        { key: 'owners', header: 'Owner(s)' }
    ];

    const getRow = rowId => projects.find(({ id }) => id == rowId);

    return (
        <SmsDataTable rows={projects} headers={headers} className='projects-page__datatable'>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps, onInputChange }) => (
                <TableContainer
                    title='Projects'
                    description='This is a list of all the project for this semsester.'
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
            <p>
                <h5>Description</h5>
                {row && row.description ? row.description : ''}
            </p>
        </div>
    );
}
