// src/components/CourseRating.tsx
"use client";

import Rating, { RatingProps } from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { rateCourse } from "@/lib/actions/rateCourse";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function CourseRating({
  readOnly = true,
  ...props
}: RatingProps) {
  return (
    <StyledRating
      precision={0.5}
      icon={<FavoriteIcon fontSize="inherit" />}
      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      readOnly={readOnly}
      {...props}
    />
  );
}

type ClientCourseRatingProps = {
  courseId: number;
  initialRating: number;
};

export function ClientCourseRating({
  courseId,
  initialRating,
}: ClientCourseRatingProps) {
  const [value, setValue] = useState<number | null>(initialRating);

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setValue(newValue);

    try {
      await rateCourse(courseId, newValue);
    } catch (error) {
      console.error("Ошибка при оценке курса", error);
    }
  };

  return (
    <div>
      <span>Оцените курс: </span>
      <CourseRating value={value} onChange={handleChange} readOnly={false} />
    </div>
  );
}
