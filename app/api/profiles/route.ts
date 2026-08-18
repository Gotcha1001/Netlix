import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const MAX_PROFILES = 5;

export const GET = async () => {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profiles = await prisma.profile.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { name, isKids = false }: { name: string; isKids?: boolean } =
      await req.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    const count = await prisma.profile.count({ where: { userId: user.id } });

    if (count >= MAX_PROFILES) {
      return NextResponse.json(
        { error: "Maximum number of profiles reached" },
        { status: 400 },
      );
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        isKids,
        userId: user.id,
        avatar: "/images/profile.jpg",
      },
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 },
    );
  }
};
