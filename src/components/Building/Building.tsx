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
interface propType {
  data: any;
  form: any;
}

const Building = ({ data, form }: propType) => {
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
        <Form.Item
          className={style.item}
          label="Название"
          name="name"
          initialValue={data[0] && data[0].name}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Введите название обьекета" />
        </Form.Item>
        <Form.Item
          className={style.item}
          label="Номер обьекта"
          name="objectNumber"
        >
          <Input placeholder="Например кадастровый номер" />
        </Form.Item>
        <Form.Item
          className={style.item}
          label="Адрес"
          name="address"
          initialValue={data[0] && data[0].address}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Город, улица, номер дома, корпус" />
        </Form.Item>
      </section>
      <section className={style.section}>
        <p className={style.heading}>Характеристики</p>
        <div className={style.characteristicsWrapper}>
          <div>
            <Form.Item className={`${style.item}`} label="Класс" name="class">
              <Select defaultValue="Не присвоен" style={{ width: 200 }}>
                <Option value="Не присвоен">Не присвоен</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Исполнение"
              name="execution"
            >
              <Select defaultValue="Не указано" style={{ width: 200 }}>
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
            >
              <Input type="number" style={{ width: 100 }} />
              <span style={{ marginLeft: 5 }}>
                м<sup>2</sup>
              </span>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Арендопригодная площадь"
              name="rentableArea"
            >
              <Input type="number" style={{ width: 100 }} />
              <span style={{ marginLeft: 5 }}>
                м<sup>2</sup>
              </span>
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Этажность"
              name="numberOfStoreys"
            >
              <Input style={{ width: 100 }} />
            </Form.Item>
            <Form.Item
              className={style.item}
              label="Ввод в эксплуатацию"
              name="commissioning"
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
        <Form.Item name="comment">
          <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
      </section>
    </div>
  );
};

export default Building;
