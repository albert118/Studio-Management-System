// @ts-ignore
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

export interface IComponentProps {
    url: string;
}

export default function GoToButton({ url }: IComponentProps) {
    const navigate = useNavigate();

    return (
        // @ts-ignore
        <Button onClick={() => navigate(url)} renderIcon={ArrowRight}>
            Go to
        </Button>
    );
}
