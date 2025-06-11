import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserWithTrainings } from "@/lib/user/getUserWithTrainings";
import { getAuthoredCourses } from "@/lib/course/getAuthoredCourses";

export async function getProfileData(username: string) {
  const session = await getServerSession(authOptions);
  const currentUsername = session?.user?.username;
  const isOwner = currentUsername === username;

  const data = isOwner ? await getUserWithTrainings() : null;
  const createdCourses = isOwner ? await getAuthoredCourses() : null;

  return { isOwner, data, createdCourses };
}