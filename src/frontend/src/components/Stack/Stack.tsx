export type Props = {
    children: React.ReactNode;
};

// this is, again, a workaround as the CBS Stack component seems to be unavailable in this verison
// this is basically a wrapper ONLY intended for simple use on single-column form
// it could be refactored and made pretty, but fixing CBS would be better
export default function Stack(props: Props) {
    return <div className='stack'>{props.children}</div>;
}
