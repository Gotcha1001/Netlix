import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.upsert({
      where: { supabaseUserId: user.id },
      update: { email: user.email },
      create: {
        supabaseUserId: user.id,
        email: user.email,
        profiles: {
          create: {
            name: "Profile 1",
            avatar: "/images/netflix--avatar.png",
          },
        },
      },
    });

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.log("There was an error loggin in", error);
    return NextResponse.json(
      { error: "An error occurred while loggin in" },
      { status: 500 },
    );
  }
}
