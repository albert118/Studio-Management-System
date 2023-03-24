import { BrandConfig } from 'config';
import { Grid, Column } from '@carbon/react';
import { Button } from 'carbon-components-react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '~/navigation/AppRoutes';

function Dashboard() {
    return (
        <Grid>
            <Column lg={16} md={8} sm={4}>
                <h1>{BrandConfig.BrandName}</h1>
            </Column>
            <Column lg={8} md={6} sm={4}>
                <ProductDescription />
            </Column>
        </Grid>
    );
}

function ProductDescription() {
    const navigate = useNavigate();

    return (
        <div className='product-description'>
            <h2>What is the {BrandConfig.BrandName}?</h2>
            <p>
                The {BrandConfig.BrandName} is a tool for student's and teachers that's designed to
                streamline your experience and workflow throughout the semester and to the next.
            </p>
            <Button onClick={() => navigate(`${AppRoutes.about}`)}>Read more</Button>
        </div>
    );
}

export default Dashboard;
