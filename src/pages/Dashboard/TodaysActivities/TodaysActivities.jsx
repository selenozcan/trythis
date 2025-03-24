import React, { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { getActivityById, markActivityCompleted } from "../../../api";
import Spinner from "../../../components/Spinner/Spinner";
import "./todaysActivities.css";

const TodaysActivities = () => {
  const { userData, refreshUserData } = useUser();
  const [detailedActivities, setDetailedActivities] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [updatingIds, setUpdatingIds] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!userData?.assignedActivities) return;

      const today = new Date().toISOString().split("T")[0];

      const todays = userData.assignedActivities.filter((a) =>
        a.assignedAt.startsWith(today)
      );

      const enriched = await Promise.all(
        todays.map(async (a) => {
          const details = await getActivityById(a.activityId);
          return { ...a, ...details };
        })
      );

      setDetailedActivities(enriched);
    };

    fetchActivities();
  }, [userData]);

  useEffect(() => {
    return () => {
      refreshUserData();
    };
  }, [refreshUserData]);

  if (!userData) return <Spinner />;

  const handleChange = async (activityId, currentStatus) => {
    if (updatingIds.includes(activityId)) return;

    const newStatus = !currentStatus;
    setUpdatingIds((prev) => [...prev, activityId]);

    if (newStatus) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 2000);
    }

    try {
      await markActivityCompleted(activityId, newStatus);
      await refreshUserData();
    } catch (error) {
      console.error("Failed to update activity:", error);
    } finally {
      setUpdatingIds((prev) => prev.filter((id) => id !== activityId));
    }
  };

  return (
    <main className="list-container">
      <h1>Here is your to-do list!</h1>
      <p>How many can you complete today?</p>

      {showCongrats && (
        <div className="congrats-popup">🎉 Good job! Keep going!</div>
      )}

      <ul className="activity-list">
        {detailedActivities.length === 0 && (
          <p className="empty-message">No activities for today yet!</p>
        )}

        {detailedActivities.map((activity) => (
          <li key={activity.activityId} className="activity-item">
            <span
              className={`activity-name ${
                activity.completed ? "completed" : ""
              }`}
            >
              {activity.activity}
            </span>
            {updatingIds.includes(activity.activityId) ? (
              <Spinner size="small" />
            ) : (
              <input
                type="checkbox"
                checked={activity.completed}
                disabled={false}
                onChange={() =>
                  handleChange(activity.activityId, activity.completed)
                }
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TodaysActivities;
