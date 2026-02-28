import TitleDecorLeft from "@/components/svg/TitleDecorLeft";
import TitleDecorRight from "@/components/svg/TitleDecorRight";

type PageTitleProps = {
    title: string;
    favorText?: string;
    light?: boolean;
};

export default function PageTitle(props: PageTitleProps) {
    return (
        <div className="m-4">
            <div className="flex items-center justify-center">
                <div className="hidden pr-4 lg:block dark:invert">
                    <TitleDecorLeft height={24} width={115} />
                </div>
                <div className="text-center text-4xl font-extrabold md:text-5xl">
                    {props.title.toUpperCase()}
                </div>
                <div className="hidden pl-4 lg:block dark:invert">
                    <TitleDecorRight height={24} width={115} />
                </div>
            </div>
            {props.favorText && (
                <p className="my-2 text-center text-xl">{props.favorText}</p>
            )}
        </div>
    );
}
