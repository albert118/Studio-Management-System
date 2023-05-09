import { KestrelServerError } from './types';

export const handleErrors = async (response: Response, setErrors: Function): Promise<void> => {
    if (response.status === 405) {
        console.error('a hook attempted to use an unallowed method');
        setErrors('An error occured while communicating with the API');
    } else {
        const errorData = (await response.json()) as KestrelServerError;
        const apiError = { error: errorData.title, message: errorData.errors };
        console.error(JSON.stringify(apiError));
        setErrors(apiError);
    }
};
