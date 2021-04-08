import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Objects.module.css";
import CardBuilding from "./CardBuilding";
import { Button, Space, Table, Tag } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const columns = [
  {
    width: 30,
    render: () => (
      <Link to="/card-building">
        <MenuOutlined />
      </Link>
    ),
  },
  {
    title: "Названия",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Собственник",
    key: "owner",
    dataIndex: "owner",
  },
  {
    title: "Занятые площади",
    key: "occupiedAreas",
    dataIndex: "occupiedAreas",
  },
  {
    title: "Свободные площади",
    key: "freeAreas",
    dataIndex: "freeAreas",
  },
  {
    title: "Заполняемость",
    key: "occupancy",
    dataIndex: "occupancy",
  },
];
const spareData = [
  {
    key: "1",
    name: "Импайе стейт билдинг",
    address: "New York No. 1 Lake Park",
    owner: "OAO 'Белые стены'",
    occupiedAreas: 3,
    freeAreas: 4,
    occupancy: 5,
  },
  {
    key: "2",
    name: "Ещё один билдинг",
    address: "Гдето там далеко-далеко",
    owner: "OAO 'Рога и копыта'",
    occupiedAreas: 6,
    freeAreas: 7,
    occupancy: 7,
  },
];
interface dataType {
  key: string;
  name: string;
  address: string;
  owner: string;
  occupiedAreas?: number;
  freeAreas?: number;
  occupancy?: number;
}
interface propType {
  data: dataType[];
}

const Objects = ({ data }: propType) => {
  const draw = data.length > 0 ? data : spareData;
  const footer = () => `Всего: ${draw.length}`;
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        Обьекты
        <Link to="/add-building">
          <Button>Добавить</Button>
        </Link>
      </div>
      <div className={style.main}>
        <Table columns={columns} dataSource={draw} footer={footer} />
      </div>
    </div>
  );
};

export default Objects;
