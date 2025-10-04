'use client';

import { CreateBikeDonation } from "@/actions/bike-donation"

export default function Page() {
    const { error, isLoading } = CreateBikeDonation({
        description: 'big bike',
        bike_image: 'https://media.wired.com/photos/687b17f31d005c057f7adcb0/191:100/w_1280,c_limit/How%20to%20Buy%20an%20Electric%20Bike.png',
        dropoff_location: 'Silo'
    })
    return (
        <div>
            Hi
        </div>
    )
}