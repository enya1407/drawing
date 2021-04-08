import React, { useState } from "react";
import FloorPlans from "./FloorPlans/FloorPlans";
import Squares from "./Squares/Squares";
import BlocksAndFloors from "./BlocksAndFloors/BlocksAndFloors";
import Building from "./Building/Building";
import style from "./CardBuilding.module.css";
import { Button, Tabs, Form } from "antd";
import { Link } from "react-router-dom";
const { TabPane } = Tabs;

interface propType {
  setData: any;
}
const CardBuilding = ({ setData }: propType) => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [form] = Form.useForm();

  return (
    <div className={style.wrapper}>
      <div className={style.tabsContainer}>
        <h2>1001 Здание</h2>
        <p>Минск, Ленина 35а</p>

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
            console.log("values", allValues);
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={(key: string) => setActiveTab(key)}
          >
            <TabPane tab="Здания" key="1">
              <Building />
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
        </Form>
      </div>
    </div>
  );
};

export default CardBuilding;
