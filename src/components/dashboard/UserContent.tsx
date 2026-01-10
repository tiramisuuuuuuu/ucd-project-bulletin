'use client';

import { Post, zPostArray } from "@/types/Posts";
import { DeleteTwoTone, EditTwoTone, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Empty, Flex, Spin, Tag, Typography } from "antd";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function UserContent() {
    const [feed, setFeed] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchFeed() {
            const res = await fetch('/api/v1/users/get-posts');
            const validatedData = zPostArray.safeParse(await res.json());
            if (!validatedData.success) {
                console.log(validatedData.error)
                setLoading(false);
                return;
            }
    
            setFeed(validatedData.data);
            setLoading(false);
        }
    
       fetchFeed()
    }, []);

    return (
        <div className="w-full">
            <Flex vertical className="w-full" gap="small">
                {loading && <Spin size="large" />}
                {!loading && (
                    feed.length > 0 ?
                        feed.map((post, idx) => 
                            <div key={idx} className="flex flex-row gap-5">
                                <Card style={{ width: '70%' }} onClick={() => router.push('/post/'+post.id)}>
                                    <Flex justify="space-between">
                                        <Flex vertical>
                                            <Typography.Title level={4}>{post.title}</Typography.Title>
                                            <Typography.Text>{post.subtitle}</Typography.Text>
                                            <Flex gap="small">
                                                <Typography.Text type="secondary">Looking for:</Typography.Text>
                                                {post.tags.map((tag, idx) =>
                                                    <div key={idx}>
                                                        <Tag color="magenta">
                                                            {tag}
                                                        </Tag>
                                                    </div>
                                                )}
                                                <Typography.Text type="secondary">{post.clicks}</Typography.Text>
                                                <Typography.Text type="secondary">{format(post.updated_at ?? post.created_at, "MMMM d")}</Typography.Text>
                                            </Flex>
                                        </Flex>
                                        <Flex vertical>
                                            {post.profile_image ?
                                                <Avatar src={post.profile_image} /> 
                                                : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            }
                                            {post.name ?
                                                <Typography.Text>{post.name}</Typography.Text>
                                                : <Typography.Text>Anonymous</Typography.Text>
                                            }
                                            {post.tagline ?
                                                <Typography.Text type="secondary">{post.tagline}</Typography.Text>
                                                : <Typography.Text type="secondary">Groovy User</Typography.Text>
                                            }
                                        </Flex>
                                    </Flex>
                                </Card>
                                <EditTwoTone twoToneColor="blue" onClick={() => router.push('/update-post/'+post.id)} className="text-xl" />
                                <DeleteTwoTone twoToneColor="red" className="text-xl" />
                            </div>
                        )
                        :
                        <Empty />
                )}
            </Flex>
        </div>
    )
}