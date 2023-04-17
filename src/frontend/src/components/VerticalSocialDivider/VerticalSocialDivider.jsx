import { LogoGithub, LogoFigma, LogoJupyter } from '@carbon/icons-react';
import { IconButton } from '@carbon/react';
import { VerticalDivider } from 'components';

export default function VerticalSocialDivider({ onClickGitHub, onClickFigma, onClickJupyter }) {
    return (
        <div className='vertical-social-divider'>
            <VerticalDivider />
            <IconButton className='social-btn' onClick={onClickGitHub} label='GitHub'>
                <LogoGithub size={24} />
            </IconButton>
            <IconButton className='social-btn' onClick={onClickFigma} label='Figma'>
                <LogoFigma size={24} />
            </IconButton>
            <IconButton className='social-btn' onClick={onClickJupyter} label='Jupyter Notebook'>
                <LogoJupyter size={24} />
            </IconButton>
        </div>
    );
}
