import React, { createContext, useState, useEffect } from "react";
import { getAllActivities } from "../api";

const ActivitiesContext = createContext(null);

const ActivitiesProvider = ({ children }) => {
  const [allActivities, setAllActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activities = await getAllActivities();
        setAllActivities(activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <ActivitiesContext.Provider value={{ allActivities, loading, error }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export { ActivitiesContext, ActivitiesProvider };
