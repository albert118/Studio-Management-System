import { useState, useEffect } from 'react';
import { Nullable } from 'types/types';
import {ApiError } from './types';
import { supabase } from 'main';
import { Session } from '@supabase/supabase-js';

export default function useAuth() {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>();
    const [errors, _] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        setLoading(true);
        const fetchSession = async () => {
            const response = await supabase.auth.getSession();
            setLoading(false);
        };
        fetchSession();
    }, []);

    const logout = async (session: Session) => {
        supabase.auth.signOut();
        setLoading(true);
        setSession(null);
    }

    return { session, logout, isLoading, errors };
}
