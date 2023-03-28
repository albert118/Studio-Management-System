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
    TableToolbarSearch,
    Button,
    Pagination
} from 'carbon-components-react';

export function ProjectsDataTable({ projects }) {
    const headers = [
        { key: 'name', header: 'Name' },
        { key: 'description', header: 'Description' }
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
                            <TableToolbarSearch onChange={onInputChange} />
                            <Button onClick={() => navigate(`${AppRoutes.projects}/add`)}>
                                Create A New Project
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
