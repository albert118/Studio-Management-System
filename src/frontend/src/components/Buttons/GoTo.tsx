// @ts-ignore
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

export interface IComponentProps {
    url: string;
    text?: string;
    size?: string;
}

export default function GoToButton({ url, text = 'Go to', size = 'lg' }: IComponentProps) {
    const navigate = useNavigate();

    return (
        // @ts-ignore
        <Button size={size} onClick={() => navigate(url)} renderIcon={ArrowRight}>
            {text}
        </Button>
    );
}
