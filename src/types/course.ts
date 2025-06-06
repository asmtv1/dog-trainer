export type CourseType = "home" | "street" | "puppy" | "authors";

export interface Course {
  id: number;
  description: string;
  duration: string;
  logoImg: string;
  name: string;
  type: CourseType;
  userStatus: string;
  shortDesc: string;
  authorUsername: string;
  createdAt: Date;
  isFavorite: boolean;
  avgRating: number | null;
  reviews: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    courseId: number;
    userId: string;
    rating: number | null;
    comment: string | null;
  }[];
}
