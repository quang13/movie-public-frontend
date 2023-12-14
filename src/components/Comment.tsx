"use client";

import { Button, Form, Input } from "antd";
import { useState } from "react";

export default function CommentComponent() {
  const [form] = Form.useForm();
  const [comment, setComment] = useState<any>(null);
  const [dataCoomments, setDataComments] = useState<any[]>([]);

  const handleChangeValueComment = (changed: any, value: any) => {
    form.setFieldsValue(value);
  };
  return (
    <div className="comment-container mt-4 border-t border-t-blueSecondary pb-[400px] pt-4">
      <p className="head-title mb-4 text-xl font-medium">Để lại bình luận</p>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleChangeValueComment}
      >
        <Form.Item
          name="commenter"
          label={<span className="text-white">Nhập tên</span>}
          rules={[
            {
              required: true,
              min: 3,
              message: "Vui lòng nhập tên người bình luận",
            },
          ]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>

        <Form.Item
          name="content"
          label={<span className="text-white">Nội dung bình luận</span>}
          rules={[
            {
              required: true,
              min: 3,
              message: "Vui lòng nhập nội dung bình luận",
            },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Nhập bình luận" />
        </Form.Item>

        <Form.Item noStyle>
          <Button type="primary" htmlType="submit" className="">
            Bình luận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
