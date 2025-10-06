import { Form, Input, Select } from "antd";
import MultipleUpload from "../ui/MultipleUpload";
import { useState } from "react";

const dropoffLocationOptions = [
    {value: 'Silo', label: 'Silo'},
    {value: 'Memorial Union', label: 'Memorial Union'},
    {value: 'Shields Library', label: 'Shields Library'}
]

export default function Step2() {
    const [form] = Form.useForm();
    const [supabase_file_paths, setSupabaseFilePaths] = useState<string[]>([]);

    return (
        <Form
            form={form}
            variant='filled'
            style={{ maxWidth: 600 }}
            initialValues={{ variant: 'filled' }}
        >
            <Form.Item label="Input" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
                <MultipleUpload setSupabaseFilePaths={setSupabaseFilePaths} />
            </Form.Item>

            <Form.Item
                label="Description"
                name="TextArea"
                rules={[{ required: true, message: 'Please input!' }]}
            >
                <Input.TextArea placeholder="Describe appearance that can help users identify the bike" />
            </Form.Item>

            <Form.Item
                label="Dropoff location (this can be changed at dropoff time)"
                name="Select"
                rules={[{ required: true, message: 'Please input!' }]}
            >
                <Select options={dropoffLocationOptions} />
            </Form.Item>
        </Form>
    )
}