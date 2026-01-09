import { Card, Divider, Flex, Tag, Typography } from "antd";
import StandardText from "@/components/ui/StandardText";
import { PostDetail } from "@/types/Posts";
import Profile from "../ui/Profile";
import { format } from "date-fns";
import MultipleImage from "../ui/MultipleImage";

interface Step2Props {
    post: PostDetail | null
}

export default function Step2({ post } : Step2Props) {
    if (!post) {
        return (
            <div></div>
        )
    }
    console.log(post.tags)
    return (
        <div className="w-full relative flex flex-row justify-between gap-5">
            <Flex vertical className="flex-grow">
                <Typography.Title>{post.title}</Typography.Title>

                <Typography.Text type="secondary">{post.subtitle}</Typography.Text>

                <Flex gap="small">
                    <Typography.Text type="secondary">Looking for:</Typography.Text>
                    {post.tags.map((tag, idx) =>
                        <div key={idx}>
                            <Tag color="magenta">
                                {tag}
                            </Tag>
                        </div>
                    )}
                </Flex>
                
                <Typography.Paragraph>
                    {post.description}
                </Typography.Paragraph>
                <Divider />
                <Typography.Title level={2}>Attachments</Typography.Title>
                {post.images.length === 0 ? 
                    <p>(no attachments)</p>
                    : <MultipleImage images={post.images} />
                }
            </Flex>

            <div>
                <Card style={{ width: 400, position: 'sticky', top: 0 }}>
                    <Flex>
                        <Flex vertical>
                            <p>Posted on:</p>
                            <p>{format(post.created_at, "MMMM d, yyyy")}</p>
                        </Flex>
                        {post.updated_at &&
                            <Flex vertical>
                                <p>Updated on:</p>
                                <p>{format(post.updated_at, "MMMM d, yyyy")}</p>
                            </Flex>
                        }
                    </Flex>
                    <Flex vertical>
                        <p>Posted by:</p>
                        <Flex gap="small">
                            <Profile />
                            <Flex vertical>
                                <p>{post.name ?? "User"}</p>
                                <p>{post.tagline ?? "-"}</p>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Divider>Contact me via</Divider>
                    <p>{post.contact_info}</p>
                </Card>
            </div>
        </div>
    )
}