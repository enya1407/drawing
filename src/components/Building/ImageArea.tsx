import React, { useState } from "react";
import style from "./Building.module.css";
import building from "../../image/building.jpg";
import trashCan from "../../image/trashCan.svg";
import { Popover, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const ImageArea = () => {
  const [pictureVisibility, setPictureVisibility] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const styleBuilding = pictureVisibility ? style.building : style.hidden;
  const styleTrashCan = pictureVisibility ? style.trashCan : style.hidden;

  console.log("imageUrl", imageUrl);
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setLoading(true);
        setImageUrl(imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className={style.placeForPhoto}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
    // <div>
    //   <img src={building} className={styleBuilding} />{" "}
    //   <Popover content="Удалить изображение">
    //     <img
    //       src={trashCan}
    //       className={styleTrashCan}
    //       onClick={() => setPictureVisibility(false)}
    //     />
    //   </Popover>
    // </div>
  );
};
export default ImageArea;
