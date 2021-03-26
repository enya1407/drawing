import React, { useState } from "react";
import { Button, Input, Menu, Popover } from "antd";
import style from "./BlocksAndFloors.module.css";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import { log } from "util";
import Item from "antd/es/list/Item";

interface FloorsType {
  id: number;
  number: number | null;
}
interface BlockType {
  id: number;
  floors: FloorsType[] | [];
}
const BlocksAndFloors = () => {
  const [block, setBlock] = useState<BlockType[]>([{ id: 0, floors: [] }]);

  const addBlock = () => {
    const newBlock: BlockType = {
      id: block[block.length - 1].id + 1,
      floors: [],
    };
    setBlock([...block, newBlock]);
  };

  const addFloors = (indexEl: number) => {
    const indexlastFloor =
      block[indexEl].floors[block[indexEl].floors.length - 1]?.id;
    const newFloors: FloorsType =
      block[indexEl].floors.length > 0
        ? { id: indexlastFloor + 1, number: null }
        : { id: 0, number: null };
    const newFloorArr = [...block[indexEl].floors, newFloors];
    const newBlockObj = { ...block[indexEl], floors: newFloorArr };
    const newBlockArr = [
      ...block.filter((el, i) => i !== indexEl),
      newBlockObj,
    ];
    setBlock(newBlockArr);
  };

  const content =
    block.length === 1 ? (
      <div>Изменить</div>
    ) : (
      <div>
        <div>Изменить</div>
        <div>Удалить</div>
      </div>
    );

  const change = (
    <Popover content={content} trigger="click">
      <MenuUnfoldOutlined />
    </Popover>
  );

  // const changeFloorNumber =(i)=>{
  //   setBlock(newBlockArr);
  // }
  // const floorNumber = (i: number) =>
  //   block[i].floors?.number === null ? (
  //     <Input placeholder="Basic usage" onChange={(i)=>changeFloorNumber(i)} />
  //   ) : (
  //     "Блок"
  //   );
  // block[i].floors.number === null ? (
  //   <Input placeholder="Basic usage" />
  // ) : (
  //   <p>`Блок ${block[i].floors.number}`</p>
  // );

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
        {block &&
          block.map((el: BlockType, i: number) => {
            return (
              <SubMenu
                key={`sub${el.id + 1}`}
                icon={change}
                title={`Блок ${el.id + 1} `}
              >
                <Button
                  type="primary"
                  className={style.button2}
                  onClick={() => addFloors(i)}
                >
                  Добавить этаж
                </Button>
                {block[i].floors &&
                  block[i].floors.map((el: FloorsType) => {
                    return (
                      <Menu.Item key={el.id} icon={change}>
                        {/*{floorNumber(i)}*/}
                      </Menu.Item>
                    );
                  })}
              </SubMenu>
            );
          })}
      </Menu>
    </div>
  );
};

export default BlocksAndFloors;
