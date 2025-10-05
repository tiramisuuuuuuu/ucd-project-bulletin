import StandardText from "../ui/StandardText";

export default function Step1() {
    return (
        <div className="w-full text-left px-7 py-10 bg-white">
            <StandardText level={3}>Instructions</StandardText>
            <div className="mt-10 flex flex-col gap-5 text-black">
                <p>1. Upload a photo of the bike, add a description of the model, and select a dropoff location to lock bike at</p>
                <p>2. Submit bike and bike lock to AggieWheelShare system only AT or AFTER dropoff time!</p>
            </div>
        </div>
    )
}