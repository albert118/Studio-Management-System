import {
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableRow,
    TableBatchActions,
    TableBatchAction,
    TableToolbar,
    TableSelectRow,
    TableHeader,
    TableHead,
    TableSelectAll
} from '@carbon/react';
import { Close } from '@carbon/react/icons';
import { SmsDataTable } from 'components/SmsDataTable';
import { useManageGroupApplication } from 'hooks';

export function PendingApplications(groupApplications) {
    const { rejectGroupApplication } = useManageGroupApplication();
    const headers = [
        { key: 'name', header: 'Name', isSortable: true },
        { key: 'message', header: 'Message' }
    ];
    const applications = groupApplications.groupApplications;

    const batchActionClick = selectedRows => () => {
        rejectGroupApplication({
            ids: selectedRows.filter(data => data.hasOwnProperty('id')).map(data => data.id)
        });
        window.location.reload(false);
    };

    return (
        <SmsDataTable rows={applications} headers={headers} className='groups-page__datatable'>
            {({
                rows,
                headers,
                getHeaderProps,
                getTableProps,
                getSelectionProps,
                getRowProps,
                getToolbarProps,
                selectedRows,
                getBatchActionProps
            }) => {
                const batchActionProps = getBatchActionProps();

                return (
                    <TableContainer
                        title='Pending Group Application'
                        description='This is a list of all the group application for this semester.'
                    >
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...batchActionProps}>
                                <TableBatchAction
                                    kind='danger'
                                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                    renderIcon={Close}
                                    onClick={batchActionClick(selectedRows)}
                                >
                                    Reject
                                </TableBatchAction>
                            </TableBatchActions>
                        </TableToolbar>
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    <TableSelectAll {...getSelectionProps()} />
                                    {headers.map((header, i) => (
                                        <TableHeader key={i} {...getHeaderProps({ header })}>
                                            {header.header}
                                        </TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, i) => (
                                    <TableRow key={i} {...getRowProps({ row })}>
                                        <TableSelectRow {...getSelectionProps({ row })} />
                                        {row.cells.map(cell => (
                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            }}
        </SmsDataTable>
    );
}
