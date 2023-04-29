import { Tile, Grid, Column, ModalWrapper, Button } from '@carbon/react';
import { Stack } from 'components';

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
                <Tile className='stat-box'>#1</Tile>
                <Tile className='stat-box'>#2</Tile>
                <Tile className='stat-box'>#3</Tile>
            </Column>
            <Column lg={16} md={8} sm={4} className='admin-page__r3'>
                <ManagementTile title='Groups' description='Archive, and lock groups in bulk'>
                    <Button>#1</Button>
                    <Button>#2</Button>
                    <Button>#3</Button>
                </ManagementTile>
            </Column>
        </Grid>
    );
}

function ManagementTile({ title, description, children }) {
    return (
        <div className='management-tile'>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className='actions'>{children}</div>
        </div>
    );
}
