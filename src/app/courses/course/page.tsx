import Link from "next/link";
import { Course as CourseProp } from "@/types/course";
import styles from "./course.module.css";
import { ROUTES } from "@/constants";

type CourseProps = Partial<Pick<CourseProp, "id">> &
  Omit<CourseProp, "id"> & {
    startedAt?: Date | null;
    completedAt?: Date | null;
  };

export const Course: React.FC<CourseProps> = ({
  name,
  type,
  description,
  duration,
  logoImg,
  userStatus,
  startedAt,
  completedAt,
}) => {
  // Статус курса и подписи
  let statusLabel = "";
  let showStartDate = false;
  let showCompleteDate = false;

  switch (userStatus) {
    case "IN_PROGRESS":
      statusLabel = "Курс начат:";
      showStartDate = !!startedAt;
      break;
    case "NOT_STARTED":
      if (startedAt) {
        statusLabel = "Курс начат:";
        showStartDate = true;
      } else {
        statusLabel = "Курс не начат";
      }
      break;
    case "COMPLETED":
      statusLabel = "Прохождение закончено:";
      showCompleteDate = !!completedAt;
      break;
    default:
      statusLabel = "";
  }

  return (
    <li className={styles.card}>
      <Link href={ROUTES.TRAINING_DETAIL(type)} className={styles.link}>
        <div className={styles.imageContainer}>
          <img src={logoImg} alt={name} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.duration}>Продолжительность: {duration}</p>
          <div>
            {statusLabel && (
              <p className={styles.duration}>
                {statusLabel}{" "}
                {showStartDate &&
                  startedAt &&
                  new Date(startedAt).toLocaleDateString()}
                {showCompleteDate &&
                  completedAt &&
                  new Date(completedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </Link>
    </li>
  );
};
