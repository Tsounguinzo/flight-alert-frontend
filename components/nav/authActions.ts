'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/");
}