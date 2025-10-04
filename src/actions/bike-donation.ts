'use client'

import { useEffect, useState } from "react";

interface CreateBikeDonationRequest {
    description: string,
    bike_image: string,
    dropoff_location: string
}

export function CreateBikeDonation(data: CreateBikeDonationRequest) {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    console.log(data)

    useEffect(() => {
        fetch('/api/v1/bike-donation/start-bike-donation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIsLoading(false);
                return data;
            })
            .catch(error => {
                console.log(error);
                setError(true);
                setIsLoading(false);
                return error;
            });
    }, [])

    return { error, isLoading };
}