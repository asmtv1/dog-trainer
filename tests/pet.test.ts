import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/shared/prisma", () => {
  return {
    prisma: {
      pet: {
        create: vi.fn(async (args) => ({ id: "new_id", ...args.data })),
        update: vi.fn(async (args) => ({ id: args.where.id, ...args.data })),
      },
    },
  };
});

vi.mock("@/utils/getCurrentUserId", () => {
  return { getCurrentUserId: vi.fn(async () => "user1") };
});

import { savePet } from "@/lib/pet/savePet";
import { prisma } from "@/shared/prisma";

describe("savePet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates new pet when id not provided", async () => {
    const result = await savePet({ name: "Rex", type: "DOG" });
    expect(prisma.pet.create).toHaveBeenCalled();
    expect(result).toMatchObject({ name: "Rex", type: "DOG" });
  });

  it("updates pet when id provided", async () => {
    const result = await savePet({ id: "123", name: "Max", type: "DOG" });
    expect(prisma.pet.update).toHaveBeenCalledWith({
      where: { id: "123" },
      data: expect.any(Object),
    });
    expect(result).toMatchObject({ id: "123", name: "Max" });
  });
});
