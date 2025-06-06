"use client";

import { useState, useTransition } from "react";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { toggleFavoriteCourse } from "@/lib/actions/addtoFavorite";

type FavoriteButtonProps = {
  id: number;
  isFavorite?: boolean;
  onUnfavorite?: () => void;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  isFavorite = false,
  onUnfavorite,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isPending, startTransition] = useTransition();

  const handleToggleFavorite = async () => {
    startTransition(() => {
      toggleFavoriteCourse(id).then((updatedState) => {
        setFavorite(updatedState);

        if (!updatedState && onUnfavorite) {
          onUnfavorite();
        }
      });
    });
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isPending}
      style={{ backgroundColor: "white", border: "none" }}
      title="Добавить в избранное"
    >
      <TurnedInIcon style={{ color: favorite ? "gold" : "gray" }} />
    </button>
  );
};
