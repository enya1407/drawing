import React, { useEffect, useState } from "react";

import FloorPlans from "./FloorPlans/FloorPlans";
import Squares from "./Squares/Squares";
import BlocksAndFloors from "./BlocksAndFloors/BlocksAndFloors";
import Building from "./Building/Building";
import style from "./CardBuilding.module.css";
import { Button, Tabs, Form } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AllDataType, BasicDataType, squareStatusType } from "../type";
import { log } from "util";

const { TabPane } = Tabs;

interface propType {
  basicData: BasicDataType[];
  setBasicData: any;
  allData: AllDataType[];
  setAllData: any;
}

const CardBuilding = ({
  basicData,
  setBasicData,
  allData,
  setAllData,
}: propType) => {
  const location = useLocation();
  const id = location.pathname.slice(16);

  const [activeTab, setActiveTab] = useState<string>("1");
  const [squareStatus, setSquareStatus] = useState<squareStatusType>({
    occupiedAreas: 0,
    freeAreas: 0,
    inaccessibleAreas: 0,
  });
  const [form] = Form.useForm();
  console.log("allData", allData);
  useEffect(() => {
    form.setFieldsValue((allData: AllDataType[]) => allData[Number(id)]);
  }, []);

  const saveAndExitButton = () => {
    const data = form.getFieldsValue();

    const newDataArr = [...basicData];
    const newData = {
      ...basicData[Number(id)],
      name: data.name,
      owner: data.owner,
      address: data.address,
      occupiedAreas: squareStatus.occupiedAreas,
      freeAreas: squareStatus.freeAreas,
      inaccessibleAreas: squareStatus.inaccessibleAreas,
      occupancy: 0,
    };
    newDataArr[Number(id)] = newData;
    setBasicData(newDataArr);

    const newAllArr = [...allData];
    newAllArr[Number(id)] = data;

    setAllData(newAllArr);
    window.localStorage.setItem("basicData", JSON.stringify(newDataArr));
    window.localStorage.setItem("allData", JSON.stringify(newAllArr));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.tabsContainer}>
        <h2>{basicData[Number(id)] && basicData[Number(id)].name}</h2>
        <p>{basicData[Number(id)] && basicData[Number(id)].address}</p>

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
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={(key: string) => setActiveTab(key)}
          >
            <TabPane tab="Здания" key="1">
              <Building
                basicData={basicData}
                allData={allData}
                form={form}
                id={Number(id)}
              />
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
              onClick={saveAndExitButton}
            >
              Сохранить
            </Button>
            <Link to="/">
              <Button
                onClick={saveAndExitButton}
                htmlType={"submit"}
                type="primary"
                className={style.button}
              >
                Сохранить и выйти
              </Button>
            </Link>
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
