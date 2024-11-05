import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Group.module.css";
import { Link, useNavigate } from "react-router-dom";
const GroupsList = ({ groups, setGroups }) => {
  const [groupName, setGroupName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorSelected, setcolorSelected] = useState("");
  const [sleectedId, setSelectedId] = useState(null);
  const ref = useRef(null);
  const navigate = useNavigate();
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setGroupName("");
    setcolorSelected("");
  };

  const addGroup = () => {
    if (!groupName.trim() && !colorSelected) return;

    // checking if entered group name already exists or not
    const duplicateName = groups.some(
      (group) => group.name.toLowerCase() === groupName.toLowerCase()
    );

    if (duplicateName) {
      alert("Group name already exists !! Choose another name");
      return;
    }
    const newGroup = {
      id: groups.length + 1,
      name: groupName,
      color: colorSelected,
      notes: [],
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);

    closeModal();
    navigate(`/group/notes/${newGroup.id}`);
  };

  const handleGroup = (id) => {
    setSelectedId(id);
    navigate(`/group/notes/${id}`);
  };

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
  }, [isModalOpen]);
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Pocket Notes</h1>
      <div className={styles.groups}>
        {groups.map((group) => (
          <div
            key={group.id}
            className={styles.group}
            onClick={() => handleGroup(group.id)}
            style={{
              backgroundColor:
                sleectedId === group.id ? "#2F2F2F2B" : "transparent",
            }}
          >
            <p className={styles.logo} style={{ backgroundColor: group.color }}>
              {group.name
                .split(" ")
                .map((word) => word.charAt(0))
                .join("")
                .slice(0, 2)}
            </p>
            <p className={styles.name}>{group.name}</p>
          </div>
        ))}
      </div>

      <button onClick={openModal} className={styles.button}>
        +
      </button>

      {isModalOpen && (
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
                      border:
                        colorSelected === color ? "2px solid black" : "none",
                    }}
                    onClick={() => setcolorSelected(color)}
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
      )}
    </div>
  );
};

export default GroupsList;
