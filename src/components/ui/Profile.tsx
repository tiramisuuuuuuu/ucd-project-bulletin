import { userAtom } from "@/lib/atoms";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAtom } from "jotai";

export default function Profile() {
    const [user, _] = useAtom(userAtom);

    return (
        <>
            {user?.profile_image ? 
                <Avatar src={user.profile_image} /> 
                : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            }
        </>
    )
}