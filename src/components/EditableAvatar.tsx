"use client";

import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { updateAvatar } from "@/lib/actions/updateAvatar";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

export default function EditableAvatar({
  avatarUrl,
}: {
  avatarUrl: string | null;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const router = useRouter();

  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(
    avatarUrl
  );

  const [cacheBuster, setCacheBuster] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session?.user?.id) return;
    console.log("Загрузка начинается:", file.name, file.size);
    if (file.size > MAX_FILE_SIZE) {
      alert("Файл слишком большой. Максимальный размер — 5 МБ.");
      return;
    }

    try {
      const compressedFileRaw = await imageCompression(file, {
        maxSizeMB: 0.6,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      // Create a new File with the original file name
      const compressedFile = new File([compressedFileRaw], file.name, {
        type: compressedFileRaw.type,
      });

      console.log("Исходный файл:", file.name, file.size);
      console.log("Сжатый файл:", compressedFile.name, compressedFile.size);

      const newUrl = await updateAvatar(compressedFile, session.user.id);
      setCurrentAvatarUrl(newUrl);
      setCacheBuster(Date.now().toString());
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при сохранении avatar:", err);
    }
  };

  useEffect(() => {
    if (currentAvatarUrl) {
      setCacheBuster(Date.now().toString());
    }
  }, [currentAvatarUrl]);

  const displayedUrl = currentAvatarUrl
    ? cacheBuster
      ? `${currentAvatarUrl}?cb=${cacheBuster}`
      : currentAvatarUrl
    : "/avatar.svg";

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: 120,
        height: 120,
      }}
    >
      <Avatar
        alt="Аватар"
        src={displayedUrl}
        sx={{ width: 120, height: 120 }}
      />
      <Tooltip title="Изменить аватар">
        <IconButton
          onClick={() => fileInputRef.current?.click()}
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "background.paper",
            boxShadow: 1,
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <input
        ref={fileInputRef}
        name="file"
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    </Box>
  );
}
