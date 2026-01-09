import { Form, FormInstance, Input, UploadFile } from "antd";
import MultipleUpload from "@/components/ui/MultipleUpload";
import { useEffect, useState } from "react";
import StandardText from "@/components/ui/StandardText";
import Tags from "../ui/Tags";

interface Step1Props {
    form: FormInstance
}

export default function Step1({ form } : Step1Props) {
    const [fileList, setFileList] = useState<UploadFile[]>(form.getFieldValue("image uploads") ?? [])
    const [tags, setTags] = useState<string[]>([])

    function updateFileList(fileList: UploadFile[]) {
        setFileList(fileList);
        form.setFieldsValue({ "image uploads": fileList });
        form.setFieldsValue({ "images": fileList.map((file: UploadFile) => file.response?.supabase_file_path ?? '') });
    };

    function updateTags(newTags: string[]) {
        setTags(newTags);
        form.setFieldsValue({ "tags": newTags });
    };

    useEffect(() => {
        if (!form.getFieldValue("tags")) {
            updateTags(['Web Developer', 'Graphic Designer', 'AI/ML Engineer']);
        } else {
            setTags(form.getFieldValue("tags"));
        }
    }, [])

    return (
        <div className="bg-white text-left px-7 py-10 flex flex-col gap-y-10">
            <StandardText level={3}>Create your post</StandardText>
            <Form
                form={form}
                variant='filled'
                style={{ maxWidth: '75%', textAlign: 'left' }}
                initialValues={{ variant: 'filled' }}
                className="flex flex-col gap-y-10"
            >
                <Form.Item
                    label="Post Title"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input showCount maxLength={100} />
                </Form.Item>

                <Form.Item
                    label="Post Subtitle"
                    name="subtitle"
                >
                    <Input showCount maxLength={150} />
                </Form.Item>
                
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea placeholder="Long-form description of your project. Perfect place to outline timelines, motivations, etc" />
                </Form.Item>

                <Form.Item
                    label="Looking for"
                    name="tags"
                >
                    <Tags tags={tags} setTags={updateTags} />
                </Form.Item>

                <Form.Item label="Attachments (images)" name="images">
                    <MultipleUpload fileList={fileList} updateFileList={updateFileList} />
                </Form.Item>

                <Form.Item
                    label="Contact Info"
                    name="contact_info"
                >
                    <Input.TextArea  showCount maxLength={200} placeholder="Short message on how you would like to be contacted" />
                </Form.Item>
            </Form>
        </div>
    )
}