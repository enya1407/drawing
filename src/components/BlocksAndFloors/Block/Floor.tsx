import React, { useState } from "react";
import { Button, Input, Menu, Popover, Form } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import style from "./Floor.module.css";

interface EnteredInputType {
  floorNumber: string;
  initialCost: string;
}
interface FloorsType {
  id: number;
  floorNumber: string | null;
  initialCost: string | null;
}
interface BlockType {
  id: number;
  name: string | null;
  floors: FloorsType[] | [];
}
interface PropType {
  el: FloorsType;
  blockIndex: number;
  floorIndex: number;
  block: BlockType[];
  setBlock: any;
}
const Floor = ({ el, blockIndex, floorIndex, block, setBlock }: PropType) => {
  const [enteredInput, setEnteredInput] = useState<EnteredInputType>({
    floorNumber: "",
    initialCost: "",
  });
  const [editMode, setEditMode] = useState<boolean>(true);

  const enteredInputHandler = (e: any, input: string) => {
    // input === "floorNumber"
    //   ? setEnteredInput({ ...enteredInput, floorNumber: e.target.value })
    //   : setEnteredInput({ ...enteredInput, initialCost: e.target.value });
  };

  const saveChangesHandler = () => {
    if (
      enteredInput.initialCost.trim().length > 0 &&
      enteredInput.floorNumber.trim().length > 0
    ) {
      const newFloorData = {
        ...block[blockIndex].floors[floorIndex],
        floorNumber: enteredInput.floorNumber,
        initialCost: enteredInput.initialCost,
      };
      const newFloorsArr = [...block[blockIndex].floors];
      newFloorsArr[floorIndex] = newFloorData;
      const newBlockObj = { ...block[blockIndex], floors: newFloorsArr };
      const newBlockArr = [...block];
      newBlockArr[blockIndex] = newBlockObj;
      setBlock(newBlockArr);
      setEditMode(false);
      setEnteredInput({
        floorNumber: "",
        initialCost: "",
      });
    }
  };

  const removeChangesHandler = () => {
    setEnteredInput({ floorNumber: "", initialCost: "" });
    setEditMode(false);
  };

  const floorNumber = () =>
    editMode ? (
      <>
        {/*<Form.Item className={style.inputContainer}>*/}
        <Input
          placeholder="Введите номер этажа"
          className={style.input}
          onChange={(e) => {
            enteredInputHandler(e, "floorNumber");
          }}
          required={true}
        />
        <Input
          placeholder="Введите первоначальную стоимость"
          className={style.input}
          onChange={(e) => {
            enteredInputHandler(e, "initialCost");
          }}
          required={true}
        />
        {/*</Form.Item>*/}
        <Button
          htmlType="submit"
          type="primary"
          className={style.button}
          onClick={saveChangesHandler}
        >
          Сохранить
        </Button>
        <Button
          type="primary"
          className={style.button}
          onClick={removeChangesHandler}
        >
          Удалить
        </Button>
      </>
    ) : (
      <div className={style.inputContainer}>
        <span className={style.input}>
          {block[blockIndex].floors[floorIndex].floorNumber}
        </span>
        <span className={style.input}>
          {block[blockIndex].floors[floorIndex].initialCost} /м2 мес{" "}
        </span>
      </div>
    );

  const changeButtonHandler = () => {
    setEditMode(true);
  };

  const deleteButtonHandler = () => {
    const newFloorsArr = block[blockIndex].floors.filter(
      (el, i) => i !== floorIndex
    );
    const newBlockObj = { ...block[blockIndex], floors: newFloorsArr };
    const newBlockArr = [...block];
    newBlockArr[blockIndex] = newBlockObj;
    setBlock(newBlockArr);
    setEditMode(true);
  };

  const popoverContent = editMode ? (
    <div className={style.editing} onClick={deleteButtonHandler}>
      Удалить
    </div>
  ) : (
    <div>
      <div className={style.editing} onClick={changeButtonHandler}>
        Изменить
      </div>
      <div className={style.editing} onClick={deleteButtonHandler}>
        Удалить
      </div>
    </div>
  );

  console.log("floor render");

  return (
    // <Menu.Item
    //   key={el.id}
    //   icon={
    //     <Popover content={popoverContent}>
    //       <MenuUnfoldOutlined />
    //     </Popover>
    //   }
    //   className={
    //     editMode
    //       ? style.menuItem
    //       : `${style.menuItemEditMode} ${style.menuItem}`
    //   }
    // >
    // </Menu.Item>
    <>{floorNumber()}</>
  );
};
export default Floor;
