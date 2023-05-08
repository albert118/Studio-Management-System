
export type Props = {
    title: string;
    description: string;
    icon: React.ReactNode;
    className: string;
    children: React.ReactNode;
}

export default function ManagementTile({ title, description, icon, className, children }: Props) {
    const classes = className ? `management-tile ${className}` : 'management-tile'

    return (
        <div className={classes}>
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
