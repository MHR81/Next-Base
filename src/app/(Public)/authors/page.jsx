import Author from "./_components/Awards";
import { serverAuthorsService } from "@/lib/services/server/authors";

let authorData = null;
try {
    const res = await serverAuthorsService.getAuthors();
    console.log("authors res in page", res);
    authorData = res?.data;
} catch (error) {
    console.error("Error fetching authors in page:", error);
}

export default function AuthorPage() {
    return <Author data={authorData} />;
}