import { createContext, useContext, useState } from "react";
import { teamMembers as initialTeamMembers } from "../data/mockData";

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  function createTeamMember(memberData) {
    const newMember = {
      id: Date.now(),
      name: memberData.name,
      role: memberData.role,
      avatar: memberData.avatar || null,
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

  function deleteTeamMember(memberId) {
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
        deleteTeamMember,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  return useContext(TeamContext);
}