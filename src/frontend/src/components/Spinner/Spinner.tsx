import { ThreeCircles } from  'react-loader-spinner'

export default function LoadingSpinner() {
    return (
        <div className={`loading-spinner`} >
            <ThreeCircles
            height="150"
            width="150"
            color=""
            wrapperStyle={{
                "margin": "auto",
                "padding":"15%"
            }}
            wrapperClass="loading-spinner circles"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#bdbdbd"
            innerCircleColor="#0f62fe"
            middleCircleColor="#bdbdbd"
            />
        </div>
    );
}