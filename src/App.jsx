import React, { useEffect, useState } from "react";
import GroupsList from "./components/GroupsList";
import Notes from "./components/Notes";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import styles from "./App.module.css";
const App = () => {
  const [groups, setGroups] = useState([]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <GroupsList groups={groups} setGroups={setGroups} />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/group/notes/:groupId"
            element={<Notes groups={groups} setGroups={setGroups} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
