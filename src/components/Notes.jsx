import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/Notes.module.css";
import Arrow from "../assets/arrow.png";
import Arrow_Disabled from "../assets/arrow_disabled.png";
import Back_Arrow from "../assets/back_arrow.png";
import { formatDate, formatTime, GroupName } from "../data/date.js";
import { useGroupContext } from "../context/GroupContext.jsx";

const Notes = () => {
  const { groups, setGroups, setMobileView } = useGroupContext();
  const { groupId } = useParams();
  const group = groups.find((gr) => gr.id === parseInt(groupId));
  const [notesContent, setNotesContent] = useState("");
  const navigate = useNavigate();

  const addNote = (e) => {
    e.preventDefault();
    if (notesContent.trim()) {
      const newNote = {
        id: group.notes.length + 1,
        content: notesContent,
        createdAt: formatDate(new Date()),
        createtime: formatTime(new Date()),
      };
      setGroups((prevGroups) =>
        prevGroups.map((gr) =>
          gr.id === parseInt(groupId)
            ? { ...gr, notes: [...gr.notes, newNote] }
            : gr
        )
      );
      setNotesContent("");
    }
  };
  const handleSubmit = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNote(e);
    }
  };
  const handleMobileView = () => {
    setMobileView(false);
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p onClick={handleMobileView} className={styles.back}>
          <img src={Back_Arrow} alt="back" />
        </p>
        <p className={styles.logo} style={{ backgroundColor: group?.color }}>
          <GroupName group={group} />
        </p>

        <h1 className={styles.name}>{group?.name}</h1>
      </div>
      <div className={styles.notes}>
        <div className={styles.box}>
          {group?.notes.map((note) => (
            <div key={note.id} className={styles.content}>
              <p>{note.content}</p>
              <div className={styles.createdDate}>
                <p>{note.createdAt}</p>
                <p className={styles.time}>
                  {" "}
                  <span className={styles.dot}></span> {note.createtime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.Input_Outline}>
        <form onSubmit={addNote} className={styles.Input_Box}>
          <textarea
            className={styles.Input}
            rows={4}
            cols={30}
            placeholder="Enter your text here..."
            value={notesContent}
            onChange={(e) => setNotesContent(e.target.value)}
            onKeyDown={handleSubmit}
          />
          <button disabled={!notesContent} className={styles.btn} type="submit">
            {notesContent ? (
              <img src={Arrow} alt="" />
            ) : (
              <img src={Arrow_Disabled} alt="" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notes;
