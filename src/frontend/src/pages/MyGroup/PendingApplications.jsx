import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import {
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableRow,
    Button,
    ButtonSet
} from '@carbon/react';
import { Close, Checkmark } from '@carbon/react/icons';
import { SmsDataTable, SimpleHeader } from 'components/SmsDataTable';
import { useManageGroupApplicaton } from 'hooks';

export function PendingApplications(groupApplications) {
    const { manageGroupApplicaton } = useManageGroupApplicaton();
    const navigate = useNavigate();
    const headers = [
        { key: 'name', header: 'Name', isSortable: true },
        { key: 'message', header: 'Message' },
        { key: 'options', header: 'Options' }
    ];
    const applications = groupApplications.groupApplications;

    return (
        <SmsDataTable rows={applications} headers={headers} className='groups-page__datatable'>
            {({ rows, headers, getHeaderProps, getTableProps }) => (
                <TableContainer
                    title='Pending Group Application'
                    description='This is a list of all the group application for this semester.'
                >
                    <Table {...getTableProps()}>
                        <SimpleHeader headers={headers} getHeaderProps={getHeaderProps} />
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.cells.map(cell => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {cell.id.includes('options') ? (
                                                    <>
                                                        <ButtonSet>
                                                            <Button
                                                                renderIcon={Checkmark}
                                                                onClick={() => {
                                                                    manageGroupApplicaton({
                                                                        id: cell.id.replace(
                                                                            ':options',
                                                                            ''
                                                                        ),
                                                                        status: true
                                                                    });
                                                                    window.location.reload(false);
                                                                }}
                                                                hasIconOnly
                                                                kind='primary'
                                                                size='sm'
                                                                iconDescription='Accept'
                                                                tooltipAlignment='centre'
                                                                tooltipPosition='left'
                                                            />
                                                            <span>&nbsp;&nbsp;&nbsp;</span>
                                                            <Button
                                                                renderIcon={Close}
                                                                onClick={() => {
                                                                    manageGroupApplicaton({
                                                                        id: cell.id.replace(
                                                                            ':options',
                                                                            ''
                                                                        ),
                                                                        status: false
                                                                    });
                                                                    window.location.reload(false);
                                                                }}
                                                                hasIconOnly
                                                                kind='danger'
                                                                size='sm'
                                                                iconDescription='Reject'
                                                                tooltipAlignment='centre'
                                                                tooltipPosition='right'
                                                            />
                                                        </ButtonSet>
                                                    </>
                                                ) : (
                                                    cell.value
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </SmsDataTable>
    );
}
