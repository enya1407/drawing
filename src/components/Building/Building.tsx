import React, { useState } from "react";
import style from "./Building.module.css";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  message,
  Button,
  Popover,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import building from "../../image/building.jpg";
import trashCan from "../../image/trashCan.svg";
import { AllDataType, BasicDataType } from "../../type";

const { Option } = Select;

const { Dragger } = Upload;
interface propType {
  basicData: BasicDataType[];
  allData: AllDataType[];
  form: any;
  id?: number;
}

const Building = ({ basicData, allData, form, id }: propType) => {
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  };

  const [pictureVisibility, setPictureVisibility] = useState<boolean>(true);
  const styleBuilding = pictureVisibility ? style.building : style.hidden;
  const styleTrashCan = pictureVisibility ? style.trashCan : style.hidden;
  console.log(id);
  return (
    <div className={style.wrapper}>
      <section className={style.section}>
        <p className={style.heading}>Общая информация</p>
        <Form.Item
          className={style.item}
          label="Название"
          name="name"
          initialValue={id === undefined ? "" : allData[Number(id)].name}
          rules={[
            {
              required: true,
              message: "Не может быть пустым",
            },
          ]}
        >
          <Input placeholder="Введите название обьекета" />
        </Form.Item>
        <Form.Item
          className={style.item}
          label="Номер обьекта"
          name="objectNumber"
          initialValue={
            id === undefined ? "" : allData[Number(id)].objectNumber
          }
        >
          <Input placeholder="Введите номер обьекта" />
        </Form.Item>
        <Form.Item
          className={style.item}
          label="Адрес"
          name="address"
          initialValue={id === undefined ? "" : allData[Number(id)].address}
          rules={[{ required: true, message: "Не может быть пустым" }]}
        >
          <Input placeholder="Город, улица, номер дома, корпус" />
        </Form.Item>
      </section>
      <section className={style.section}>
        <p className={style.heading}>Характеристики</p>
        <div className={style.characteristicsWrapper}>
          <div>
            <Form.Item
              className={`${style.item}`}
              label="Класс"
              name="class"
              initialValue={
                allData[Number(id)]?.class && allData[Number(id)].class
              }
            >
              <Select defaultValue="Не присвоен" style={{ width: 200 }}>
                <Option value="А+">А+</Option>
                <Option value="A">A</Option>
                <Option value="B+">B+</Option>
                <Option value="C+">C+</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
                <Option value="Е">Е</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Исполнение"
              name="execution"
              initialValue={
                allData[Number(id)]?.execution && allData[Number(id)].execution
              }
            >
              <Select defaultValue="Не указано" style={{ width: 200 }}>
                <Option value="дерево">Дерево</Option>
                <Option value="кирпич">кирпич</Option>
                <Option value="панели">панели</Option>
                <Option value="железобетон">железобетоно</Option>
                <Option value="Не указано">Не указано</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Собственник"
              name="owner"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue="Скороход Анастасия"
            >
              <Select style={{ width: 200 }}>
                <Option value="Скороход Анастасия">Скороход Анастасия</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Полная площадь"
              name="fullArea"
              initialValue={
                allData[Number(id)]?.fullArea && allData[Number(id)].fullArea
              }
            >
              <Input type="number" style={{ width: 100 }} />
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Арендопригодная площадь"
              name="rentableArea"
              initialValue={
                allData[Number(id)]?.rentableArea &&
                allData[Number(id)].rentableArea
              }
            >
              <Input type="number" style={{ width: 100 }} />
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Этажность"
              name="numberOfStoreys"
              initialValue={
                allData[Number(id)]?.numberOfStoreys &&
                allData[Number(id)].numberOfStoreys
              }
            >
              <Input style={{ width: 100 }} />
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Ввод в эксплуатацию"
              name="commissioning"
              initialValue={
                allData[Number(id)]?.commissioning &&
                allData[Number(id)].commissioning
              }
            >
              <DatePicker placeholder="Выберите дату" />
            </Form.Item>
          </div>
          <div className={style.placeForPhoto}>
            <img src={building} className={styleBuilding} />{" "}
            <Popover content="Удалить изображение">
              <img
                src={trashCan}
                className={styleTrashCan}
                onClick={() => setPictureVisibility(false)}
              />
            </Popover>
          </div>
        </div>
      </section>
      <section className={style.section}>
        <p className={style.heading}>Файлы</p>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Перетащите сюда файлы или выберите на компьютере
          </p>
        </Dragger>
      </section>
      <section className={style.section}>
        {" "}
        <p className={style.heading}>Комментарий</p>
        <Form.Item
          name="comment"
          initialValue={id === undefined ? "" : allData[Number(id)].comment}
        >
          <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
      </section>
    </div>
  );
};

export default Building;
