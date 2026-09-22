import { createContext, useContext, useEffect, useState } from "react";
import { teamMembers as initialTeamMembers } from "../data/mockData";
import {
    getUsers,
    createUser,
    deleteUser,
} from "../api/userApi";

const TeamContext = createContext();

export function TeamProvider({ children }) {
  // const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

      const [teamMembers, setTeamMembers] =
          useState([]);
  
      const [loading, setLoading] =
          useState(true);
  
      const [error, setError] =
          useState(null);
  
      async function loadUsers() {
  
          try {
  
              setLoading(true);
  
              const data =
                  await getUsers();
  
              setTeamMembers(data);
  
          } catch (error) {
  
              setError(error.message);
  
          } finally {
  
              setLoading(false);
          }
      }
  
      useEffect(() => {
          loadUsers();
      }, []);

  async function createTeamMember(memberData) {

     const newTeamMember = await createUser(memberData);
    const newMember = {
      id: newTeamMember.id,
      name: newTeamMember.name,
      role: newTeamMember.role,
      avatar: newTeamMember.avatar || null,
    };

    setTeamMembers(currentMembers => [
      ...currentMembers,
      newMember
    ]);
  }

  function updateTeamMember(memberId, updatedData) {
    setTeamMembers(currentMembers =>
      currentMembers.map(member =>
        member.id === memberId
          ? { ...member, ...updatedData }
          : member
      )
    );
  }

  async function removeUser(memberId) {
    await deleteUser(memberId);
    setTeamMembers(currentMembers =>
      currentMembers.filter(member => member.id !== memberId)
    );
  }

  return (
    <TeamContext.Provider
      value={{
        teamMembers,
        createTeamMember,
        updateTeamMember,
        removeUser,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  return useContext(TeamContext);
}