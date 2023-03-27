import { Grid } from '@carbon/react';

export default function FormContainer(props: any) {
    return <Grid className='form-container'>{props.children}</Grid>;
}
