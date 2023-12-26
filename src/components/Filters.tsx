"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";

import OneSelectItem from "./Select";
import {
  getListCategory,
  getListCountry,
  getListQuality,
} from "@/common/utils";

function FiltersComponent({
  filters,
  setFilters,
  fetching,
  onSubmit,
  keyword,
  isSearching = false,
}: {
  filters: any;
  setFilters: any;
  fetching: boolean;
  onSubmit: any;
  keyword?: string;
  isSearching?: boolean;
}) {
  const [form] = Form.useForm();

  const [listCountry, setListCountry] = useState([]);
  const [listCategory, setListCategory] = useState<any[]>([]);
  const [listQuality, setListQuality] = useState([]);


  // const [category, setCategory] = useState<any>(null)

  useEffect(() => {
    getListCategory()
      .then((value) => setListCategory(value))
      .catch(() => setListCategory([]));
    getListCountry()
      .then((e) => setListCountry(e))
      .catch(() => setListCountry([]));
    getListQuality()
      .then((e) => setListQuality(e))
      .catch(() => setListQuality([]));
  }, []);

  const handleCategoryChange = (value: any) => {
    const newData = { ...filters };
    newData.category = value;
    setFilters(newData);
  };

  const handleCountryChange = (value: any) => {
    const newData = { ...filters };
    newData.country = value;
    setFilters(newData);
  };

  const handleQualityChange = (value: any) => {
    const newData = { ...filters };
    newData.quality = value;
    setFilters(newData);
  };
  const handleSearchInputChange = (e: any) => {
    const newData = { ...filters };
    newData.keyword = e.target.value;
    setFilters(newData);
  };

  return (
    <div className="filters-container w-full">
      <Form
        form={form}
        layout="vertical"
        requiredMark
        className="rounded-lg p-3"
        // onValuesChange={(x, y) => {
        //   console.log("hehehee", x, y);
        // }}
      >
        {isSearching && (
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                initialValue={keyword}
                name="keyword"
                label={
                  <span className="text-white">Nhập từ khoá tìm kiếm</span>
                }
                rules={[{ required: false }]}
              >
                <Input
                  className="w-full"
                  placeholder="Nhập từ khoá tìm kiếm"
                  autoFocus
                  onChange={handleSearchInputChange}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item name="category" rules={[{ required: false }]}>
              <OneSelectItem
                options={listCategory}
                placeholder="--Chọn thể loại--"
                handleChange={handleCategoryChange}
                style={{
                  width: "100%",
                }}
                className="custom-select-selector"
                popupClassName="!bg-[#2b1867] custom-popup-option"
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="category" rules={[{ required: false }]}>
              <OneSelectItem
                options={listCountry}
                placeholder="--Chọn quốc gia--"
                handleChange={handleCountryChange}
                style={{
                  width: "100%",
                }}
                className="custom-select-selector"
                popupClassName="!bg-[#2b1867] custom-popup-option"
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="category" rules={[{ required: false }]}>
              <OneSelectItem
                options={listQuality}
                placeholder="--Chọn chất lượng--"
                handleChange={handleQualityChange}
                style={{
                  width: "100%",
                }}
                className="custom-select-selector"
                popupClassName="!bg-[#2b1867] custom-popup-option"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Button
                className="!bg-blueSecondary !text-white hover:!border-[#5142FC]"
                type="primary"
                htmlType="submit"
                loading={fetching}
                onClick={() => {
                  onSubmit(filters);
                }}
              >
                Lọc phim
              </Button>
            </Form.Item>
          </Col>
        </Row>
        
      </Form>
    </div>
  );
}

export default React.memo(FiltersComponent);
