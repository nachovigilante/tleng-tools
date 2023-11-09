export const ErrorMsg = ({
    title, subtitle,
}: {
    title: string;
    subtitle?: string;
}) => {
    return (
        <div className="w-full flex justify-center">
            <div className=" border rounded-xl flex flex-col p-10 gap-5">
                <div className="text-2xl">{title}</div>
                <div className="text-lg">
                    {subtitle ||
                        'Asegurate de que la gramática esté bien escrita'}
                </div>
            </div>
        </div>
    );
};
