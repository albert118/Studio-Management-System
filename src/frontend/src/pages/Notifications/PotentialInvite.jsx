import { SmsDataTable, SelectableHeader, SelectableRow } from 'components/SmsDataTable';
import {
    Table,
    TableBody,
    TableContainer,
    TableBatchActions,
    TableBatchAction,
    TableToolbar
} from '@carbon/react';

export function PotentialInvites({ invites }) {
    const headers = [
        { key: 'name', header: 'Name', isSortable: true },
        { key: 'message', header: 'Message' }
    ];

    return (
        <SmsDataTable rows={invites} headers={headers}>
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
                    <TableContainer>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...batchActionProps}>
                                <TableBatchAction
                                    kind='danger'
                                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                    renderIcon={Close}
                                    onClick={() =>
                                        console.log(`rejected with row data: ${selectedRows}`)
                                    }
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
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            }}
        </SmsDataTable>
    );
}
