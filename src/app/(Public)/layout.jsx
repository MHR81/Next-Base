import HeaderWrapper from '@/_components/layout/HeaderWrapper';
import Footer from '@/_components/layout/Footer';

export const metadata = {
    title: {
        template: '%s | Next Base',
        default: 'Home',
    },
    description: 'Next Base — public pages and content listing.',
    openGraph: {
        title: 'Home',
        description: 'Next Base — public pages and content listing.',
        type: 'website'
    },
    robots: {
        index: true,
        follow: true
    }
};



export default async function PublicLayout({ children }) {

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <HeaderWrapper />

            <main className="flex-1 px-4 md:px-10 lg:px-5 xl:px-0 max-w-6xl w-full mt-16">
                {children}
            </main>

            <Footer />
        </div>
    );
}