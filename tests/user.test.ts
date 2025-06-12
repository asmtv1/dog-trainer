import { describe, expect, it, vi } from "vitest";

vi.mock("@/shared/prisma", () => {
  return {
    prisma: {
      userProfile: {
        findUnique: vi.fn(async ({ where }) => ({ id: "p1", userId: where.userId })),
        update: vi.fn(async ({ data }) => ({ id: "p1", ...data })),
      },
    },
  };
});

vi.mock("@/utils/getCurrentUserId", () => {
  return { getCurrentUserId: vi.fn(async () => "user1") };
});

import { getUserProfile } from "@/lib/user/getUserProfile";
import { updateUserProfile } from "@/lib/user/updateUserProfile";
import { prisma } from "@/shared/prisma";

describe("user profile", () => {
  it("gets profile", async () => {
    const profile = await getUserProfile();
    expect(prisma.userProfile.findUnique).toHaveBeenCalled();
    expect(profile).toMatchObject({ userId: "user1" });
  });

  it("updates profile", async () => {
    const updated = await updateUserProfile({
      fullName: "Test User",
      about: "about",

      telegram: "tguser",
      instagram: "igacc",
      website: "http://example.com",
      birthDate: "2024-01-01",
    });
    expect(prisma.userProfile.update).toHaveBeenCalled();
    expect(updated.fullName).toBe("Test User");
  });
});
