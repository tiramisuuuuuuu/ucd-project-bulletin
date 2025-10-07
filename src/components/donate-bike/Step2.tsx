import { Checkbox, Form, FormInstance, Input, Select } from "antd";
import MultipleUpload from "@/components/ui/MultipleUpload";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import StandardText from "@/components/ui/StandardText";

const dropoffLocationOptions = [
    {value: 'Silo', label: 'Silo'},
    {value: 'Memorial Union', label: 'Memorial Union'},
    {value: 'Shields Library', label: 'Shields Library'}
]

interface Step2Props {
    form: FormInstance
    setExtendForm: Dispatch<SetStateAction<boolean>>;
}

export default function Step2({ form, setExtendForm } : Step2Props) {
    const [supabase_file_paths, setSupabaseFilePaths] = useState<string[]>([]);

    useEffect(() => {
        form.setFieldsValue({ "Bike Image": supabase_file_paths });
    }, [supabase_file_paths]);

    return (
        <div className="bg-white text-left px-7 py-10 flex flex-col gap-y-10">
            <StandardText level={3}>Upload Bike Details</StandardText>
            <Form
                form={form}
                variant='filled'
                style={{ maxWidth: 600, textAlign: 'left' }}
                initialValues={{ variant: 'filled' }}
                className="flex flex-col gap-y-10"
            >
                <Form.Item label="Bike Image" name="Bike Image" rules={[{ required: true }]}>
                    <MultipleUpload setSupabaseFilePaths={setSupabaseFilePaths} />
                </Form.Item>

                <Form.Item
                    label="Bike Description"
                    name="Bike Description"
                >
                    <Input.TextArea placeholder="Describe appearance that can help users identify the bike" />
                </Form.Item>

                <Form.Item
                    label="Dropoff location (this can be changed at dropoff time)"
                    name="Dropoff Location"
                    rules={[{ required: true }]}
                >
                    <Select options={dropoffLocationOptions} />
                </Form.Item>

                <Form.Item
                    name="Ready For Dropoff"
                >
                    <Checkbox onChange={(e) => {setExtendForm(e.target.checked)}}>
                        <StandardText level={5} className="pt-1.5 pl-1">I'm ready to drop off the bike and bike lock now</StandardText>
                    </Checkbox>
                </Form.Item>
            </Form>
        </div>
    )
}