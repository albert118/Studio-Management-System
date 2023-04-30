// @ts-ignore
import { Tile } from '@carbon/react';
import { Growth } from '@carbon/icons-react';

export enum BoxVariants {
    green = 'green',
    blue = 'blue',
    default = ''
};

export type Props = {
    title: string;
    label: string;
    value: number;
    changeInValue: number;
    valueIcon: React.ReactNode;
    variant?: BoxVariants;
};

export default function StatisticBox({ title, label, value, changeInValue, valueIcon, variant }: Props) {
    const classes = variant ? `statistic-box ${variant}` : 'statistic-box';
    const changeInAsPercentage = Math.round(changeInValue * 100)
    const changeInSign = changeInValue <= 0 ? '' : '+';

    return (
        <Tile className={classes}>
            <div className="change-in">
                <Growth />
                {`${changeInSign}${changeInAsPercentage}%`}
            </div>
            <div className="statistic-value">
                <span>
                    {valueIcon}
                    {value}
                </span>
                <label>{title}</label>
            </div>
            <label>{label}</label>
        </Tile>
    );
}
