// @ts-ignore
import { ModalWrapper } from '@carbon/react';
import { EmailNew } from '@carbon/icons-react';

export type Props = {
    title: string;
    description: string;
    buttonText: string;
    modalHeading: string;
    children: React.ReactNode;
};

export default function EmailModalButton({
    title,
    description,
    buttonText,
    modalHeading,
    children
}: Props) {
    return (
        <div className='email-call-to-action'>
            <EmailNew size={32} />
            <div>
                <h5>{title}</h5>
                {description}
            </div>
            <ModalWrapper
                buttonTriggerText={buttonText}
                modalHeading={modalHeading}
                primaryButtonText='Send'
            >
                {children}
            </ModalWrapper>
        </div>
    );
}
