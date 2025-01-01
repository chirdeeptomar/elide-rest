import {
    Edit,
    useForm,
    useSelect,
} from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { Form, Input, Select } from "antd";

import { Category, Post } from "../../interfaces";

export const PostEdit: React.FC = () => {
    const { formProps, saveButtonProps, query } = useForm<{ data: Post }, HttpError, { data: Post }>();

    const { selectProps: categorySelectProps } = useSelect<Category>({
        resource: "category",
        optionLabel: (category) => category.attributes.title,
        optionValue: "id",
        defaultValue: query?.data?.data?.data.relationships?.category.data.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} onFinish={(values) => {
                const { data } = values
                return (
                    formProps.onFinish &&
                    formProps.onFinish({
                        "data": {
                            "id": query?.data?.data.data.id,
                            "type": query?.data?.data.data.type!,
                            "attributes": {
                                "content": data.attributes.content,
                                "title": data.attributes.title
                            },
                            "relationships": {
                                "category": {
                                    "data": {
                                        "type": "category",
                                        "id": data.relationships.category.data.id
                                    }
                                }
                            }
                        }
                    })
                );
            }} layout="vertical">
                <Form.Item
                    label="Title"
                    name={["data", "attributes", "title"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name={["data", "attributes", "content"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text" />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["data", "relationships", "category", "data", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
            </Form>
        </Edit >
    );
};