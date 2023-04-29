import { Tile, Grid, Column, ModalWrapper } from '@carbon/react';

export default function AdminDashboard() {
    return (
        <Grid className='admin-page'>
            <Column lg={16} md={8} sm={4} className='admin-page__r1'>
                <h1 className='admin-page__heading'>Admin dashboard</h1>
                <p className='admin-page__p'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae harum quo
                    culpa, quis labore nisi sint tempore illum reiciendis maiores enim! Aperiam
                    obcaecati quo repellendus cum at! Soluta, ducimus iusto!
                </p>
            </Column>
            <Column lg={16} md={8} sm={4} className='admin-page__r2'>
                <StatisticBox title='Assigned Groups' label='12 out of 30' variant='green' />
                <StatisticBox title='Assigned Groups' label='12 out of 30' variant='blue' />
                <StatisticBox title='Assigned Groups' label='12 out of 30' />
            </Column>
            <Column lg={16} md={8} sm={4} className='admin-page__r3'>
                <ManagementTile title='Groups' description='Archive, and lock groups in bulk'>
                    <ModalWrapper
                        buttonTriggerText='Add new owner contacts'
                        modalHeading='Create new contacts'
                    >
                        {/* <PendingApplications groupApplications={groupApplication} /> */}
                    </ModalWrapper>

                    <ModalWrapper
                        buttonTriggerText='Bulk group management'
                        modalHeading='Bulk group management'
                    >
                        {/* <PendingApplications groupApplications={groupApplication} /> */}
                    </ModalWrapper>
                </ManagementTile>
                <ManagementTile title='Projects' description='Archive, and lock projects in bulk'>
                    <ModalWrapper
                        buttonTriggerText='Bulk project management'
                        modalHeading='Bulk project management'
                    >
                        {/* <PendingApplications groupApplications={groupApplication} /> */}
                    </ModalWrapper>
                </ManagementTile>
                <ManagementTile
                    title='Group-Project Assignment'
                    description='Manage groups project assignement'
                >
                    <ModalWrapper
                        buttonTriggerText='Auto assign projects'
                        modalHeading='Auto assign projects'
                    >
                        {/* <PendingApplications groupApplications={groupApplication} /> */}
                    </ModalWrapper>

                    <ModalWrapper
                        buttonTriggerText='Manually assign projects'
                        modalHeading='Manually assign projects'
                    >
                        {/* <PendingApplications groupApplications={groupApplication} /> */}
                    </ModalWrapper>
                </ManagementTile>
            </Column>
        </Grid>
    );
}

function StatisticBox({ title, label, variant }) {
    const classes = variant ? `statistic-box ${variant}` : 'statistic-box';

    return (
        <Tile className={classes}>
            <div className='heading'>
                <h4>{title}</h4>
                <label>{label}</label>
            </div>
        </Tile>
    );
}

function ManagementTile({ title, description, children }) {
    return (
        <div className='management-tile'>
            <div className='heading'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className='actions'>{children}</div>
        </div>
    );
}
