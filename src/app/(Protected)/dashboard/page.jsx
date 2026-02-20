import { serverProfileService } from '@/lib/services/server/profile';
import DashboardClient from './components/DashboardClient';

// async function getData() {
//     try {
//         const res = await serverProfileService.getMe();
//         return { data: res?.data?.data?.user, error: null };
//     } catch (error) {
//         console.error(error)
//         return { data: null, error: error.message };
        
//     }
// }

export default async function DashboardPage() {
    // const { data, error } = await getData();

    return <DashboardClient initialData={null} error={null} />;
}