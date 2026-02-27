import Author from "./_components/Awards";
import { serverAuthorsService } from "@/lib/services/server/authors";
import { notFound } from 'next/navigation';

export default async function AuthorPage() {
    try {
        const res = await serverAuthorsService.getAuthors();
        console.log("Authors response:", res);
        const authors = res?.data ?? res;
        if (!authors || (res && res.success === false)) return notFound();
        return <Author data={authors} />;
    } catch (err) {
        if (String(err.message).includes('404')) return notFound();
        console.error("Error fetching authors:", err);
        throw err;
    }
}