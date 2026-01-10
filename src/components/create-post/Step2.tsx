import { Avatar, Card, Divider, Flex, Tag, Typography } from "antd";
import StandardText from "@/components/ui/StandardText";
import { PostDetail } from "@/types/Posts";
import Profile from "../ui/Profile";
import { format } from "date-fns";
import MultipleImage from "../ui/MultipleImage";
import { UserOutlined } from "@ant-design/icons";

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

                <Divider />
                
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
                            <p className="pb-3">Posted on:</p>
                            <p>{format(post.created_at, "MMMM d, yyyy")}</p>
                        </Flex>
                        {post.updated_at &&
                            <Flex vertical>
                                <p className="pb-3">Updated on:</p>
                                <p>{format(post.updated_at, "MMMM d, yyyy")}</p>
                            </Flex>
                        }
                    </Flex>

                    <Divider />

                    <Flex vertical>
                        <p className="pb-5">Posted by:</p>
                        <Flex gap="small">
                            <div className="my-auto">
                                {post.profile_image ?
                                    <Avatar src={post.profile_image} /> 
                                    : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                }
                            </div>
                    
                            <Flex vertical>
                                <p>{post.name ?? "Anonymous"}</p>
                                <p>{post.tagline ?? "Groovy User"}</p>
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