import AppHeader from 'components/AppHeader/AppHeader';
import { Content } from 'carbon-components-react';

function Layouts(props: any) {
	return (
		<div>
			<AppHeader />
			<Content>{props.Children}</Content>
		</div>
	);
}

export default Layouts;
