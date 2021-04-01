import React from "react";
import FloorPlans from "./FloorPlans/FloorPlans";
import Squares from "./Squares/Squares";
import BlocksAndFloors from "./BlocksAndFloors/BlocksAndFloors";
import Building from "./Building/Building";
import style from "./CardBuilding.module.css";
import { Button, Tabs, Form } from "antd";
const { TabPane } = Tabs;

const CardBuilding = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.tabsContainer}>
        <h2>1001 Здание</h2>
        <p>Минск, Ленина 35а</p>

        <Form
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
            console.log("values", changedValues, allValues);
          }}
        >
          <Tabs defaultActiveKey="2">
            <TabPane tab="Здания" key="1">
              <Building />
            </TabPane>
            <TabPane tab="Блоки и этажи" key="2">
              <BlocksAndFloors />
            </TabPane>
            <TabPane tab="Площади" key="3">
              <Squares />
            </TabPane>
            <TabPane tab="Планы этажей" key="4">
              <FloorPlans />
            </TabPane>
          </Tabs>
          <div className={`style.buttonWrapper`}>
            <Button type="primary" htmlType="submit" className={style.button}>
              Сохранить
            </Button>
            <Button type="primary" htmlType="submit" className={style.button}>
              Сохранить и выйти
            </Button>
            <Button className={style.button}>Отмена</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CardBuilding;
