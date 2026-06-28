"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

function getContestPointsByPhase(phase: string | null) {
  switch (phase) {
    case "seiziemes":
      return 5;
    case "huitiemes":
      return 7;
    case "quarts":
      return 10;
    case "demies":
      return 12;
    case "finale":
      return 15;
    case "groupes":
    default:
      return 3;
  }
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

  await supabase.from("vip_tickets").delete().eq("id", id);

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
  const supabase = await checkAdmin();

  const id = formData.get("id");

  const { error } = await supabase.from("results").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/resultats");
}

export async function addContestMatch(formData: FormData) {
  const supabase = await checkAdmin();

  const { error } = await supabase.from("contest_matches").insert({
    date: formData.get("date"),
    time: formData.get("time"),
    team_a: formData.get("team_a"),
    team_b: formData.get("team_b"),
    team_a_flag: formData.get("team_a_flag"),
    team_b_flag: formData.get("team_b_flag"),
    status: formData.get("status"),
    winner: formData.get("winner") || null,
    phase: formData.get("phase") || "groupes",
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/challenge");
}

export async function updateContestMatch(formData: FormData) {
  const supabase = await checkAdmin();

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const winner = formData.get("winner") as string;
  const phase = (formData.get("phase") as string) || "groupes";
  const pointsToGive = getContestPointsByPhase(phase);

  const { error: updateError } = await supabase
    .from("contest_matches")
    .update({
      date: formData.get("date"),
      time: formData.get("time"),
      team_a: formData.get("team_a"),
      team_b: formData.get("team_b"),
      team_a_flag: formData.get("team_a_flag"),
      team_b_flag: formData.get("team_b_flag"),
      status,
      winner: winner || null,
      phase,
    })
    .eq("id", id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  if (status === "Terminé" && winner) {
    const { error: resetError } = await supabase
      .from("contest_predictions")
      .update({ point: 0 })
      .eq("match_id", id);

    if (resetError) {
      throw new Error(resetError.message);
    }

    const { error: pointsError } = await supabase
      .from("contest_predictions")
      .update({ point: pointsToGive })
      .eq("match_id", id)
      .eq("prediction", winner);

    if (pointsError) {
      throw new Error(pointsError.message);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/challenge");
}

export async function finishContestMatch(formData: FormData) {
  const supabase = await checkAdmin();

  const id = formData.get("id") as string;
  const winner = formData.get("winner") as string;
  const phase = (formData.get("phase") as string) || "groupes";
  const pointsToGive = getContestPointsByPhase(phase);

  if (!id) {
    throw new Error("Match introuvable");
  }

  if (!winner) {
    throw new Error("Choisis un gagnant avant de terminer le match");
  }

  const { error: updateError } = await supabase
    .from("contest_matches")
    .update({
      status: "Terminé",
      winner,
      phase,
    })
    .eq("id", id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  const { error: resetError } = await supabase
    .from("contest_predictions")
    .update({ point: 0 })
    .eq("match_id", id);

  if (resetError) {
    throw new Error(resetError.message);
  }

  const { error: pointsError } = await supabase
    .from("contest_predictions")
    .update({ point: pointsToGive })
    .eq("match_id", id)
    .eq("prediction", winner);

  if (pointsError) {
    throw new Error(pointsError.message);
  }

  revalidatePath("/admin");
  revalidatePath("/challenge");
}

export async function deleteContestMatch(formData: FormData) {
  const supabase = await checkAdmin();

  const id = formData.get("id");

  await supabase.from("contest_matches").delete().eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/challenge");
}

export async function addContestPrediction(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const matchId = formData.get("match_id") as string;
  const prediction = formData.get("prediction") as string;

  const { data: match, error: matchError } = await supabase
    .from("contest_matches")
    .select("id, date, time, status")
    .eq("id", matchId)
    .maybeSingle();

  if (matchError) {
    throw new Error(matchError.message);
  }

  if (!match) {
    revalidatePath("/challenge");
    redirect("/challenge");
  }

  if (match.status !== "Ouvert") {
    revalidatePath("/challenge");
    redirect("/challenge");
  }

  const [day, month, year] = String(match.date).split("/");
  const [hours, minutes] = String(match.time).split(":");

  const matchDateTimeUtc = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours) - 2,
    Number(minutes)
  );

  if (Date.now() >= matchDateTimeUtc) {
    revalidatePath("/challenge");
    redirect("/challenge");
  }

  const { data: existingPrediction } = await supabase
    .from("contest_predictions")
    .select("id")
    .eq("user_id", user.id)
    .eq("match_id", matchId)
    .maybeSingle();

  if (existingPrediction) {
    revalidatePath("/challenge");
    return;
  }

  const { error } = await supabase.from("contest_predictions").insert({
    user_id: user.id,
    match_id: matchId,
    prediction,
    point: 0,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/challenge");
}