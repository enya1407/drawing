import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import style from "./CardBuilding.module.css";
import Building from "./Building/Building";
import { Link, useHistory, Prompt } from "react-router-dom";
import { AllDataType } from "../type";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useBeforeunload } from "react-beforeunload";

interface propType {
  allData: AllDataType[];
  setAllData: any;
}

const AddBuilding = ({ allData, setAllData }: propType) => {
  useBeforeunload(() =>
    isBlocking ? `Вы потеряете внесенные изменения, продолжить?` : false
  );

  const [form] = Form.useForm();
  const history = useHistory();

  const [isBlocking, setIsBlocking] = useState(false);

  const key = allData.length > 0 ? allData[allData.length - 1]?.key + 1 : 0;

  const saveAndExitButton = (route: string) => {
    const data = form.getFieldsValue();

    form.validateFields([[`name`], [`address`], [`owner`]]).then(() => {
      setAllData([
        ...allData,
        {
          key: key,
          squareStatus: {
            occupiedAreas: 0,
            freeAreas: 0,
            inaccessibleAreas: 0,
          },
          occupancy: 0,
          ...data,
        },
      ]);
      window.localStorage.setItem(
        "allData",
        JSON.stringify([
          ...allData,
          {
            key: key,
            squareStatus: {
              occupiedAreas: 0,
              freeAreas: 0,
              inaccessibleAreas: 0,
            },
            occupancy: 0,
            ...data,
          },
        ])
      );
      history.push(route);
      setIsBlocking(false);
    });
  };

  return (
    <div className={style.wrapper}>
      <h2>Добавление объекта</h2>
      <Form
        form={form}
        name="formAdd"
        onValuesChange={(changedValues, allValues) => {
          console.log("formAdd", allValues);
          setIsBlocking(true);
        }}
      >
        <Prompt
          when={isBlocking}
          message={() => `Вы потеряете внесенные изменения, продолжить?`}
        />
        <Building setIsBlocking={setIsBlocking} />
      </Form>

      <div className={`style.buttonWrapper`}>
        <Button
          type="primary"
          htmlType="submit"
          className={style.button}
          onClick={() => saveAndExitButton(`/card-building/:${key}`)}
        >
          Сохранить
        </Button>

        <Button
          onClick={() => saveAndExitButton("/")}
          type="primary"
          htmlType="submit"
          className={style.button}
        >
          Сохранить и выйти
        </Button>
        <Link to="/">
          <Button className={style.button}>Отмена</Button>
        </Link>
      </div>
    </div>
  );
};

export default AddBuilding;
