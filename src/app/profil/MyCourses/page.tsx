interface Props {
  courseName: string;
  completedAt: Date | null;
  startedAt: Date | null;
  completedDays: number[];
}

export default function MyCourses({
  courseName,
  startedAt,
  completedAt,
  completedDays,
}: Props) {
  console.log(completedDays, "тут не 0 должно быть");
  if (!courseName) return <div>Вы пока не начали обучение</div>;
  return (
    <li>
      <div>{courseName}</div>
      {startedAt && <div>Курс начат : {startedAt.toLocaleDateString()}</div>}
      {completedAt && (
        <div> Курс окончен : {new Date(completedAt).toLocaleDateString()}</div>
      )}

      {completedDays.length !== 0 && (
        <div>Дней курса пройдено: {completedDays.length}</div>
      )}
    </li>
  );
}
