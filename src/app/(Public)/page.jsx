import Popular_Books from "./_components/sections/Popular_Books";
import Category from "./_components/sections/Category";
import AwardSection from "./_components/sections/Award";
import Popular_Audio from "./_components/sections/Popular_Audio";
import Popular_Authors from "./_components/sections/Popular_Authors";


export default function landingPage() {

    return (
        <div className="flex flex-col gap-20 pb-20 w-full">
            <Popular_Books />
            <Category />
            <AwardSection />
            <Popular_Audio />
            <Popular_Authors />
            
        </div>
    );
}
