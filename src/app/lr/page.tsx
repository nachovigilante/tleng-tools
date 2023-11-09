import { Afd } from "~/components/Afd";
import { LR } from "~/components/LR";
import { Parse } from "~/components/Parse";

const LRPage = () => {
    return (
        <main className="flex flex-col gap-10 p-10">
            <h1 className="text-4xl">LR</h1>
            <div className="flex flex-wrap gap-10">
                <Afd />
                <LR />
                <Parse />
            </div>
        </main>
    );
};

export default LRPage;
