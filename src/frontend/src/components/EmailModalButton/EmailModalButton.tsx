// @ts-ignore
import { ModalWrapper } from '@carbon/react';
import { EmailNew } from '@carbon/icons-react';

export type Props = {
    title: string;
    description: string;
    buttonText: string;
    modalHeading: string;
    handleSubmit: Function;
    children: React.ReactNode;
};

export default function EmailModalButton({
    title,
    description,
    buttonText,
    modalHeading,
    handleSubmit,
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
                handleSubmit={async () => await handleSubmit()}
            >
                {children}
            </ModalWrapper>
        </div>
    );
}
