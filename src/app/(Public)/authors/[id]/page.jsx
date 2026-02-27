import AuthorDetails from "./_components/AuthorDetails";
import { serverAuthorsService } from "@/lib/services/server/authors";
import { notFound } from 'next/navigation';

export default async function AuthorDetailsPage({ params }) {
        const id = params?.id;
        try {
            const res = await serverAuthorsService.getAuthorById(id);
            console.log("Author details response:", res);
            const author = res?.data ?? res;
            if (!author || (res && res.success === false)) return notFound();
            return <AuthorDetails data={author} />;
        } catch (err) {
            if (String(err.message).includes('404')) return notFound();
            console.error("Error fetching author details:", err);
            throw err;
        }
}