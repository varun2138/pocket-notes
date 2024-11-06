import React, { useState } from "react";
import GroupsList from "./components/GroupsList";
import Notes from "./components/Notes";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import styles from "./App.module.css";
import { useGroupContext } from "./context/GroupContext";
const App = () => {
  const { mobileView } = useGroupContext();

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sidebar} ${mobileView ? styles.hideGroups : ""}`}
      >
        <GroupsList />
      </div>
      <div
        className={`${styles.content} ${!mobileView ? styles.hideNotes : ""}`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <div className={`${styles.home} ${styles.hideHome}`}>
                <Home />
              </div>
            }
          />
          <Route path="/group/notes/:groupId" element={<Notes />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
