export type Props = {
    label: string;
    detail: string;
    children: React.ReactNode;
};

export default function BlockDetail({ label, detail, children }: Props) {
    return (
        <div className='block-detail'>
            <label>{label}</label>
            <p>{detail}</p>
            {children}
        </div>
    );
}
