import { serverProfileService } from '@/lib/services/server/profile';
import ProfileClient from './components/ProfileClient';

async function getData() {
    try {
        const res = await serverProfileService.getMe();
        
        return { data: res.data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
}

export default async function ProfilePage() {
    const { data, error } = await getData();

    return <ProfileClient initialData={data} error={error} />;
}