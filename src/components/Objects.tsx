import React from "react";
import { Link } from "react-router-dom";
import style from "./Objects.module.css";
import { Button, Table } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { BasicDataType } from "../type";

const columns = [
  {
    width: 30,
    render: (record: any) => {
      return (
        <Link to={`/card-building/:${record.key}`}>
          <MenuOutlined />
        </Link>
      );
    },
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
    title: "Недоступные площади",
    key: "inaccessibleAreas",
    dataIndex: "inaccessibleAreas",
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

interface propType {
  basicData: BasicDataType[];
}

const Objects = ({ basicData }: propType) => {
  const footer = () => `Всего: ${basicData.length}`;
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        Обьекты
        <Link to="/add-building">
          <Button>Добавить</Button>
        </Link>
      </div>
      <div className={style.main}>
        <Table columns={columns} dataSource={basicData} footer={footer} />
      </div>
    </div>
  );
};

export default Objects;
