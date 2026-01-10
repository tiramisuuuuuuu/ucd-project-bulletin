import { Button, Flex, Result, Spin } from "antd";
import { useRouter } from "next/navigation";


interface Step3Props {
    loading: boolean,
    error: boolean,
}

export default function Step3({ loading, error } : Step3Props) {
    const router = useRouter();

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