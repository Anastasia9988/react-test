import React from "react";
import { Input, Select } from "antd";

const PostFilter = ({ filter, setFilter }) => {
    return (
        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <Input
                value={filter.query}
                onChange={(e) => setFilter({ ...filter, query: e.target.value.toLowerCase() })}
                placeholder="Поиск..."
                style={{ maxWidth: 300 }}
            />
            <Select
                value={filter.sort}
                onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
                placeholder="Сортировка по"
                style={{ width: 200 }}
            >
                <Select.Option value="title">По названию</Select.Option>
                <Select.Option value="body">По описанию</Select.Option>
            </Select>
        </div>
    );
};

export default PostFilter;
