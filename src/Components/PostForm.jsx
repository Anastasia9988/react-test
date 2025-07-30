import React from "react";
import { Form, Input, Button } from "antd";

const PostForm = ({ create }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const newPost = {
            ...values,
            id: Date.now(),
            tags: values.tags ? values.tags.split(",").map(t => t.trim()) : [],
            reactions: { likes: 0, dislikes: 0 }
        };
        create(newPost);
        form.resetFields();
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Название поста"
                name="title"
                rules={[{ required: true, message: "Введите название" }]}
            >
                <Input placeholder="Введите название" />
            </Form.Item>

            <Form.Item
                label="Описание поста"
                name="body"
                rules={[{ required: true, message: "Введите описание" }]}
            >
                <Input.TextArea rows={3} placeholder="Введите описание" />
            </Form.Item>

            <Form.Item label="Теги (через запятую)" name="tags">
                <Input placeholder="Например: react,redux,frontend" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Создать пост
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PostForm;
