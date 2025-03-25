import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router";
import Spinner from "../../components/Spinner/Spinner";
import { useActivities } from "../../hooks/useActivities";
import "./seeAllActivities.css";

const SeeAllActivities = () => {
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const { allActivities, loading, error } = useActivities();

  const activitiesPerPage = 12;

  useEffect(() => {
    if (!loading && allActivities.length > 0) {
      setFilteredActivities(
        allActivities.filter(
          (activity) =>
            selectedCategory === "All" || activity.category === selectedCategory
        )
      );
      setCurrentPage(1);
    }
  }, [allActivities, selectedCategory, loading]);

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = [
    "All",
    ...new Set(allActivities.map((act) => act.category)),
  ];

  if (loading) return <Spinner />;

  if (error)
    return (
      <div className="error-message">
        <p>⚠️ Error fetching activities: {error.message}</p>
      </div>
    );

  return (
    <main className="activities-container">
      <Link to="/" className="activities-link">
        &larr; <span>Back to Home</span>
      </Link>

      <h1>All Activities</h1>

      <div className="filter-container">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="activities-grid">
        {currentActivities.length > 0 ? (
          currentActivities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <LazyLoadImage
                src={activity.image}
                alt={activity.activity}
                loading="lazy"
                className="activity-image"
                effect="blur"
              />

              <div className="activity-info">
                <strong className="activity-name">{activity.activity}</strong>
                <span
                  className={`category-badge ${activity.category
                    .toLowerCase()
                    .replace(/ /, "-")}`}
                >
                  {activity.category}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-activities">
            No activities available for this category.
          </p>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          ◀ Previous
        </button>

        <span className="page-info">
          Page {currentPage} of{" "}
          {Math.ceil(filteredActivities.length / activitiesPerPage)}
        </span>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastActivity >= filteredActivities.length}
          className="pagination-button"
        >
          Next ▶
        </button>
      </div>
    </main>
  );
};

export default SeeAllActivities;
