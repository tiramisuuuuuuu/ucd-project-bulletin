"use client";

import { userAtom } from "@/lib/atoms";
import { Avatar, Badge, Button, Dropdown, Form, Input, MenuProps, Modal, Typography } from "antd";
import { useAtom } from "jotai";
import Profile from "./ui/Profile";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zUser } from "@/types/Users";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";
import { TitleFont } from "@/lib/fonts";



export default function Header() {
    const [user, setUser] = useAtom(userAtom);
    const router = useRouter();
    const incompleteProfile = !user?.name || !user.tagline;
    const [open, setOpen] = useState(false);

    const [ form ] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ 
            "name": user?.name ?? '', 
            "tagline": user?.tagline ?? '', 
        });
    }, [])
    
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <>
                    <a onClick={() => setOpen(true)}>
                        {incompleteProfile ? 'Complete Profile' : 'Edit Profile'}
                    </a>
                    <Badge dot={incompleteProfile} />
                </>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={async () => { await signOut() }}>
                    Signout
                </a>
            ),
        },
    ];

    const handleSubmit = async () => {        
        const profile = {
            name: form.getFieldValue('name') ?? '',
            tagline: form.getFieldValue('tagline') ?? '',
        };
    
        const res = await fetch('/api/v1/users/update-user/', {
          method: 'PUT',
          body: JSON.stringify(profile),
        });
    
        const validatedData = zUser.safeParse(await res.json());
        if (!validatedData.success) {
            return;
        }
        
        setUser(validatedData.data);
        setOpen(false);
    }

    return (
        <div className="w-full pt-10 pb-7 px-12 mt-[-50px] mb-7 bg-white flex flex-row justify-between items-end shadow-lg">
            <div className="flex flex-row justify-between items-end cursor-pointer" onClick={() => router.push('/')}>
                <Image
                    src="/upb-logo.PNG"
                    alt="logo"
                    width={100}
                    height={100}
                />
                <Typography.Title level={2} className={`ml-[-30px] ${TitleFont.className}`}>UCD Project Bulletin</Typography.Title>
            </div>
            
            {user?.email && 
                <Dropdown menu={{ items }} placement="bottom" arrow>
                    <Button className="mb-4" type="link">
                        <Badge count={incompleteProfile ? 1 : 0}>
                            <Profile />
                        </Badge>
                    </Button>
                </Dropdown>
            }

            <Modal
                title={
                    <div className="flex flex-row items-center gap-4">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <p>Update Your Profile</p>
                    </div>
                }
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={open}
                onOk={handleSubmit}
                onCancel={() => setOpen(false)}
            >
                <Form
                    form={form}
                    variant='filled'
                    style={{ maxWidth: '75%', textAlign: 'left', paddingTop: 30 }}
                    initialValues={{ variant: 'filled' }}
                    className="flex flex-col gap-y-2"
                >
                    <Form.Item
                        label="Display Name"
                        name="name"
                    >
                        <Input showCount maxLength={20} />
                    </Form.Item>

                    <Form.Item
                        label="Tagline, i.e. CS '26"
                        name="tagline"
                    >
                        <Input showCount maxLength={20} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
