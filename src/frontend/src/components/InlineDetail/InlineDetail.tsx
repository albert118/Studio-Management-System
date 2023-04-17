export type Props = {
    label: string;
    detail: string;
};

export default function InlineDetail({ label, detail }: Props) {
    return (
        <div className='inline-detail'>
            <label>{label}</label>
            <p>{detail}</p>
        </div>
    );
}
