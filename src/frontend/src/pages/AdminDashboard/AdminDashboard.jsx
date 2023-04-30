import { Collaborate, Roadmap, Task, IbmWatsonTextToSpeech } from '@carbon/icons-react';
import { Grid, Column, ModalWrapper } from '@carbon/react';
import { ManagementTile, StatisticBox } from 'components';

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
                <StatisticBox
                    title='Assigned groups'
                    label='Are active groups forming?'
                    value={12}
                    changeInValue={0.3}
                    valueIcon={<Collaborate size={24} />}
                    variant='green'
                />
                <StatisticBox
                    title='PDJ contributions'
                    label='Are projects progressing?'
                    value={15}
                    changeInValue={-0.07}
                    valueIcon={<Roadmap size={24} />}
                    variant='blue'
                />
                <StatisticBox
                    title='ILC journal activity'
                    label='Are students reflecting?'
                    value={15}
                    valueIcon={<IbmWatsonTextToSpeech size={24} />}
                    changeInValue={0.86}
                />
            </Column>
            <Column lg={16} md={8} sm={4} className='admin-page__r3'>
                <ManagementTile
                    title='Groups'
                    description='Archive, and lock groups in bulk'
                    icon={<Collaborate size={48} />}
                >
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
                <ManagementTile
                    title='Projects'
                    description='Archive, and lock projects in bulk'
                    icon={<Roadmap size={48} />}
                >
                    <ModalWrapper
                        buttonTriggerText='Bulk project management'
                        modalHeading='Bulk project management'
                    >
                        {/* <PendingApplications groupApplications={groupApplication} /> */}
                    </ModalWrapper>
                </ManagementTile>
                <ManagementTile
                    title='Assignment'
                    description='Manage groups project assignement'
                    icon={<Task size={48} />}
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
