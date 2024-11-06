import React, { useState } from "react";
import styles from "./styles/Group.module.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { GroupName } from "../data/date";
const GroupsList = ({ groups, setGroups, setMobileView }) => {
  const [groupName, setGroupName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorSelected, setColorSelected] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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
    setColorSelected("");
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
    setSelectedId(newGroup.id);
    closeModal();
    setMobileView(true);
    navigate(`/group/notes/${newGroup.id}`);
  };

  const handleGroup = (id) => {
    setSelectedId(id);
    setMobileView(true);
    navigate(`/group/notes/${id}`);
  };

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
                selectedId === group.id ? "#2F2F2F2B" : "transparent",
            }}
          >
            <p className={styles.logo} style={{ backgroundColor: group.color }}>
              <GroupName group={group} />
            </p>
            <p className={styles.name}>{group.name}</p>
          </div>
        ))}
      </div>

      <button onClick={openModal} className={styles.button}>
        +
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        groupName={groupName}
        setGroupName={setGroupName}
        colorSelected={colorSelected}
        setColorSelected={setColorSelected}
        addGroup={addGroup}
        colors={colors}
      />
    </div>
  );
};

export default GroupsList;
