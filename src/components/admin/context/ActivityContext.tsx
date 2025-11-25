import { createContext, useContext, useState } from "react";

interface Activity {
  id: string;
  message: string;
  timestamp: number;
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (message: string) => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider = ({ children }: { children: React.ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (message: string) => {
    const newActivity = {
      id: crypto.randomUUID(),
      message,
      timestamp: Date.now(),
    };

    // Adiciona no topo e limita a 4
    setActivities(prev => [newActivity, ...prev].slice(0, 4));
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error("useActivity must be used inside ActivityProvider");
  return ctx;
};
