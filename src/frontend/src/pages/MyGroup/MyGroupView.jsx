import { Button, Tile, Grid, Column } from '@carbon/react';
import { Stack } from 'components/Forms';
import { ArrowRight, MailAll, EmailNew, Collaborate, Edit, Exit } from '@carbon/icons-react';

export default function MyGroupView({ myGroup }) {
    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r1'>
                <h1 className='mygroup-page__heading'>{myGroup.name}</h1>
                <p className='mygroup-page__p'>{myGroup.description}</p>
            </Column>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r2'>
                <Tile className='mygroup-page__application-management'>
                    <h3>Manage your group</h3>
                    <Stack>
                        <div className='simple-card'>
                            <Button renderIcon={Collaborate}>Group members</Button>
                        </div>
                        <div className='simple-card'>
                            <Button renderIcon={EmailNew}>Pending applications</Button>
                        </div>
                        <div className='simple-card'>
                            <Button renderIcon={MailAll}>Create invitations</Button>
                        </div>
                    </Stack>
                </Tile>
                <Tile className='mygroup-page__project-preference-management'>
                    <h3>Project Preferences</h3>
                    <Stack>
                        <ProjectCard project={{ name: 'Apple Computers', preference: 1 }} />
                        <ProjectCard project={{ name: 'Microsoft Corp.', preference: 2 }} />
                        <ProjectCard project={{ name: 'IBM', preference: 3 }} />
                    </Stack>
                </Tile>
            </Column>
            <Column lg={16} md={8} sm={4} className='mygroup-page__r3'>
                <Tile className='mygroup-page__dangerous-management-options'>
                    <h3>Danger Zone</h3>
                    <Stack>
                        <div className='simple-card'>
                            <Button kind='ghost' renderIcon={Edit}>
                                Edit group
                            </Button>
                        </div>
                        <div className='simple-card'>
                            <Button kind='ghost' renderIcon={Exit}>
                                Leave group
                            </Button>
                        </div>
                    </Stack>
                </Tile>
            </Column>
        </Grid>
    );
}

function ProjectCard({ project }) {
    return (
        <div className='simple-card project'>
            <div>
                <h4>Preference: #{project.preference}</h4>
                {project.name}
            </div>
            <Button renderIcon={ArrowRight}>Go to</Button>
        </div>
    );
}
