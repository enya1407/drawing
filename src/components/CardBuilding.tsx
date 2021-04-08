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
  data: any;
  setData: any;
}
const CardBuilding = ({ data, setData }: propType) => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [form] = Form.useForm();

  const saveAndExitButton = () => {
    const name = form.getFieldValue(`name`);
    const owner = form.getFieldValue(`owner`);
    const address = form.getFieldValue(`address`);
    const key = data.length > 0 ? data[data.lenght - 1]?.key + 1 : 0;
    const newData = [
      {
        key: key,
        name: name,
        owner: owner,
        address: address,
        occupiedAreas: null,
        freeAreas: null,
        occupancy: null,
      },
    ];
    setData(newData);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.tabsContainer}>
        <h2>{data[0] && data[0].name}</h2>
        <p>{data[0] && data[0].address}</p>

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
              <Building data={data} form={form} />
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
