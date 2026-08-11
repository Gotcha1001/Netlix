import { prisma } from "./prisma";
import { createClient } from "./supabase/server";

export const getAuthUser = async () => {
  const supabase = await createClient();
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !authUser) return null;
  return prisma.user.findUnique({ where: { supabaseUserId: authUser.id } });
};
