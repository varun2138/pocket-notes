import React, { useEffect, useRef } from "react";
import styles from "./styles/Modal.module.css";
import { useGroupContext } from "../context/GroupContext";

const Modal = () => {
  const {
    isModalOpen,
    closeModal,
    groupName,
    setGroupName,
    colorSelected,
    setColorSelected,
    addGroup,
    colors,
  } = useGroupContext();
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;
  return (
    <div className={styles.modal}>
      <div className={styles.modal_box} ref={ref}>
        <h3 className={styles.title}>Create new group</h3>
        <div className={styles.text}>
          <p className={styles.name}>Group name</p>
          <input
            className={styles.Input}
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="add group name"
          />
        </div>
        <div className={styles.color}>
          <p className={styles.color_name}>choose color</p>

          <div className={styles.color_select}>
            {colors.map((color) => (
              <button
                key={color}
                className={styles.colorButton}
                style={{
                  backgroundColor: color,
                  border: colorSelected === color ? "2px solid black" : "none",
                }}
                onClick={() => setColorSelected(color)}
              ></button>
            ))}
          </div>
        </div>
        <div className={styles.create}>
          <button
            className={styles.create_btn}
            onClick={addGroup}
            disabled={!groupName.trim() || !colorSelected}
          >
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
