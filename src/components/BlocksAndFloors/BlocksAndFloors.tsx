import React, { useState } from "react";
import { Button, Input, Menu, Popover } from "antd";
import style from "./BlocksAndFloors.module.css";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import Floor from "./Block/Floor";

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

const BlocksAndFloors = () => {
  const [block, setBlock] = useState<BlockType[] | []>([]);
  const [enteredInput, setEnteredInput] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean[] | []>([]);

  const addBlock = () => {
    if (block.length === 0) {
      setBlock([{ id: 0, name: null, floors: [] }]);
      setEditMode([true]);
    } else {
      const newBlock: BlockType = {
        id: block[block.length - 1].id + 1,
        name: null,
        floors: [],
      };
      setBlock([...block, newBlock]);
      setEditMode([...editMode, true]);
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
  const changeButtonHandler = (blockIndex: number) => {
    const newArr = [...editMode];
    newArr[blockIndex] = true;
    setEditMode(newArr);
  };
  const removeChangesHandler = (blockIndex: number) => {
    const newArr = [...editMode];
    newArr[blockIndex] = true;
    setEditMode(newArr);
    setEnteredInput("");
  };
  const deleteButtonHandler = (blockIndex: number) => {
    const newBlockArr = block.filter((el, i) => i !== blockIndex);
    setBlock(newBlockArr);
    const newArr = editMode.filter((el, i) => i !== blockIndex);
    setEditMode(newArr);
  };

  const saveChangesHandler = (blockIndex: number) => {
    if (enteredInput.length > 0) {
      const newBlockObj = { ...block[blockIndex], name: enteredInput };
      const newBlockArr = [...block];
      newBlockArr[blockIndex] = newBlockObj;
      setBlock(newBlockArr);
      const newArr = [...editMode];
      newArr[blockIndex] = false;
      setEditMode(newArr);
    }
  };
  const blockNumber = (blockIndex: number) =>
    editMode[blockIndex] ? (
      <form className={style.inputContainer}>
        {" "}
        <Input
          placeholder="Введите номер блока"
          className={style.input}
          onChange={(e) => {
            setEnteredInput(e.target.value);
          }}
          required={true}
        />
        <Button
          htmlType="submit"
          type="primary"
          className={style.button}
          onClick={() => saveChangesHandler(blockIndex)}
        >
          Сохранить
        </Button>
        <Button
          type="primary"
          className={style.button}
          onClick={() => removeChangesHandler(blockIndex)}
        >
          Удалить
        </Button>
      </form>
    ) : (
      <div className={style.inputContainer}>
        {/*{" "}*/}
        <span className={style.input}>{block[blockIndex].name} </span>
      </div>
    );

  const changeBlocks = (blockIndex: number) =>
    block.length === 1 ? (
      <div onClick={() => changeButtonHandler(blockIndex)}>Изменить</div>
    ) : (
      <div>
        <div
          className={style.editing}
          onClick={() => changeButtonHandler(blockIndex)}
        >
          Изменить
        </div>
        <div
          className={style.editing}
          onClick={() => deleteButtonHandler(blockIndex)}
        >
          Удалить
        </div>
      </div>
    );

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
        {block.length > 0 &&
          block.map((el: BlockType, blockIndex: number) => {
            return (
              <SubMenu
                key={`sub${el.id + 1}`}
                icon={
                  <Popover content={() => changeBlocks(blockIndex)}>
                    <MenuUnfoldOutlined />
                  </Popover>
                }
                className={style.subMenu}
                title={blockNumber(blockIndex)}
              >
                {!editMode[blockIndex] && (
                  <Button
                    type="primary"
                    className={style.button2}
                    onClick={() => addFloors(blockIndex)}
                  >
                    Добавить этаж
                  </Button>
                )}
                {block[blockIndex].floors &&
                  block[blockIndex].floors.map(
                    (el: FloorsType, floorIndex: number) => {
                      return (
                        <Floor
                          key={floorIndex}
                          el={el}
                          blockIndex={blockIndex}
                          floorIndex={floorIndex}
                          block={block}
                          setBlock={setBlock}
                        ></Floor>
                      );
                    }
                  )}
              </SubMenu>
            );
          })}
      </Menu>
    </div>
  );
};

export default BlocksAndFloors;
