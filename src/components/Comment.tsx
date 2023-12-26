"use client";

import { BASE_URL, GET_COMMENT } from "@/common/constant";
import { Button, Form, Input } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";

export default function CommentComponent({ slug, firstDataComment }: { slug: string, firstDataComment: any }) {
  if (!slug) return null;
  const [form] = Form.useForm();
  // const [comment, setComment] = useState<any>(null);
  const [dataComments, setDataComments] = useState<any[]>([]);

  useEffect(()=>{
    if(!firstDataComment) return
    setDataComments(firstDataComment)
  }, [firstDataComment])

  const handleChangeValueComment = (changed: any, value: any) => {
    form.setFieldsValue(value);
  };

  // const fetchDataComment = async () => {
  //   const res = await fetch(`${BASE_URL}${GET_COMMENT}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ slug: slug, limit: 3 }),
  //     next: { revalidate: 1800, tags: ["get-comment"] },
  //   });
  //   if (res.ok) {
  //     const data = await res.json();
  //     setDataComments(data.result);
  //   } else {
  //     setDataComments([]);
  //   }
  // };

  // useEffect(() => {
  //   fetchDataComment();
  // }, []);

  return (
    <div className="comment-container mt-4 border-t border-t-blueSecondary pb-8 pt-4">
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
      <div className="list-comment mt-8 ">
        {!isEmpty(dataComments) &&
          dataComments?.map((e) => (
            <div className="parent-comment" key={e._id}>
              <p className="username w-fit border-b border-b-blueSecondary text-base font-semibold flex items-center gap-1.5 pb-1 mt-2">
                <span className=" rounded-full bg-[#5142FC] p-2 text-white">
                  <FaRegUser size={14} />
                </span>{" "}
                {e.name}
              </p>
              <p className="content my-1 text-sm">Content: {e.content}</p>
              {!isEmpty(e.replies) && (
                <div className="child-list-comment-replies ml-2 border-l-2 border-l-blueSecondary pl-3">
                  {e.replies.map((val: any) => (
                    <div className="child-replies-comment" key={e._id}>
                      <p className="replier-name w-fit border-b border-brandLinear pb-1 text-sm font-semibold">
                        User: {val.rep_name}
                      </p>
                      <p className="reply-content text-sm">
                        Content: {val.rep_content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

// export default React.memo(CommentComponent)