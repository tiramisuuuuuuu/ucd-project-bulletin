import { Card, Divider, Flex, Typography } from "antd";
import StandardText from "@/components/ui/StandardText";
import { PostDetail } from "@/types/Posts";
import Profile from "../ui/Profile";
import { format } from "date-fns";

interface Step2Props {
    post: PostDetail | null
}

export default function Step2({ post } : Step2Props) {
    if (!post) {
        return (
            <div></div>
        )
    }
    return (
        <div className="bg-white text-left px-7 py-10 flex flex-col gap-y-10">
            <StandardText level={3}>Preview your post</StandardText>
            <Typography>
                <Typography.Title>{post.title}</Typography.Title>

                <Typography.Text type="secondary">{post.subtitle}</Typography.Text>

                <Typography.Paragraph>
                    {post.description}
                </Typography.Paragraph>
            </Typography>

            <Card style={{ width: 400 }}>
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
    )
}