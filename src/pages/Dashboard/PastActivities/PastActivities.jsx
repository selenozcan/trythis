import React, { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { getActivityById } from "../../../api";
import Spinner from "../../../components/Spinner/Spinner";
import "./pastActivities.css";

const PastActivities = () => {
  const { userData } = useUser();
  const [pastActivities, setPastActivities] = useState([]);

  useEffect(() => {
    const fetchPast = async () => {
      if (!userData?.assignedActivities) return;
  
      const todayLocal = new Date().toLocaleDateString(); 
  
      const past = userData.assignedActivities.filter((a) => {
        const assignedLocal = new Date(a.assignedAt).toLocaleDateString();
        return assignedLocal < todayLocal;
      });
  
      const enriched = await Promise.all(
        past.map(async (a) => {
          const details = await getActivityById(a.activityId);
          return { ...a, ...details };
        })
      );
  
      enriched.sort(
        (a, b) => new Date(b.assignedAt) - new Date(a.assignedAt)
      );
  
      setPastActivities(enriched);
    };
  
    fetchPast();
  }, [userData]);
  

  if (!userData) return <Spinner />;

  return (
    <main className="past-container">
      <h1 className="past-title">Past Activities</h1>
      <p className="past-description">See what you've done—or missed!</p>

      <ul className="past-activity-list">
        {pastActivities.length === 0 ? (
          <p className="empty-message">No past activities yet.</p>
        ) : (
          pastActivities.map((activity) => (
            <li key={activity.activityId} className="past-activity-item">
              <div className="activity-header">
                <strong>{activity.activity}</strong>
                <span
                  className={`status-badge ${
                    activity.completed ? "completed" : "missed"
                  }`}
                >
                  {activity.completed ? "Completed" : "Missed"}
                </span>
              </div>
              <p className="completed-date">
                Assigned on:{" "}
                {new Date(activity.assignedAt).toLocaleDateString()}
              </p>
              <span className="category-badge">{activity.category}</span>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default PastActivities;
