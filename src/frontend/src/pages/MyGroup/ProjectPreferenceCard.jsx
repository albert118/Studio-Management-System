import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

export function ProjectPreferenceCard({ title, rank }) {
    return (
        <div className='simple-card project'>
            <div>
                <h4>Preference: #{rank}</h4>
                {title}
            </div>
            <Button renderIcon={ArrowRight}>Go to</Button>
        </div>
    );
}
