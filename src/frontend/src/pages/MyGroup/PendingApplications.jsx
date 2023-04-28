import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
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
import { Close, Checkmark } from '@carbon/react/icons';
import { SmsDataTable, SimpleHeader } from 'components/SmsDataTable';
import { useManageGroupApplicaton } from 'hooks';

export function PendingApplications(groupApplications) {
    const { manageGroupApplicaton } = useManageGroupApplicaton();
    const navigate = useNavigate();
    const headers = [
        { key: 'name', header: 'Name', isSortable: true },
        { key: 'message', header: 'Message' }
    ];
    const applications = groupApplications.groupApplications;

    const batchActionClick = (selectedRows, status) => () =>
        {
            manageGroupApplicaton({
                ids: selectedRows.filter(data => data.hasOwnProperty('id')).map(data => data.id),
                status: status});
            window.location.reload(false);
        }

    return (
        <SmsDataTable rows={applications} headers={headers} className='groups-page__datatable'>
            {({ rows, headers, getHeaderProps, getTableProps, getSelectionProps, getRowProps, getToolbarProps, selectedRows, getBatchActionProps }) => {
                const batchActionProps = getBatchActionProps(); 
                
                return (
                
                <TableContainer
                    title='Pending Group Application'
                    description='This is a list of all the group application for this semester.'
                >
                    <TableToolbar {...getToolbarProps()}>
                        <TableBatchActions {...batchActionProps}>
                            <TableBatchAction
                                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                renderIcon={Checkmark}
                                onClick={batchActionClick(selectedRows,true)}
                            >
                                Accept
                            </TableBatchAction>
                            <TableBatchAction
                                kind="danger"
                                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                renderIcon={Close}
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
                        {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        </TableRow>
                    ))}
            </TableBody>
                    </Table>
                </TableContainer>
            )}}
        </SmsDataTable>
    );
}
