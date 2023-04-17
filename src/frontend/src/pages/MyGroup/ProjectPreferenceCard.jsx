import AppRoutes from 'navigation/AppRoutes';
import GoToButton from 'components/Buttons/GoTo';

export function ProjectPreferenceCard({ title, rank, projectId }) {
    return (
        <div className='simple-card project'>
            <div>
                <h5>Preference: #{rank}</h5>
                {title}
            </div>
            <GoToButton url={`${AppRoutes.project}/${projectId}`} />
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
        </div>
    );
}
