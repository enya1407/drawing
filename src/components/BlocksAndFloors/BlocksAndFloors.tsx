import React, { useEffect, useState } from "react";
import { Button, Form, Input, Menu, Popover, Space } from "antd";
import style from "./BlocksAndFloors.module.css";
import { MenuUnfoldOutlined, UpOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import Floor from "./Block/Floor";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";

interface BlockType {
  savedField: number[];
  floorsVisible: number[];
}
interface PropType {
  form: any;
  currentData: any;
  valueEnteredBlock: BlockType;
  setValueEnteredBlock: any;
}
const BlocksAndFloors = ({
  form,
  currentData,
  valueEnteredBlock,
  setValueEnteredBlock,
}: PropType) => {
  // useEffect(() => {
  //   const data = form.getFieldsValue([`blocks`, name, `block`]);
  // }, []);
  const addBlock = (add: any, fields: any) => {
    const amountElements = fields?.length;

    add();

    setValueEnteredBlock({
      ...valueEnteredBlock,
      floorsVisible: [...valueEnteredBlock.floorsVisible, amountElements],
    });
  };

  const addFloor = (add: any, name: any) => {
    add();

    setValueEnteredBlock({
      ...valueEnteredBlock,
      floorsVisible: [...valueEnteredBlock.floorsVisible, name],
    });
  };

  const saveChangesHandler = (name: number) => {
    form.validateFields([[`blocks`, name, `block`]]).then(() => {
      const newSavedFieldArr = [...valueEnteredBlock.savedField, name];
      setValueEnteredBlock({
        ...valueEnteredBlock,
        savedField: newSavedFieldArr,
      });
    });
  };

  const changeButtonHandler = (name: number) => {
    const newSavedFieldArr = valueEnteredBlock.savedField.filter(
      (el) => el !== name
    );
    setValueEnteredBlock({
      ...valueEnteredBlock,
      savedField: newSavedFieldArr,
    });
  };

  const deleteButtonHandler = (name: any, remove: any) => {
    remove(name);

    const newSavedFieldArr = [
      ...valueEnteredBlock.savedField.filter((el) => el !== name),
    ];
    newSavedFieldArr.map((el: number, i: number) => {
      if (el > name) {
        newSavedFieldArr[i] = el - 1;
      }
    });

    const newFloorsVisibleArr = [
      ...valueEnteredBlock.floorsVisible.filter((el) => el !== name),
    ];
    newFloorsVisibleArr.map((el: number, i: number) => {
      if (el > name) {
        newFloorsVisibleArr[i] = el - 1;
      }
    });

    setValueEnteredBlock({
      savedField: newSavedFieldArr,
      floorsVisible: newFloorsVisibleArr,
    });
  };

  const popoverContent = (name: any, remove: any) => {
    return !valueEnteredBlock.savedField.includes(name) ? (
      <div
        className={style.editing}
        onClick={() => deleteButtonHandler(name, remove)}
      >
        ??????????????
      </div>
    ) : (
      <div>
        <div
          className={style.editing}
          onClick={() => changeButtonHandler(name)}
        >
          ????????????????
        </div>
        <div
          className={style.editing}
          onClick={() => deleteButtonHandler(name, remove)}
        >
          ??????????????
        </div>
      </div>
    );
  };

  const outlinedHandler = (name: number) => {
    if (valueEnteredBlock.floorsVisible.includes(name)) {
      const newFloorsVisible = valueEnteredBlock.floorsVisible.filter(
        (el) => el !== name
      );

      setValueEnteredBlock({
        ...valueEnteredBlock,
        floorsVisible: newFloorsVisible,
      });
    } else {
      const newFloorsVisible = [...valueEnteredBlock.floorsVisible, name];
      setValueEnteredBlock({
        ...valueEnteredBlock,
        floorsVisible: newFloorsVisible,
      });
    }
  };

  return (
    <Form.List name="blocks">
      {(fields, { add, remove }) => (
        <>
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => addBlock(add, fields)}
              icon={<PlusOutlined />}
            >
              ???????????????? ????????
            </Button>
          </Form.Item>
          {fields.map(({ key, name: blockName, fieldKey, ...restField }) => (
            <Space
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 8,
              }}
              align="baseline"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {valueEnteredBlock?.floorsVisible.includes(blockName) ? (
                  <UpOutlined
                    onClick={() => outlinedHandler(blockName)}
                    style={{
                      marginRight: 20,
                      fontSize: 15,
                      lineHeight: 2,
                    }}
                  />
                ) : (
                  <DownOutlined
                    onClick={() => outlinedHandler(blockName)}
                    style={{
                      marginRight: 20,
                      fontSize: 15,
                      lineHeight: 2,
                    }}
                  />
                )}
                <Popover
                  content={() => popoverContent(blockName, remove)}
                  trigger="click"
                >
                  <MenuUnfoldOutlined
                    style={{
                      marginRight: 20,
                      fontSize: 15,
                      lineHeight: 2,
                    }}
                  />
                </Popover>
                <Form.Item
                  {...restField}
                  name={[blockName, `block`]}
                  rules={[{ required: true, message: "?????????????? ?????????? ??????????" }]}
                >
                  {!valueEnteredBlock?.savedField.includes(blockName) ? (
                    <Input
                      placeholder="?????????????? ?????????? ??????????"
                      required={true}
                      className={style.input}
                    />
                  ) : (
                    <Input
                      className={style.input}
                      readOnly={true}
                      bordered={false}
                    />
                  )}
                </Form.Item>
                {!valueEnteredBlock?.savedField.includes(blockName) && (
                  <Button
                    type="primary"
                    className={style.button}
                    onClick={() => saveChangesHandler(blockName)}
                  >
                    ??????????????????
                  </Button>
                )}
              </div>
              <div className={style.formListFloor}>
                {valueEnteredBlock?.savedField.includes(blockName) && (
                  <Form.List name={[blockName, `floors`]}>
                    {(fieldsFloor, { add, remove }) => (
                      <>
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => addFloor(add, blockName)}
                            icon={<PlusOutlined />}
                          >
                            ???????????????? ????????
                          </Button>
                        </Form.Item>
                        {valueEnteredBlock?.floorsVisible.includes(blockName) &&
                          fieldsFloor.map(({ key, name, ...restField }) => (
                            <Floor
                              key={key}
                              i={key}
                              name={name}
                              blockName={blockName}
                              restField={restField}
                              remove={remove}
                              form={form}
                              currentData={currentData}
                            />
                          ))}
                      </>
                    )}
                  </Form.List>
                )}
              </div>
            </Space>
          ))}
        </>
      )}
    </Form.List>
  );
};

export default BlocksAndFloors;
