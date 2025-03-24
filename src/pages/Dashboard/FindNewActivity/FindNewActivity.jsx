import React, { useEffect, useState, useCallback } from "react";
import { useActivities } from "../../../hooks/useActivities";
import { useUser } from "../../../hooks/useUser";
import Spinner from "../../../components/Spinner/Spinner";
import { addActivityToUser } from "../../../api";
import "./findNewActivity.css";

const FindNewActivity = () => {
  const { allActivities, loading, error } = useActivities();
  const { refreshUserData } = useUser();
  const [currentActivity, setCurrentActivity] = useState(null);
  const [animationDirection, setAnimationDirection] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const getRandomActivity = useCallback(
    (excludeId) => {
      if (allActivities.length === 1) return allActivities[0];
      let random;

      do {
        random =
          allActivities[Math.floor(Math.random() * allActivities.length)];
      } while (random.id === excludeId);
      return random;
    },
    [allActivities]
  );

  useEffect(() => {
    if (allActivities.length > 0) {
      setCurrentActivity(getRandomActivity());
    }
  }, [allActivities, getRandomActivity]);

  useEffect(() => {
    return () => {
      refreshUserData();
    };
  }, [refreshUserData]);

  const animateCard = (direction, callback) => {
    setAnimationDirection(direction);
    setTimeout(() => {
      setAnimationDirection("");
      callback();
    }, 300);
  };

  const handleSkip = () => {
    animateCard("left", () =>
      setCurrentActivity(getRandomActivity(currentActivity?.id))
    );
  };

  const handleSelect = () => {
    const selected = currentActivity;

    setIsSaving(true);
    setSaveStatus("saving");

    addActivityToUser(selected)
      .then(async () => {
        console.log(selected.activity, "is selected");
        setSaveStatus("saved");

        animateCard("right", () => {
          setCurrentActivity(getRandomActivity(currentActivity?.id));

          setTimeout(() => setSaveStatus(""), 500);
        });
      })
      .catch((err) => {
        console.error("Error saving activity:", err);
        setSaveStatus("failed");

        setTimeout(() => setSaveStatus(""), 500);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (loading) return <Spinner />;
  if (error) return <p className="error-message">Error fetching activities</p>;
  if (!currentActivity) return <p>No more activities! 🎉</p>;

  return (
    <main className="find-activities-container">
      <h1>Find your new challenge!</h1>
      <p>
        This is your new daily challenge! Try to complete until the end of the
        day.
      </p>
      <div className={`activity-container`} key={currentActivity.id}>
        <div className={`activity ${animationDirection}`}>
          <img
            src={currentActivity.image}
            alt={currentActivity.activity}
            className="activity-image"
          />
          <div className="activity-details">
            <h2>{currentActivity.activity}</h2>
            <span className="category-badge">{currentActivity.category}</span>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={handleSkip} disabled={isSaving}>
          <i class="fa-solid fa-forward-step"></i>Skip
        </button>
        <button onClick={handleSelect} disabled={isSaving}>
          {saveStatus === "saving" ? (
            "Saving..."
          ) : saveStatus === "saved" ? (
            "Saved!"
          ) : (
            <>
              <i class="fa-solid fa-square-plus"></i>Select
            </>
          )}
        </button>
      </div>
    </main>
  );
};

export default FindNewActivity;
