import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./Objects.module.css";
import { Button, Modal, Popover, Table } from "antd";
import { MenuOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { AllDataType } from "../type";

interface propType {
  allData: AllDataType[];
  setAllData: any;
}

const Objects = ({ allData, setAllData }: propType) => {
  useEffect(() => {
    window.localStorage.removeItem("activeTab");
  }, []);

  let history = useHistory();
  const viewButtonHandler = (key: any) => {};
  const changeButtonHandler = (key: any) =>
    history.push(`/card-building/:${key}`);

  const deleteButtonHandler = (key: any) => {
    return Modal.confirm({
      title:
        "При удалении объекта будут удалены все этажи и помещения. Вы действительно хотите удалить объект?",
      icon: <ExclamationCircleOutlined />,
      okText: "ок",
      onOk() {
        const newAllData = allData.filter((el: AllDataType) => el.key !== key);
        setAllData(newAllData);
        window.localStorage.setItem("allData", JSON.stringify(newAllData));
      },
      cancelText: "отмена",
    });
  };

  const popoverContent = (key: any) => {
    return (
      <div>
        <div className={style.editing} onClick={() => viewButtonHandler(key)}>
          Просмотреть
        </div>
        <div className={style.editing} onClick={() => changeButtonHandler(key)}>
          Изменить
        </div>
        <div className={style.editing} onClick={() => deleteButtonHandler(key)}>
          Удалить
        </div>
      </div>
    );
  };
  const columns = [
    {
      width: 30,
      render: (record: any) => {
        return (
          <Popover content={() => popoverContent(record.key)} trigger="click">
            <MenuOutlined />
          </Popover>
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
      key: `${["squareStatus", "occupiedAreas"]}`,
      dataIndex: ["squareStatus", "occupiedAreas"],
    },
    {
      title: "Свободные площади",
      key: `${["squareStatus", "freeAreas"]}`,
      dataIndex: ["squareStatus", "freeAreas"],
    },
    {
      title: "Недоступные площади",
      key: `${["squareStatus", "inaccessibleAreas"]}`,
      dataIndex: ["squareStatus", "inaccessibleAreas"],
    },

    {
      title: "Заполняемость",
      key: "occupancy",
      dataIndex: "occupancy",
    },
  ];

  const footer = () => `Всего: ${allData.length}`;

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        Обьекты
        <Link to="/add-building">
          <Button>Добавить</Button>
        </Link>
      </div>
      <div className={style.main}>
        <Table columns={columns} dataSource={allData} footer={footer} />
      </div>
    </div>
  );
};

export default Objects;
