import { useState, useEffect } from 'react';
import ApiConfig from 'config/ApiConfig';
import defaultRequestOptions from './defaultRequestHeaders';
import { NewProjectDto, Nullable } from 'types/types';
import { KestrelServerError, ApiError } from './types';
import { Guid } from 'guid-typescript';
import { supabase } from 'main';
import { Session } from '@supabase/supabase-js';

export default function useAuth() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>();
    const [errors, _] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        setLoading(true);
        const fetchSession = async () => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
            });
            setLoading(false);
        };
        fetchSession();
    }, []);

    return { session, isLoading, errors };
}
