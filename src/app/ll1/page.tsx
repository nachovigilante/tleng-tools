import { LL1 } from '~/components/LL1';
import { SD } from '~/components/SD';

const LL1Page = () => {
    return (
        <main className="flex flex-col gap-10 p-10">
            <h1 className="text-4xl">LL1</h1>
            <div className="flex flex-wrap gap-10">
                <SD />
                <LL1 />
            </div>
        </main>
    );
};

export default LL1Page;
