import React, { useState } from "react";
import { Button, Input, Menu, Popover } from "antd";
import style from "./BlocksAndFloors.module.css";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import Floor from "./Block/Floor";

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
  floors: FloorsType[] | [];
}
const BlocksAndFloors = () => {
  const [block, setBlock] = useState<BlockType[] | []>([]);
  const [enteredInput, setEnteredInput] = useState<EnteredInputType>({
    floorNumber: null,
    initialCost: null,
  });
  const [editMode, setEditMode] = useState<boolean>(true);

  const addBlock = () => {
    if (block.length === 0) {
      setBlock([{ id: 0, floors: [] }]);
    } else {
      const newBlock: BlockType = {
        id: block[block.length - 1].id + 1,
        floors: [],
      };
      setBlock([...block, newBlock]);
    }
  };
  const addFloors = (indexEl: number) => {
    const indexlastFloor =
      block[indexEl].floors[block[indexEl].floors.length - 1]?.id;
    const newFloors: FloorsType =
      block[indexEl].floors.length > 0
        ? { id: indexlastFloor + 1, floorNumber: null, initialCost: null }
        : { id: 0, floorNumber: null, initialCost: null };
    const newFloorArr = [...block[indexEl].floors, newFloors];
    const newBlockObj = { ...block[indexEl], floors: newFloorArr };
    const newBlockArr = [...block];
    newBlockArr[indexEl] = newBlockObj;
    setBlock(newBlockArr);
  };
  const changeButtonHandler = () => {};
  const deleteButtonHandler = () => {
    // const newFloorsArr = block[blockIndex].floors.filter(
    //     (el, i) => i !== floorIndex
    // );
    // const newBlockObj = { ...block[blockIndex], floors: newFloorsArr };
    // const newBlockArr = [...block];
    // newBlockArr[blockIndex] = newBlockObj;
    // setBlock(newBlockArr);
  };

  const changeBlocs =
    block.length === 1 ? (
      <div onClick={changeButtonHandler}>Изменить</div>
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

  const blockNumber = () => {
    if (editMode && block.length > 0) {
      return (
        <form className={style.inputContainer}>
          {" "}
          <Input
            placeholder="Введите номер блока"
            className={style.input}
            onChange={(e) => {
              // enteredInputHandler(e, "floorNumber");
            }}
            required={true}
          />
          <Button
            htmlType="submit"
            type="primary"
            className={style.button}
            // onClick={saveChangesHandler}
          >
            Сохранить
          </Button>
          <Button
            type="primary"
            className={style.button}
            // onClick={removeChangesHandler}
          >
            Удалить
          </Button>
        </form>
      );
    } else {
      return (
        block &&
        block.map((el: BlockType, blockIndex: number) => {
          return (
            <SubMenu
              key={`sub${el.id + 1}`}
              icon={
                <Popover content={changeBlocs}>
                  <MenuUnfoldOutlined />
                </Popover>
              }
              className={
                editMode
                  ? style.menuItem
                  : `${style.menuItemEditMode} ${style.menuItem}`
              }
              title={`Блок ${el.id + 1} `}
            >
              <Button
                type="primary"
                className={style.button2}
                onClick={() => addFloors(0)}
              >
                Добавить этаж
              </Button>

              {block[0].floors &&
                block[0].floors.map((el: FloorsType, floorIndex: number) => {
                  return (
                    <Floor
                      key={floorIndex}
                      el={el}
                      blockIndex={0}
                      floorIndex={floorIndex}
                      block={block}
                      setBlock={setBlock}
                    ></Floor>
                  );
                })}
            </SubMenu>
          );
        })
      );
    }
  };

  return (
    <div>
      <Button type="primary" className={style.button} onClick={addBlock}>
        Добавить блок
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        className={style.subMenu}
      >
        {blockNumber()}
      </Menu>
    </div>
  );
};

export default BlocksAndFloors;
