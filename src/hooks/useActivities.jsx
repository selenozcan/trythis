import { useContext } from "react";
import { ActivitiesContext } from "../context/ActivitiesContext";

export const useActivities = () => useContext(ActivitiesContext);
