import React from "react";
import styles from "./styles/Group.module.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { GroupName } from "../data/date";
import { useGroupContext } from "../context/GroupContext";
const GroupsList = () => {
  const navigate = useNavigate();
  const { groups, setMobileView, selectedId, setSelectedId, openModal } =
    useGroupContext();

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

      <Modal />
    </div>
  );
};

export default GroupsList;
