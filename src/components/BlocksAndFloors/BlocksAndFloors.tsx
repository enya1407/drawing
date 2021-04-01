import React, { useState } from "react";
import { Button, Form, Input, Menu, Popover, Space } from "antd";
import style from "./BlocksAndFloors.module.css";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import Floor from "./Block/Floor";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface FloorsType {
  id: number;
  floorNumber: string | null;
  initialCost: string | null;
}
interface BlockType {
  id: number;
  name: string | null;
  floors: FloorsType[];
}

const BlocksAndFloors = () => {
  const [block, setBlock] = useState<BlockType[]>([]);
  const [enteredInput, setEnteredInput] = useState<string>("");
  const [valueEntered, setValueEntered] = useState<number[]>([]);

  const addBlock = (key: number, add: any) => {
    // if (block.length === 0) {
    //   setBlock([{ id: 0, name: null, floors: [] }]);
    //   setEditMode([true]);
    // } else {
    //   const newBlock: BlockType = {
    //     id: block[block.length - 1].id + 1,
    //     name: null,
    //     floors: [],
    //   };
    //   setBlock([...block, newBlock]);
    //   setEditMode([...editMode, true]);
    // }
  };

  const addFloors = (blockIndex: number) => {
    const idLastFloor =
      block[blockIndex].floors[block[blockIndex].floors.length - 1]?.id;
    const newFloors: FloorsType =
      block[blockIndex].floors.length > 0
        ? { id: idLastFloor + 1, floorNumber: null, initialCost: null }
        : { id: 0, floorNumber: null, initialCost: null };
    const newFloorArr = [...block[blockIndex].floors, newFloors];
    const newBlockObj = { ...block[blockIndex], floors: newFloorArr };
    const newBlockArr = [...block];
    newBlockArr[blockIndex] = newBlockObj;
    setBlock(newBlockArr);
  };

  const saveChangesHandler = (key: number) => {
    // if (enteredInput.trim().length > 0) {
    //   const newBlockObj = { ...block[blockIndex], name: enteredInput };
    //   const newBlockArr = [...block];
    //   newBlockArr[blockIndex] = newBlockObj;
    //   setBlock(newBlockArr);
    //   const newArr = [...editMode];
    //   newArr[blockIndex] = false;
    //   setEditMode(newArr);
    //   setEnteredInput("");
    // }

    setValueEntered([...valueEntered, key]);
  };
  console.log(valueEntered);

  const removeChangesHandler = (key: number) => {
    // const newArr = [...editMode];
    // newArr[blockIndex] = true;
    // setEditMode(newArr);
    // setEnteredInput("");
    setValueEntered([...valueEntered, key]);
  };

  const blockNumber = (blockIndex: number) => (
    <div className={style.inputContainer}>
      <Form.Item name={`block ${blockIndex + 1}`}>
        {valueEntered[blockIndex] ? (
          <Input
            placeholder="Введите номер блока"
            required={true}
            className={style.input}
            onChange={(e) => {
              setEnteredInput(e.target.value);
            }}
          />
        ) : (
          <Input className={style.input} readOnly={true} bordered={false} />
        )}
      </Form.Item>
      {valueEntered[blockIndex] && (
        <>
          <Button
            type="primary"
            className={style.button}
            // onClick={() => saveChangesHandler(blockIndex)}
          >
            Сохранить
          </Button>
          <Button
            type="primary"
            className={style.button}
            // onClick={() => removeChangesHandler(blockIndex)}
          >
            Удалить
          </Button>
        </>
      )}
    </div>
  );

  const changeButtonHandler = (key: number) => {
    // const newArr = [...editMode];
    // newArr[blockIndex] = true;
    const newArr = valueEntered.filter((el) => el !== key);
    setValueEntered([...newArr]);
  };

  const deleteButtonHandler = (key: number, remove: any) => {
    console.log("key", key);
    remove(key);

    const newArr = valueEntered.filter((el) => el !== key);
    setValueEntered([...newArr]);

    // const newBlockArr = block.filter((el, i) => i !== blockIndex);
    //     // setBlock(newBlockArr);
    //     // const newArr = valueEntered.filter((el, i) => i !== blockIndex);
    //     // setValueEntered(newArr);
  };

  const popoverContent = (key: number, remove: any) =>
    !valueEntered.includes(key) ? (
      <div onClick={() => deleteButtonHandler(key, remove)}>Удалить</div>
    ) : (
      <div>
        <div className={style.editing} onClick={() => changeButtonHandler(key)}>
          Изменить
        </div>
        <div
          className={style.editing}
          onClick={() => deleteButtonHandler(key, remove)}
        >
          Удалить
        </div>
      </div>
    );

  return (
    <Form.List name="blocks">
      {(fields, { add, remove }) => (
        <>
          <Form.Item>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Добавить блок
            </Button>
          </Form.Item>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space
              key={key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Popover
                content={() => popoverContent(fieldKey, remove)}
                trigger="click"
              >
                <MenuUnfoldOutlined />
              </Popover>
              <Form.Item
                {...restField}
                name={[name, `блок ${fieldKey + 1}`]}
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                {console.log(fields)}
                {!valueEntered.includes(fieldKey) ? (
                  <Input placeholder="Введите номер блока" required={true} />
                ) : (
                  <Input
                    className={style.input}
                    readOnly={true}
                    bordered={false}
                  />
                )}
              </Form.Item>
              {!valueEntered.includes(fieldKey) && (
                <Button
                  type="primary"
                  className={style.button}
                  onClick={() => saveChangesHandler(fieldKey)}
                >
                  Сохранить
                </Button>
              )}
            </Space>
          ))}
        </>
      )}
    </Form.List>
    // <div>
    //   <Button type="primary" className={style.button} onClick={addBlock}>
    //     Добавить блок
    //   </Button>
    //   <div>
    //     {block.length > 0 &&
    //       block.map((el: BlockType, blockIndex: number) => {
    //         return (
    //           <div
    //             key={`sub${el.id + 1}`}
    //             // icon={
    //             //   <Popover content={() => popoverContent(blockIndex)}>
    //             //     <MenuUnfoldOutlined />
    //             //   </Popover>
    //             // }
    //             // title={}
    //             className={style.subMenu}
    //           >
    //             {blockNumber(blockIndex)}
    //             {!editMode[blockIndex] && (
    //               <Button
    //                 type="primary"
    //                 className={style.button2}
    //                 onClick={() => addFloors(blockIndex)}
    //               >
    //                 Добавить этаж
    //               </Button>
    //             )}
    //             {block[blockIndex].floors?.map(
    //               (el: FloorsType, floorIndex: number) => {
    //                 return (
    //                   <Floor
    //                     key={floorIndex}
    //                     el={el}
    //                     blockIndex={blockIndex}
    //                     floorIndex={floorIndex}
    //                     block={block}
    //                     setBlock={setBlock}
    //                   />
    //                 );
    //               }
    //             )}
    //           </div>
    //         );
    //       })}
    //   </div>
    // </div>
  );
};

export default BlocksAndFloors;
