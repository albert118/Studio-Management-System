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
                <h1>
                    <div>Manage Studio Groups</div>
                    <div>and projects</div>
                    <div>
                        all in one place <Roadmap size={48} />
                    </div>
                </h1>
                <p className='dashboard-page__pitch-detail'>
                    Designed for students and teachers, the {BrandConfig.BrandName} is a tool to
                    streamline your studio workflow experience throughout the semester and to the
                    next.
                </p>

                <Button onClick={() => navigate(`${AppRoutes.about}`)}>Get started</Button>
            </Column>
            <Column lg={{ span: 10 }} md={8} sm={4} className='dashboard-page__hero'>
                <h1 className='dashboard-page__heading'>{BrandConfig.BrandName}</h1>
            </Column>
            <Column className='dashboard-page__existinguser'>
                <p className='dashboard-page__existinguser-prompt'>Existing user? Sign in here</p>
                <Button onClick={() => navigate(`${AppRoutes.login}`)}>Login</Button>
            </Column>
        </Grid>
    );
}
