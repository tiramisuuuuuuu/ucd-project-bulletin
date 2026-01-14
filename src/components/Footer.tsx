import { TitleFont } from "@/lib/fonts";

export default function Footer() {
    return (
        <div className="w-full h-10 bg-green-50 flex justify-center items-center opacity-80 border-t-2 border-t-gray-50">
            <p className={` ${TitleFont.className}`}>
                Thank you for visiting UCD Project Bulletin🧋
            </p>
        </div>
    );
}
