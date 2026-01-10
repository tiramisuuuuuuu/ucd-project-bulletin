'use client';

import CreatePostSteps from "@/components/create-post/CreatePostSteps";
import { PostDetail, zPostDetail } from "@/types/Posts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page() {
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<PostDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`/api/v1/posts/get-post/${id}`);
            const validatedData = zPostDetail.safeParse(await res.json());
            if (!validatedData.success) {
                console.log(validatedData.error)
                setLoading(false);
                return;
            }
        
            setPost(validatedData.data);
            setLoading(false);
        }
        
        fetchPost()
    }, []);

    return (
        <div>
            <CreatePostSteps prevPost={post} />
        </div>
    )
}