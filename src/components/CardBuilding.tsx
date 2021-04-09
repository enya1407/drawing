import React, { useState } from "react";

import FloorPlans from "./FloorPlans/FloorPlans";
import Squares from "./Squares/Squares";
import BlocksAndFloors from "./BlocksAndFloors/BlocksAndFloors";
import Building from "./Building/Building";
import style from "./CardBuilding.module.css";
import { Button, Tabs, Form } from "antd";
import { Link, useLocation } from "react-router-dom";
import {SquareStatus} from "../type";

const { TabPane } = Tabs;

interface propType {
  data: any;
  setData: any;
}

const CardBuilding = ({ data, setData }: propType) => {
  const location = useLocation();
  const id = location.pathname.slice(16);

  const [activeTab, setActiveTab] = useState<string>("1");
  const [form] = Form.useForm();

  const saveAndExitButton = () => {
    const name = form.getFieldValue(`name`);
    const owner = form.getFieldValue(`owner`);
    const address = form.getFieldValue(`address`);



    const newDataArr = [...data];
    const newData = {
      ...data[id],
      name: name,
      owner: owner,
      address: address,
      occupiedAreas: null,
      freeAreas: null,
      occupancy: null,
      squareStatus:SquareStatus.free
    };
    newDataArr[Number(id)] = newData;
    setData(newDataArr);
  };

  return (
      <div className={style.wrapper}>
        <div className={style.tabsContainer}>
          <h2>{data[id] && data[id].name}</h2>
          <p>{data[id] && data[id].address}</p>

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
                <Building data={data} form={form} id={Number(id)} />
              </TabPane>
              <TabPane tab="Блоки и этажи" key="2">
                <BlocksAndFloors form={form} />
              </TabPane>
              <TabPane tab="Площади" key="3">
                <Squares form={form} />
              </TabPane>
              <TabPane tab="Планы этажей" key="4">
                <FloorPlans />
              </TabPane>
            </Tabs>
            <div className={`style.buttonWrapper`}>
              <Button
                  type="primary"
                  htmlType="submit"
                  className={style.button}
                  onClick={saveAndExitButton}
              >
                Сохранить
              </Button>
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
          </Form>
        </div>
      </div>
  );
};

export default CardBuilding;
