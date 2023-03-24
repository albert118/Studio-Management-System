import AppHeader from 'components/AppHeader/AppHeader';
import AppFooter from 'components/AppFooter/AppFooter';
import { Content } from 'carbon-components-react';

interface Props {
	children: React.ReactNode;
}

function Layouts(props: Props) {
	return (
		<div>
			<AppHeader />
			<Content>{props.children}</Content>
			<AppFooter />
		</div>
	);
}

export default Layouts;
