import { BrandConfig } from 'config';
import { Grid, Column } from '@carbon/react';
import { Button } from 'carbon-components-react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '~/navigation/AppRoutes';
import logo from 'assets/logo.jpg';

function Dashboard() {
    const navigate = useNavigate();

    return (
        <Grid fullWidth>
            <Column lg={16} md={8} sm={4} className='dashboard-page__banner'>
                <h1 className='dashboard-page__heading'>{BrandConfig.BrandName}</h1>
                <p className='dashboard-page__p'>Existing user? Sign in here</p>
                <Button
                    className='dashboard-page__login'
                    onClick={() => navigate(`${AppRoutes.login}`)}
                >
                    Login
                </Button>
            </Column>

            <Column lg={16} md={8} sm={4}>
                <Grid>
                    <Column md={4} lg={7} sm={4} className='dashboard-page__description'>
                        <h2 className='dashboard-page__subheading '>
                            What is the {BrandConfig.BrandName}?
                        </h2>
                        <p className='dashboard-page__p'>
                            The {BrandConfig.BrandName} is a tool for student's and teachers that's
                            designed to streamline your experience and workflow throughout the
                            semester and to the next.
                        </p>
                        <Button onClick={() => navigate(`${AppRoutes.about}`)}>Read more</Button>
                    </Column>
                    <Column md={7} lg={{ span: 8, offset: 7 }} sm={4}>
                        <img className='dashboard-page__logo' src={logo} alt='studio word art' />
                    </Column>
                </Grid>
            </Column>
        </Grid>
    );
}

export default Dashboard;
