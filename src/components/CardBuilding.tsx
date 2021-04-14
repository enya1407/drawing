import React, { useEffect, useState } from "react";

import FloorPlans from "./FloorPlans/FloorPlans";
import Squares from "./Squares/Squares";
import BlocksAndFloors from "./BlocksAndFloors/BlocksAndFloors";
import Building from "./Building/Building";
import style from "./CardBuilding.module.css";
import { Button, Tabs, Form, Modal } from "antd";
import { Link, useLocation, useHistory, Prompt } from "react-router-dom";
import { AllDataType, squareStatusType } from "../type";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useBeforeunload } from "react-beforeunload";

const { TabPane } = Tabs;

interface propType {
  allData: AllDataType[];
  setAllData: any;
}

const CardBuilding = ({ allData, setAllData }: propType) => {
  useBeforeunload(() =>
    isBlocking ? `Вы потеряете внесенные изменения, продолжить?` : false
  );
  const location = useLocation();
  const id = location.pathname.slice(16);

  const [activeTab, setActiveTab] = useState<string>("1");
  const [squareStatus, setSquareStatus] = useState<squareStatusType>({
    occupiedAreas: 0,
    freeAreas: 0,
    inaccessibleAreas: 0,
  });
  const [currentData, setCurrentData] = useState<any | null>(null);
  const [isBlocking, setIsBlocking] = useState(false);
  const [form] = Form.useForm();
  let history = useHistory();

  useEffect(() => {
    allData.forEach((el) => {
      console.log("el", el.key, Number(id));
      if (el.key === Number(id)) {
        const { key, squareStatus, occupancy, ...formData } = el;
        setCurrentData(formData);
        form.setFieldsValue(formData);
      }
    });
  }, []);

  const saveAndExitButton = (route: string) => {
    const data = form.getFieldsValue();
    const totalArea =
      squareStatus.occupiedAreas +
      squareStatus.inaccessibleAreas +
      squareStatus.freeAreas;
    const totalOccupiedArea =
      squareStatus.occupiedAreas + squareStatus.inaccessibleAreas;
    const occupancy =
      totalArea && ((totalOccupiedArea * 100) / totalArea).toFixed(2);

    form.validateFields([[`name`], [`address`], [`owner`]]).then(() => {
      const newDataArr = [...allData];
      newDataArr.filter((el, i) => {
        if (el.key === Number(id)) {
          newDataArr[i] = {
            key: Number(id),
            squareStatus: squareStatus,
            occupancy: `${occupancy} %`,
            ...data,
          };
          console.log("data", data, newDataArr);
        }
      });

      setAllData(newDataArr);
      window.localStorage.setItem("allData", JSON.stringify(newDataArr));

      route && history.push(route);
      setIsBlocking(false);
    });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.tabsContainer}>
        <h2>{currentData && currentData.name}</h2>
        <p>{currentData && currentData.address}</p>

        <Form
          form={form}
          name="form"
          // onFieldsChange={(changedFields, allFields) => {
          //   console.log("fields", changedFields, allFields);
          // }}
          onFinishFailed={(info) => {
            console.log("finish failed", info);
          }}
          onFinish={(info) => {
            console.log("finish", info);
          }}
          onValuesChange={(changedValues, allValues) => {
            console.log("form", allValues);
            setIsBlocking(true);
          }}
        >
          <Prompt
            when={isBlocking}
            message={() => `Вы потеряете внесенные изменения, продолжить?`}
          />
          <Tabs
            activeKey={activeTab}
            onChange={(key: string) => setActiveTab(key)}
          >
            <TabPane tab="Здания" key="1">
              <Building setIsBlocking={setIsBlocking} />
            </TabPane>
            <TabPane tab="Блоки и этажи" key="2">
              <BlocksAndFloors form={form} />
            </TabPane>
            <TabPane tab="Площади" key="3">
              <Squares
                form={form}
                squareStatus={squareStatus}
                setSquareStatus={setSquareStatus}
              />
            </TabPane>
            <TabPane tab="Планы этажей" key="4">
              <FloorPlans />
            </TabPane>
          </Tabs>
          <div className={`style.buttonWrapper`}>
            <Button
              type="primary"
              className={style.button}
              onClick={() => saveAndExitButton("")}
            >
              Сохранить
            </Button>

            <Button
              onClick={() => saveAndExitButton("/")}
              htmlType={"submit"}
              type="primary"
              className={style.button}
            >
              Сохранить и выйти
            </Button>
            <Link to="/">
              <Button className={style.button}>Отмена</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CardBuilding;
