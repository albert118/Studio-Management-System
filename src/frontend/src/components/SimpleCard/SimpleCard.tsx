export type Props = {
    title: string;
    label: string;
    children?: React.ReactNode;
};

export default function SimpleCard(props: Props) {
    return (
        <div className='simple-card'>
            <div>
                <h5>{props.title}</h5>
                {props.label}
            </div>
            {props.children}
        </div>
    );
}
