import React, { useState } from "react";
import GroupsList from "./components/GroupsList";
import Notes from "./components/Notes";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import styles from "./App.module.css";
const App = () => {
  const [groups, setGroups] = useState([]);
  const [mobileView, setMobileView] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sidebar} ${mobileView ? styles.hideGroups : ""}`}
      >
        <GroupsList
          groups={groups}
          setGroups={setGroups}
          setMobileView={setMobileView}
        />
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
          <Route
            path="/group/notes/:groupId"
            element={
              <Notes
                groups={groups}
                setGroups={setGroups}
                setMobileView={setMobileView}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
