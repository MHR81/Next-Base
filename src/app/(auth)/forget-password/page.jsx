
import ForgetPassword from "./_components/ForgetPass";

export const metadata = {
    title: 'Forgot Password',
    description: 'Reset your account password.',
    openGraph: {
        title: 'Forgot Password',
        description: 'Reset your account password.',
        type: 'website'
    },
};
export default async function ForgetPasswordPage() {

    return (
        <>
            <ForgetPassword />
        </>
    );
}