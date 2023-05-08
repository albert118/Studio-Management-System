// @ts-ignore
import { ModalWrapper } from '@carbon/react';

export type Props = {
    title: string;
    description: string;
    icon: React.ReactNode;
    passiveModal: boolean;
    buttonText: string;
    modalHeading: string;
    handleSubmit: Function;
    children: React.ReactNode;
};

export default function LongFormatButton({
    title,
    description,
    icon,
    passiveModal,
    buttonText,
    modalHeading,
    handleSubmit,
    children
}: Props) {
    return (
        <div className='long-format-call-to-action'>
            {icon}
            <div>
                <h5>{title}</h5>
                {description}
            </div>
            <ModalWrapper
                buttonTriggerText={buttonText}
                modalHeading={modalHeading}
                primaryButtonText='Send'
                handleSubmit={async () => await handleSubmit()}
                passiveModal={passiveModal}
            >
                {children}
            </ModalWrapper>
        </div>
    );
}
