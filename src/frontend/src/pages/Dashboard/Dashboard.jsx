import { Roadmap } from '@carbon/icons-react';
import { BrandConfig } from 'config';
import { Button, Grid, Column } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <Grid className='dashboard-page'>
            <Column lg={6} md={6} sm={4} className='dashboard-page__pitch'>
                <h2>
                    <div>Manage Studio Groups</div>
                    <div>and projects</div>
                    <div>
                        all in one place <Roadmap size={48} />
                    </div>
                </h2>
                <p className='dashboard-page__pitch-detail'>
                    Designed for students and teachers, the {BrandConfig.BrandName} is a tool to
                    streamline your studio workflow experience throughout the semester and to the
                    next.
                </p>

                <Button onClick={() => navigate(`${AppRoutes.about}`)}>Get started</Button>
            </Column>
            <Column lg={{ span: 8, offset: 8 }} md={6} sm={4} className='dashboard-page__hero'>
                <div className='dashboard-page__hero-boxes'>
                    <div className='box1' />
                    <div className='box2' />
                    <div className='box3' />
                </div>

                <h1>
                    <div>Studio Management</div>
                    <div>
                        <div>System</div>
                        <div className='divider' />
                    </div>
                </h1>
            </Column>
            <Column className='dashboard-page__existinguser'>
                <p className='dashboard-page__existinguser-prompt'>Existing user? Sign in here</p>
                <Button onClick={() => navigate(`${AppRoutes.login}`)}>Login</Button>
            </Column>
        </Grid>
    );
}
