export type CourseType = "home" | "street" | "puppy" | "authors";

export interface Course {
  id: number;
  description: string;
  duration: string;
  logoImg: string;
  name: string;
  type: CourseType;
  userStatus: string;
}
