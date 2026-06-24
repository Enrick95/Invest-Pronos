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
export async function addVipTicket(formData: FormData) {
  const supabase = await checkAdmin();

  const imageFile = formData.get("image") as File;
  let imageUrl = formData.get("image_url") as string;

  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("ticket-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("ticket-images")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }

  await supabase.from("vip_tickets").insert({
    title: formData.get("title"),
    sport: formData.get("sport"),
    date: formData.get("date"),
    pronostic: formData.get("pronostic"),
    cote: formData.get("cote"),
    confiance: formData.get("confiance"),
    analyse: formData.get("analyse"),
    image_url: imageUrl,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");
}
export async function deleteVipTicket(formData: FormData) {
  const id = formData.get("id") as string;

  const supabase = await checkAdmin();

  await supabase
    .from("vip_tickets")
    .delete()
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/dashboard");
}
export async function updateVipTicket(formData: FormData) {
  const id = formData.get("id") as string;

  const supabase = await checkAdmin();

  await supabase
    .from("vip_tickets")
    .update({
      title: formData.get("title"),
      sport: formData.get("sport"),
      date: formData.get("date"),
      pronostic: formData.get("pronostic"),
      cote: formData.get("cote"),
      confiance: formData.get("confiance"),
      analyse: formData.get("analyse"),
      image_url: formData.get("image_url"),
    })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/dashboard");
}
export async function addResult(formData: FormData) {
  "use server";

  const supabase = await checkAdmin();

  const { error } = await supabase.from("results").insert({
    date: formData.get("date"),
    competition: formData.get("competition"),
    match: formData.get("match"),
    pronostic: formData.get("pronostic"),
    cote: formData.get("cote"),
    statut: formData.get("statut"),
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/resultats");
}

export async function updateResult(formData: FormData) {
  "use server";

  const supabase = await checkAdmin();

  const id = formData.get("id");

  const { error } = await supabase
    .from("results")
    .update({
      date: formData.get("date"),
      competition: formData.get("competition"),
      match: formData.get("match"),
      pronostic: formData.get("pronostic"),
      cote: formData.get("cote"),
      statut: formData.get("statut"),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/resultats");
}

export async function deleteResult(formData: FormData) {
  "use server";

  const supabase = await checkAdmin();

  const id = formData.get("id");

  const { error } = await supabase.from("results").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/resultats");
}