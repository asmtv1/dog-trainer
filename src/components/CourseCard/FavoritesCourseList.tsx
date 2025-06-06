"use client";

import { CourseCard } from "@/components/CourseCard/CourseCard";
import styles from "@/app/favorites/favorites.module.css";
import { useState } from "react";
import { TrainingStatus, ActivityType } from "@prisma/client";

type Course = {
  id: number;
  name: string;
  type: string;
  duration: string;
  logoImg: string;
  userStatus?: string;
  startedAt?: Date | null;
  completedAt?: Date | null;
  shortDesc?: string;
  authorUsername: string;
  createdAt?: Date | null;
  avgRating?: number | null;
  reviews: any[];
  isFavorite?: boolean;
  onUnfavorite?: () => void;
};

export function FavoritesList({
  initialCourses,
}: {
  initialCourses: Course[];
}) {
  const [courses, setCourses] = useState(initialCourses);

  const handleUnfavorite = (id: number) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <ul className={styles.list}>
      {courses.length === 0 ? (
        <p>Курсы не найдены</p>
      ) : (
        courses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            onUnfavorite={() => handleUnfavorite(course.id)}
          />
        ))
      )}
    </ul>
  );
}
