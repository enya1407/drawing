import React from "react";
import FloorPlans from "./FloorPlans/FloorPlans";
import Squares from "./Squares/Squares";
import BlocksAndFloors from "./BlocksAndFloors/BlocksAndFloors";
import Building from "./Building/Building";
import style from "./CardBuilding.module.css";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const CardBuilding = () => {
  return (
    <React.Fragment>
      <h2>1001 Здание</h2>
      <p>Минск, Ленина 35а</p>
      <Tabs defaultActiveKey="1" className={style.tabsContainer}>
        <TabPane tab="Building" key="1">
          <Building />
        </TabPane>
        <TabPane tab="BlocksAndFloors" key="2">
          <BlocksAndFloors />
        </TabPane>
        <TabPane tab="Squares" key="3">
          <Squares />
        </TabPane>
        <TabPane tab="FloorPlans" key="4">
          <FloorPlans />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default CardBuilding;
