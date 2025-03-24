import React, { useMemo } from "react";
import { useUser } from "../../hooks/useUser";
import Spinner from "../../components/Spinner/Spinner";
import { motivationalQuotes, tips } from "./dashboardData";

import "./dashboard.css";

const Dashboard = () => {
  const { userData, loading } = useUser();

  const quote = useMemo(() => {
    return motivationalQuotes[
      Math.floor(Math.random() * motivationalQuotes.length)
    ];
  }, []);

  const tip = useMemo(() => {
    return tips[Math.floor(Math.random() * tips.length)];
  }, []);

  if (loading || !userData) return <Spinner />;

  const totalAssigned = userData.assignedActivities?.length || 0;
  const totalCompleted = userData.totalCompletedActivities || 0;
  const completionRate = totalAssigned
    ? Math.round((totalCompleted / totalAssigned) * 100)
    : 0;

  const today = new Date().toISOString().split("T")[0];
  const todaysActivities =
    userData.assignedActivities?.filter((a) =>
      a.assignedAt.startsWith(today)
    ) || [];
  const todaysCompleted = todaysActivities.filter((a) => a.completed).length;

  return (
    <main className="dashboard">
      <h1>Welcome, {userData.name}!</h1>

      <section className="streak-info">
        🔥 {userData.streak} day streak | ✔ {totalCompleted} completed
      </section>

      <section className="goal-card">
        <h3>Today's Goal</h3>
        <p>
          You’ve completed {todaysCompleted} out of {todaysActivities.length}{" "}
          activities today.
        </p>
        <progress
          value={todaysCompleted}
          max={todaysActivities.length}
        ></progress>
      </section>

      <section className="stats-card">
        <h3>Overall Stats</h3>
        <ul>
          <li>Completion rate: {completionRate}%</li>
          <li>Total assigned: {totalAssigned}</li>
        </ul>
      </section>

      <section className="quote-card">
        <h3>Quote of the Day</h3>
        <p>“{quote}”</p>
      </section>

      <section className="tip-card">
        <h3>Tip of the Day</h3>
        <p>{tip}</p>
      </section>
    </main>
  );
};

export default Dashboard;
