import { getPublicProfile } from "@/lib/actions/getPublicProfile";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar } from "@mui/material";
import PetList from "./PetList/page";
import EditableAvatar from "@/components/EditableAvatar";
import styles from "./Bio.module.css";

export default async function Bio({
  username,
  isOwner,
}: {
  username: string;
  isOwner: boolean;
}) {
  if (!username) return notFound();

  const data = await getPublicProfile(username);

  if (!data) return notFound();

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const profile = data.profile;
  const diplomas = data.diplomas;

  // Проверяем, что все поля профиля пусты (null) и дипломов нет
  const profileEmpty =
    !profile || Object.values(profile).every((v) => v == null);
  const diplomasEmpty = diplomas.length === 0;
  const showEmptyNotice = profileEmpty && diplomasEmpty;

  return (
    <section className={styles.container}>
      {isOwner ? (
        <EditableAvatar
          key={Date.now()}
          avatarUrl={profile?.avatarUrl || "/avatar.svg"}
        />
      ) : (
        <Avatar
          alt="Profile picture"
          src={profile?.avatarUrl || "/avatar.svg"}
          sx={{ width: 120, height: 120 }}
        />
      )}

      {profile?.fullName && <h1>{profile.fullName}</h1>}
      {profile?.about && <p>О себе: {profile.about}</p>}
      {profile?.instagram && <p>instagram: {profile.instagram}</p>}
      {profile?.telegram && <p>telegram: {profile.telegram}</p>}
      {showEmptyNotice && <div>Информация о себе не внесена</div>}

      {isOwner && (
        <button>
          <Link href={`/profil/EditBioForm?userId=${userId}`}>
            Внести/Изменить «О себе»
          </Link>
        </button>
      )}

      <PetList
        pets={(
          data.pets as Array<{ ownerId: string } & (typeof data.pets)[number]>
        ).map((pet) => ({
          ...pet,
          ownerId: pet.ownerId,
          birthDate: pet.birthDate?.toISOString() ?? "",
          heightCm: pet.heightCm,
          weightKg: pet.weightKg,
          photoUrl: pet.photoUrl,
          notes: pet.notes,
          awards: pet.awards.map((award) => ({
            id: String(award.id),
            title: award.title,
            event: award.event ?? "",
            date: award.date ? award.date.toISOString() : "",
            rank: award.rank ?? undefined,
          })),
        }))}
        isOwner={isOwner}
      />
      {isOwner && (
        <button className={styles.addpet}>
          <Link href={`/profil/AddPetForm?userId=${userId}`}>
            Добавить питомца
          </Link>
        </button>
      )}

      {diplomas.length > 0 && (
        <>
          <h2>Diplomas</h2>
          <ul>
            {diplomas.map((d) => (
              <li key={d.id}>
                {d.title}
                {d.issuedBy && ` — ${d.issuedBy}`}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
