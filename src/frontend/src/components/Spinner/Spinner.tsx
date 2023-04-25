import { ThreeCircles } from  'react-loader-spinner'

export default function LoadingSpinner() {
    return (
        <div className={`loading-spinner`} >
            <ThreeCircles
            height="150"
            width="150"
            wrapperStyle={{
                "margin": "auto",
                "padding":"10%",
            }}
            wrapperClass="loading-spinner circles"
            ariaLabel="three-circles-rotating"
            outerCircleColor="#bdbdbd"
            innerCircleColor="#0f62fe"
            middleCircleColor="#bdbdbd"
            />
        </div>
    );
}