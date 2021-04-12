import React from "react";
import { Button, Form } from "antd";
import style from "./CardBuilding.module.css";
import Building from "./Building/Building";
import { Link } from "react-router-dom";
import { AllDataType, BasicDataType } from "../type";

interface propType {
  basicData: BasicDataType[];
  setBasicData: any;
  allData: AllDataType[];
  setAllData: any;
}

const AddBuilding = ({
  basicData,
  setBasicData,
  allData,
  setAllData,
}: propType) => {
  const [form] = Form.useForm();
  const key =
    basicData.length > 0 ? basicData[basicData.length - 1]?.key + 1 : 0;

  const saveAndExitButton = () => {
    const data = form.getFieldsValue();

    const newData = [
      ...basicData,
      {
        key: key,
        name: data.name,
        owner: data.owner,
        address: data.address,
        occupiedAreas: 0,
        freeAreas: 0,
        inaccessibleAreas: 0,
        occupancy: 0,
      },
    ];
    setBasicData(newData);

    setAllData([...allData, data]);
    window.localStorage.setItem("basicData", JSON.stringify(newData));
    window.localStorage.setItem("allData", JSON.stringify([...allData, data]));
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
        <Building basicData={basicData} allData={allData} form={form} />
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
