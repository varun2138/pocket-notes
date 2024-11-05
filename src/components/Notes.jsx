import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/Notes.module.css";
import Arrow from "../assets/arrow.png";
import Arrow_Disabled from "../assets/arrow_disabled.png";
const Notes = ({ groups, setGroups }) => {
  const { groupId } = useParams();
  const group = groups.find((gr) => gr.id === parseInt(groupId));
  const [notesContent, setNotesContent] = useState("");

  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .replace(/,/g, "");
  };
  const formatTime = (time) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(time);
  };

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
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p className={styles.logo} style={{ backgroundColor: group?.color }}>
          {group.name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .slice(0, 2)}
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
            placeholder="add your text here..."
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
