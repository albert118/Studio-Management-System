import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';

export function ProjectPreferenceCard({ title, rank, projectId }) {
    const navigate = useNavigate();

    return (
        <div className='simple-card project'>
            <div>
                <h5>Preference: #{rank}</h5>
                {title}
            </div>
            <Button
                onClick={() => navigate(`${AppRoutes.project}/${projectId}`)}
                renderIcon={ArrowRight}
            >
                Go to
            </Button>
        </div>
    );
}

export function NoProjectPreferenceCard() {
    return (
        <div className='simple-card project'>
            <div>
                <h5>No project preferences selected!</h5>
                Please select some preferences by editing your group and then updating your
                preferences.
            </div>
            {/* <Button
                onClick={() => navigate(`${AppRoutes.project}/${projectId}`)}
                renderIcon={ArrowRight}
            >
                Go to
            </Button> */}
        </div>
    );
}
