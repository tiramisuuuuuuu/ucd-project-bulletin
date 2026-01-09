import { zUserPost } from "@/types/Posts";
import { Button, Flex, FormInstance, Result, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface Step3Props {
    form: FormInstance
}

export default function Step3({ form } : Step3Props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function submitForm() {
            const post = {
                title: form.getFieldValue('title'),
                subtitle: form.getFieldValue('subtitle') ?? '',
                description: form.getFieldValue('description') ?? '',
                tags: form.getFieldValue('tags') ?? [],
                images: form.getFieldValue('images') ?? [],
                contact_info: form.getFieldValue('contact_info') ?? '',
            };

            const res = await fetch('/api/v1/posts/create-post', {
                method: 'POST',
                body: JSON.stringify(post),
            });

            const validatedData = zUserPost.safeParse(await res.json());
            if (!validatedData.success) {
                console.log(validatedData.error)
                setError(true);
            }

            setLoading(false);
        }

        submitForm();
    }, []);

    return (
        <div className="bg-white text-left px-7 py-10 flex flex-col gap-y-10">
            {loading ?
                <Flex vertical>
                    <Spin size="large" />
                    <p>Submitting</p>
                </Flex>
                : <Result
                    status={error ? "error" : "success"}
                    title={error ? "Could not create post" : "Successfully created post!"}
                    extra={
                        <Button type="primary" key="console" onClick={() => router.replace('/dashboard')}>
                            Return to home
                        </Button>
                    }
                />
            }
        </div>
    )
}