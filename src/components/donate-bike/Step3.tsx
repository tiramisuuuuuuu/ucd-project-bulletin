import { Form, FormInstance, Input, Select, UploadFile } from "antd";
import MultipleUpload from "@/components/ui/MultipleUpload";
import { useEffect, useState } from "react";
import StandardText from "@/components/ui/StandardText";

const dropoffLocationOptions = [
    {value: 'Silo', label: 'Silo'},
    {value: 'Memorial Union', label: 'Memorial Union'},
    {value: 'Shields Library', label: 'Shields Library'}
]

interface Step3Props {
    form: FormInstance
}

export default function Step3({ form } : Step3Props) {
    const [fileList, setFileList] = useState<UploadFile[]>(form.getFieldValue("Dropoff Uploads") ?? [])
    
    function updateFileList(fileList: UploadFile[]) {
        setFileList(fileList);
        form.setFieldsValue({ "Dropoff Uploads": fileList });
        form.setFieldsValue({ "Dropoff Image": fileList.map((file: UploadFile) => file.response?.supabase_file_path ?? '') });
    };

    return (
        <div className="bg-white text-left px-7 py-10 flex flex-col gap-y-10">
            <StandardText level={3}>Upload Dropoff Details</StandardText>
            <Form
                form={form}
                variant='filled'
                style={{ maxWidth: 600, textAlign: 'left' }}
                initialValues={{ variant: 'filled' }}
                className="flex flex-col gap-y-10"
                wrapperCol={{ flex: 1 }}
            >
                <Form.Item
                    label="Dropoff location"
                    name="Confirm Dropoff Location"
                    rules={[{ required: true }]}
                >
                    <Select options={dropoffLocationOptions} />
                </Form.Item>
                
                <Form.Item label="Dropoff image (please have the bike and recognizable surroundings as the subject)" name="Dropoff Image" rules={[{ required: true }]}>
                    <MultipleUpload fileList={fileList} updateFileList={updateFileList} />
                </Form.Item>

                <Form.Item
                    label="Dropoff Description"
                    name="Dropoff Description"
                >
                    <Input.TextArea placeholder="Describe any details that can make it easier to locate the bike" />
                </Form.Item>

                <Form.Item
                    label="Bike lock combination"
                    name="Bike Lock"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}