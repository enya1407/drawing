import React, { useState } from "react";
import { Button, Input, Menu, Popover } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import style from "./Floor.module.css";

interface EnteredInputType {
  floorNumber: string | null;
  initialCost: string | null;
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
    floorNumber: null,
    initialCost: null,
  });
  const [editMode, setEditMode] = useState<boolean>(true);

  const enteredInputHandler = (e: any, input: string) => {
    input === "floorNumber"
      ? setEnteredInput({ ...enteredInput, floorNumber: e.target.value })
      : setEnteredInput({ ...enteredInput, initialCost: e.target.value });
  };
  const saveChangesHandler = () => {
    if (
      enteredInput.initialCost !== null &&
      enteredInput.floorNumber !== null
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
    }
  };
  const removeChangesHandler = () => {
    setEnteredInput({ floorNumber: null, initialCost: null });
    setEditMode(false);
  };
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
  console.log(editMode);
  const changeFloors = editMode ? (
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

  // const changeFloorNumber =(i)=>{
  //   setBlock(newBlockArr);
  // }

  const floorNumber = () =>
    editMode ? (
      <form className={style.inputContainer}>
        {" "}
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
      </form>
    ) : (
      <div className={style.inputContainer}>
        {" "}
        <span className={style.input}>
          {block[blockIndex].floors[floorIndex].floorNumber}
        </span>
        <span className={style.input}>
          {block[blockIndex].floors[floorIndex].initialCost} /м2 мес{" "}
        </span>
      </div>
    );

  return (
    <Menu.Item
      key={el.id}
      icon={
        <Popover content={changeFloors}>
          <MenuUnfoldOutlined />
        </Popover>
      }
      className={
        editMode
          ? style.menuItem
          : `${style.menuItemEditMode} ${style.menuItem}`
      }
    >
      {floorNumber()}
    </Menu.Item>
  );
};
export default Floor;
