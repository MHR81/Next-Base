import RegisterForm from "./_components/RegisterForm";

export const metadata = {
    title: 'Register',
    description: 'Create a new account to access Taghche services.',
    openGraph: {
        title: 'Register',
        description: 'Create a new account to access Taghche services.',
        type: 'website'
    },
};


export default async function RegisterPage() {


    return (
        <>
            <RegisterForm />
        </>
    );
}