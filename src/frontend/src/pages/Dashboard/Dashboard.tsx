import { BrandConfig } from 'config';
import { Grid, Column } from '@carbon/react';
import { Button } from 'carbon-components-react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '~/navigation/AppRoutes';

function Dashboard() {
    return (
        <Grid className='p-dashboard' fullwidth>
            <WelcomeHeader />
        </Grid>
    );
}

function WelcomeHeader() {
    return (
        <Column lg={16} md={8} sm={4} className='branding-welcome-banner'>
            <h1>{BrandConfig.BrandName}</h1>
            <HeroContent />
        </Column>
    );
}

function HeroContent() {
    const navigate = useNavigate();

    return (
        <Grid className='hero-content'>
            <Column md={4} lg={7} sm={4} className='message'>
                <h2>What is {BrandConfig.BrandName}?</h2>
                <p>
                    The {BrandConfig.BrandName} is a tool for student's and teachers that's designed
                    to streamline your experience and workflow throughout the semester and to the
                    next.
                </p>
                <Button onClick={() => navigate(`${AppRoutes.about}`)}>Read more</Button>
            </Column>
        </Grid>
    );
}

export default Dashboard;
