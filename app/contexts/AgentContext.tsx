'use client'

import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Agent {
  id: string;
  agentName: string;
  agentStatus: string;
};

type AgentContextType = {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id">) => void;
  updateAgent: (agent: Agent) => void;
  deleteAgent: (index: number) => void;
};

const initialContext: AgentContextType = {
  agents: [],
  addAgent: () => {},
  updateAgent: () => {},
  deleteAgent: () => {},
};

export const AgentContext = createContext(initialContext);

type AgentProviderProps = {
    children: React.ReactNode;
}

export const AgentProvider: React.FC<AgentProviderProps> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);

  // Add a new agent
  const addAgent = (agent: Omit<Agent, "id">) => {
    const id = uuidv4();
    setAgents([...agents, { ...agent, id }]);
  };

  // Update an existing agent
  const updateAgent = (agent: Agent) => {
    const index = agents.findIndex((a) => a.id === agent.id);
    const updatedAgents = [...agents];
    updatedAgents[index] = agent;
    setAgents(updatedAgents);
  };

  // Delete an agent
  const deleteAgent = (index: number) => {
    const updatedAgents = [...agents];
    updatedAgents.splice(index, 1);
    setAgents(updatedAgents);
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        addAgent,
        updateAgent,
        deleteAgent,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => React.useContext(AgentContext);
