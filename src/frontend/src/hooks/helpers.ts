import { KestrelServerError } from './types';

export const handleErrors = async (response: Response, setErrors: Function): Promise<void> => {
    const errorData = (await response.json()) as KestrelServerError;
    const apiError = { error: errorData.title, message: errorData.errors };
    console.error(JSON.stringify(apiError));
    setErrors(apiError);
};
