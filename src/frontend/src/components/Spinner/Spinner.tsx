import { ThreeCircles } from  'react-loader-spinner'

export default function LoadingSpinner() {
    return (
        <div className={`loading-spinner center`}>
            <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
            />
        </div>
    );
}