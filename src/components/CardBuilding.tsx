import React, { useContext, useEffect, useState } from "react";

import AddingAreas from "./FloorPlans/AddingAreas";
import Squares from "./Squares/Squares";
import BlocksAndFloors from "./BlocksAndFloors/BlocksAndFloors";
import Building from "./Building/Building";
import style from "./CardBuilding.module.css";
import { Button, Tabs, Form, Modal } from "antd";
import { Link, useLocation, useHistory, Prompt } from "react-router-dom";
import { AllDataType, BlockType, squareStatusType } from "../type";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useBeforeunload } from "react-beforeunload";

const { TabPane } = Tabs;

interface propType {
  allData: AllDataType[];
  setAllData: any;
}

const CardBuilding = ({ allData, setAllData }: propType) => {
  useBeforeunload(() => {
    window.localStorage.setItem("activeTab", JSON.stringify(activeTab));
    if (isBlocking) {
      return `Вы потеряете внесенные изменения, продолжить?`;
    } else {
      return false;
    }
  });
  const location = useLocation();
  const id = location.pathname.slice(16);

  const [valueEnteredBlock, setValueEnteredBlock] = useState<BlockType>({
    savedField: [],
    floorsVisible: [],
  });
  const [activeTab, setActiveTab] = useState<string>("1");
  const [squareStatus, setSquareStatus] = useState<squareStatusType>({
    occupiedAreas: 0,
    freeAreas: 0,
    inaccessibleAreas: 0,
  });
  const [currentData, setCurrentData] = useState<any>(null);
  const [isBlocking, setIsBlocking] = useState(false);
  const [form] = Form.useForm();
  let history = useHistory();

  useEffect(() => {
    const tab = window.localStorage.getItem("activeTab");
    tab && setActiveTab(JSON.parse(tab));

    allData.forEach((el) => {
      if (el.key === Number(id)) {
        const {
          key,
          squareStatus,
          occupancy,
          valueEnteredBlock,
          ...formData
        } = el;
        formData && setCurrentData(formData);
        valueEnteredBlock && setValueEnteredBlock(valueEnteredBlock);
        squareStatus && setSquareStatus(squareStatus);
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
            valueEnteredBlock: valueEnteredBlock,
            ...{ ...currentData, ...data },
          };
        }
      });

      setAllData(newDataArr);
      setIsBlocking(false);
      window.localStorage.setItem("allData", JSON.stringify(newDataArr));
      route && history.push(route);
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
              <BlocksAndFloors
                form={form}
                currentData={currentData}
                valueEnteredBlock={valueEnteredBlock}
                setValueEnteredBlock={setValueEnteredBlock}
              />
            </TabPane>
            <TabPane tab="Площади" key="3">
              <Squares
                form={form}
                currentData={currentData}
                squareStatus={squareStatus}
                setSquareStatus={setSquareStatus}
              />
            </TabPane>
            <TabPane tab="Планы этажей" key="4">
              <AddingAreas />
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
