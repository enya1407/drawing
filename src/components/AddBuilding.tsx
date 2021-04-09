import React from "react";
import { Button, Form } from "antd";
import style from "./CardBuilding.module.css";
import Building from "./Building/Building";
import { Link } from "react-router-dom";
import {SquareStatus} from "../type";

interface propType {
  data: any;
  setData: any;
}

const AddBuilding = ({ data, setData }: propType) => {
  const [form] = Form.useForm();
  const key = data.length > 0 ? data[data.length - 1]?.key + 1 : 0;

  const saveAndExitButton = () => {
    const name = form.getFieldValue(`name`);
    const owner = form.getFieldValue(`owner`);
    const address = form.getFieldValue(`address`);

    const newData = [
      ...data,
      {
        key: key,
        name: name,
        owner: owner,
        address: address,
        occupiedAreas: null,
        freeAreas: null,
        occupancy: null,
        squareStatus:SquareStatus.free
      },
    ];
    setData(newData);
  };

  return (
      <div className={style.wrapper}>
        <h2>Добавление объекта</h2>
        <Form
            form={form}
            name="formAdd"
            onValuesChange={(changedValues, allValues) => {
              console.log("formAdd", allValues);
            }}
        >
          <Building data={data} form={form} id={null} />
        </Form>

        <div className={`style.buttonWrapper`}>
          <Link to={`/card-building/:${key}`}>
            <Button
                type="primary"
                htmlType="submit"
                className={style.button}
                onClick={saveAndExitButton}
            >
              Сохранить
            </Button>
          </Link>
          <Link to="/">
            <Button
                onClick={saveAndExitButton}
                type="primary"
                htmlType="submit"
                className={style.button}
            >
              Сохранить и выйти
            </Button>
          </Link>
          <Link to="/">
            <Button className={style.button}>Отмена</Button>
          </Link>
        </div>
      </div>
  );
};

export default AddBuilding;

