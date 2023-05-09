import { IGroup } from "types/types";

export type Props = {
    group: IGroup
};

export default function GroupView({ group }: Props) {
    return <div className="group-page">
        hello!
        {JSON.stringify(group)}
    </div>
}