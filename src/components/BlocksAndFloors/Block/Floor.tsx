import React, { useState } from "react";
import { Button, Input, Menu, Popover, Form, Space } from "antd";
import {
  MenuUnfoldOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";
import style from "./Floor.module.css";

interface PropType {
  i: any;
  name: any;
  blockName: any;
  restField: any;
  remove: any;
  form: any;
}

const Floor = ({ i, name, blockName, restField, remove, form }: PropType) => {
  const [valueSaved, setValueSaved] = useState<boolean>(false);

  const saveChangesHandler = (name: number) => {
    form
      .validateFields([
        ["blocks", blockName, "floors", name, "floor"],
        ["blocks", blockName, "floors", name, "cost"],
      ])
      .then(() => {
        setValueSaved(true);
      });
  };

  const popoverContent = (name: any, remove: any) => {
    return !valueSaved ? (
      <div className={style.editing} onClick={() => remove(name)}>
        Удалить
      </div>
    ) : (
      <div>
        <div className={style.editing} onClick={() => setValueSaved(false)}>
          Изменить
        </div>
        <div className={style.editing} onClick={() => remove(name)}>
          Удалить
        </div>
      </div>
    );
  };

  return (
    <Space
      key={i}
      style={{ display: "flex", marginBottom: 8 }}
      align="baseline"
    >
      <Popover
        content={() => popoverContent([name, `floor`], remove)}
        trigger="click"
      >
        <MenuUnfoldOutlined />
      </Popover>
      <Form.Item
        {...restField}
        name={[name, `floor`]}
        rules={[{ required: true, message: "Введите номер этажа" }]}
      >
        {!valueSaved ? (
          <Input
            placeholder="Введите номер этажа"
            required={true}
            className={style.input}
          />
        ) : (
          <Input className={style.input} readOnly={true} bordered={false} />
        )}
      </Form.Item>
      <Form.Item {...restField} name={[name, `cost`]}>
        {!valueSaved ? (
          <Input
            placeholder="Введите первоначальную стоимость"
            className={style.input}
            type="number"
          />
        ) : (
          <Input className={style.input} readOnly={true} bordered={false} />
        )}
      </Form.Item>{" "}
      /m2 в месяц
      {!valueSaved && (
        <Button
          type="primary"
          className={style.button}
          onClick={() => saveChangesHandler(name)}
        >
          Сохранить
        </Button>
      )}
    </Space>
  );
};
export default Floor;
