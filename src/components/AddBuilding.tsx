import React from "react";
import { Button, Form } from "antd";
import style from "./CardBuilding.module.css";
import Building from "./Building/Building";
import { Link } from "react-router-dom";

interface propType {
  setData: any;
}

const AddBuilding = ({ setData }: propType) => {
  return (
    <div className={style.wrapper}>
      <h2>Добавление объекта</h2>
      <Building />
      <div className={`style.buttonWrapper`}>
        <Button type="primary" htmlType="submit" className={style.button}>
          Сохранить
        </Button>
        <Link to="/">
          <Button type="primary" htmlType="submit" className={style.button}>
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
