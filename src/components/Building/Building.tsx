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

const { Option } = Select;

const { Dragger } = Upload;

const Building = () => {
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  };
  const [pictureVisibility, setPictureVisibility] = useState<boolean>(true);
  const styleBuilding = pictureVisibility ? style.building : style.hidden;
  const styleTrashCan = pictureVisibility ? style.trashCan : style.hidden;
  return (
    <div className={style.wrapper}>
      <section className={style.section}>
        <p className={style.heading}>Общая информация</p>
        <Form
          name="general information"
          initialValues={{ remember: true }}
          layout="vertical"
          className={style.form1}
        >
          <Form.Item
            className={style.item}
            label="Название"
            name="Название"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className={style.item}
            label="Номер обьекта"
            name="Номер обьекта"
          >
            <Input placeholder="Например кадастровый номер" />
          </Form.Item>
          <Form.Item
            className={style.item}
            label="Адрес"
            name="Адрес"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Город, улица, номер дома, корпус" />
          </Form.Item>
        </Form>
      </section>
      <section className={style.section}>
        <p className={style.heading}>Характеристики</p>
        <div className={style.characteristicsWrapper}>
          <Form
            name="characteristics"
            initialValues={{ remember: true }}
            className={style.form2}
          >
            <Form.Item className={`${style.item}`} label="Класс" name="Класс">
              <Select defaultValue="Не присвоен" style={{ width: 200 }}>
                <Option value="Не присвоен">Не присвоен</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Исполнение"
              name="Исполнение"
            >
              <Select defaultValue="Не указано" style={{ width: 200 }}>
                <Option value="Не указано">Не указано</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Собственник"
              name="Собственник"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select defaultValue="Скороход Анастасия" style={{ width: 200 }}>
                <Option value="Скороход Анастасия">Скороход Анастасия</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Полная площадь"
              name="Полная площадь"
            >
              <Input style={{ width: 100 }} />
              <span style={{ marginLeft: 5 }}>
                м<sup>2</sup>
              </span>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Арендопригодная площадь"
              name="Арендопригодная площадь"
            >
              <Input style={{ width: 100 }} />
              <span style={{ marginLeft: 5 }}>
                м<sup>2</sup>
              </span>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Этажность"
              name="Этажность"
            >
              <Input style={{ width: 100 }} />
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Ввод в эксплуатацию"
              name="Ввод в эксплуатацию"
            >
              <DatePicker placeholder="Выберите дату" />
            </Form.Item>
          </Form>
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
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </section>
    </div>
  );
};

export default Building;
