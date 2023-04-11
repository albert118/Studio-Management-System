import AppHeader from 'components/AppHeader/AppHeader';
import AppFooter from 'components/AppFooter/AppFooter';
import { Content } from '@carbon/react';

function Layouts(props) {
    return (
        <div>
            <AppHeader />
            <Content>{props.children}</Content>
            <AppFooter />
        </div>
    );
}

export default Layouts;
