import { Size } from 'types/enums';

export type Props = {
    title: string;
    label: string;
    children?: React.ReactNode;
    size?: Size;
};

export default function SimpleCard({ title, label, size = Size.md, children }: Props) {
    return (
        <div className={`simple-card simple-card--${size.toString()}`}>
            <div>
                <h5>{title}</h5>
                {label}
            </div>
            {children}
        </div>
    );
}
