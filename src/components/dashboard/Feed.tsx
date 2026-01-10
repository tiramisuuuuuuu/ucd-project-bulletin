'use client';

import { Post, zPostArray } from "@/types/Posts";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider, Empty, Flex, Spin, Tag, Typography } from "antd";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckboxList from "../ui/CheckboxList";



export default function Feed() {
    const [allData, setAllData] = useState<Post[]>([]);
    const [feed, setFeed] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [checkedList, setCheckedList] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchFeed() {
            const res = await fetch('/api/v1/posts/get-feed');
            const validatedData = zPostArray.safeParse(await res.json());
            if (!validatedData.success) {
                console.log(validatedData.error)
                setLoading(false);
                return;
            }
    
            setAllData(validatedData.data);
            setLoading(false);

            const tags = new Set<string>();
            validatedData.data.forEach(post => {
                post.tags.forEach(tag => tags.add(tag));
            })
            setAllTags([...tags]);
            setCheckedList([...tags]);
        }
    
       fetchFeed()
    }, []);

    useEffect(() => {
        if (checkedList.length == allTags.length) {
            setFeed(allData);
            return;
        }
        setFeed(allData.filter(post => {
            for (const tag of post.tags) {
                if (checkedList.includes(tag)) {
                    return true;
                }
            }
            return false;
        }));
    }, [allData, checkedList]);

    return (
        <div className="relative w-full flex flex-row">
            {loading && <Spin size="large" />}

            {!loading && 
                <div>
                    <Card style={{ width: 300, position: 'sticky', top: 0 }}>
                        <Tag color="cyan">Sorted by date</Tag>
                        <Divider />
                        <Typography.Title level={5}>Filter</Typography.Title>
                        <CheckboxList plainOptions={allTags} defaultCheckedList={allTags} updateCheckedList={setCheckedList} />
                    </Card>
                </div>
            }

            <Flex vertical className="flex-grow" gap="small">
                {!loading && (
                    feed.length > 0 ?
                        feed.map((post, idx) => 
                            <Card key={idx} style={{ width: '70%' }} onClick={() => router.push('/post/'+post.id)}>
                                <Flex justify="space-between">
                                    <Flex vertical>
                                        <Typography.Title level={4}>{post.title}</Typography.Title>
                                        <Typography.Text>{post.subtitle}</Typography.Text>
                                        <Flex gap="small">
                                            {post.tags.length > 0 && <Typography.Text type="secondary">Looking for:</Typography.Text>}
                                            {post.tags.map((tag, idx) =>
                                                <div key={idx}>
                                                    <Tag color="magenta">
                                                        {tag}
                                                    </Tag>
                                                </div>
                                            )}
                                            <Typography.Text type="secondary">👀 {post.clicks}</Typography.Text>
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
                        )
                        :
                        <Empty />
                )}
            </Flex>
        </div>
    )
}