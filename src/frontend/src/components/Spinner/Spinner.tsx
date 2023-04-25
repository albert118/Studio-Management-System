import { ThreeCircles } from 'react-loader-spinner'

export default function LoadingSpinner() {
    return (
        <div style={{ "display": "flex" }} >
            <ThreeCircles
                height="150"
                width="150"
                wrapperStyle={{
                    "margin": "auto",
                    "padding": "10%",
                }}
                outerCircleColor="#bdbdbd"
                innerCircleColor="#0f62fe"
                middleCircleColor="#bdbdbd"
            />
        </div>
    );
}