import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState(() => {
    const groupsSaved = localStorage.getItem("groups");
    return groupsSaved ? JSON.parse(groupsSaved) : [];
  });
  const [groupName, setGroupName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorSelected, setColorSelected] = useState("");
  const [mobileView, setMobileView] = useState(false);
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

  //to handle the modal, open and close
  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setGroupName("");
    setColorSelected("");
  };

  // to add new group
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

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    if (!selectedId) {
      navigate("/");
    }
  }, [selectedId, navigate]);
  const value = {
    groups,
    setGroups,
    mobileView,
    setMobileView,
    selectedId,
    setSelectedId,
    isModalOpen,
    groupName,
    setGroupName,
    openModal,
    closeModal,
    colorSelected,
    setColorSelected,
    addGroup,
    colors,
  };
  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(GroupContext);
};
