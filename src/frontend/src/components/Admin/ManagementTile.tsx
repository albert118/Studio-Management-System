
export type Props = {
    title: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export default function ManagementTile({ title, description, icon, children }: Props) {
    return (
        <div className='management-tile'>
            <div className='heading'>
                <div className='icon-header'>
                    <h3>{title}</h3>
                    {icon}
                </div>
                <p>{description}</p>
                <div className='divider' />
            </div>
            <div className='actions'>{children}</div>
        </div>
    );
}
