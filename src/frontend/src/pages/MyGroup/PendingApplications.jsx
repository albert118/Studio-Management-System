import {
    Table,
    TableBody,
    TableContainer,
    TableBatchActions,
    TableBatchAction,
    TableToolbar
} from '@carbon/react';
import { Close } from '@carbon/react/icons';
import { SmsDataTable } from 'components/SmsDataTable';
import { SelectableHeader, SelectableRow } from 'components/SmsDataTable/SmsDataTable';
import { useManageGroupApplication } from 'hooks';

export function PendingApplications({ groupApplications, onSubmit }) {
    const { rejectGroupApplication } = useManageGroupApplication();

    const headers = [
        { key: 'name', header: 'Name', isSortable: true },
        { key: 'message', header: 'Message' }
    ];

    const batchActionClick = async selectedRows => {
        rejectGroupApplication(
            selectedRows.filter(data => data.hasOwnProperty('id')).map(data => data.id)
        );

        await onSubmit();
    };

    return (
        <SmsDataTable rows={groupApplications} headers={headers} className='groups-page__datatable'>
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
                                    onClick={() => batchActionClick(selectedRows)}
                                >
                                    Reject
                                </TableBatchAction>
                            </TableBatchActions>
                        </TableToolbar>
                        <Table {...getTableProps()}>
                            <SelectableHeader
                                headers={headers}
                                getHeaderProps={getHeaderProps}
                                getSelectionProps={getSelectionProps}
                            />
                            <TableBody>
                                {rows.map(row => (
                                    <SelectableRow
                                        key={row.id}
                                        row={row}
                                        getRowProps={getRowProps}
                                        getSelectionProps={getSelectionProps}
                                    ></SelectableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            }}
        </SmsDataTable>
    );
}
