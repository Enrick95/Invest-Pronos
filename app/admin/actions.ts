"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

async function checkAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email !== "louisiusenrick@gmail.com") {
    throw new Error("Accès refusé");
  }

  return supabase;
}

export async function addMatch(formData: FormData) {
  const supabase = await checkAdmin();

  await supabase.from("home_matches").insert({
    league: formData.get("league"),
    date: formData.get("date"),
    time: formData.get("time"),
    home: formData.get("home"),
    away: formData.get("away"),
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateMatch(formData: FormData) {
  const supabase = await checkAdmin();

  const id = formData.get("id");

  await supabase
    .from("home_matches")
    .update({
      league: formData.get("league"),
      date: formData.get("date"),
      time: formData.get("time"),
      home: formData.get("home"),
      away: formData.get("away"),
    })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteMatch(formData: FormData) {
  const supabase = await checkAdmin();

  const id = formData.get("id");

  await supabase.from("home_matches").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}