export interface KestrelServerError {
    errors: any[];
    status: number;
    title: string;
    traceId: string;
    type: string;
}

export interface ApiError {
    error: string;
    message: string[];
}
