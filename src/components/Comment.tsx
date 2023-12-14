import { Button, Col, Form, Input, Row } from "antd";

export default function CommentComponent() {
  const [form] = Form.useForm();
  return (
    <div className="comment-container mt-4 border-t border-t-blueSecondary pt-4">
      <Form
        form={form}
        layout="vertical"
        onChange={(e) => {
          console.log("qqwqwqw", e);
        }}
        method="POST"
        action={(e) => {
          console.log("action submit", e);
        }}
        onValuesChange={(x, y) => {
          console.log("kkkkk", x, y);
        }}
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
