import React from "react";
import { Button, Menu, Popover } from "antd";
import style from "../BlocksAndFloors/BlocksAndFloors.module.css";
import SubMenu from "antd/es/menu/SubMenu";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Floor from "../BlocksAndFloors/Block/Floor";

const Squares = () => {
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      className={style.subMenu}
    >
      <SubMenu title="блок1 этаж1">
        <Menu.Item
          icon={
            <Popover>
              <MenuUnfoldOutlined />
            </Popover>
          }
        >
          инфа
        </Menu.Item>
        <Menu.Item
          icon={
            <Popover>
              <MenuUnfoldOutlined />
            </Popover>
          }
        >
          инфа
        </Menu.Item>
      </SubMenu>
      <SubMenu title="блок1 этаж2">
        <Menu.Item
          icon={
            <Popover>
              <MenuUnfoldOutlined />
            </Popover>
          }
        >
          инфа
        </Menu.Item>
        <Menu.Item
          icon={
            <Popover>
              <MenuUnfoldOutlined />
            </Popover>
          }
        >
          инфа
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Squares;
