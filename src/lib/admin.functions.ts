import { createServerFn } from "@tanstack/react-start";

/**
 * Ensures the single admin account exists and has the `admin` role.
 * Credentials live only in server-side secrets (ADMIN_EMAIL / ADMIN_PASSWORD)
 * and are never exposed to the client. Idempotent and input-free.
 */
export const ensureAdminAccount = createServerFn({ method: "POST" }).handler(async () => {
  const email = process.env["ADMIN_EMAIL"];
  const password = process.env["ADMIN_PASSWORD"];
  if (!email || !password) return { ready: false as const };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
  let user = list?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (!user) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) return { ready: false as const };
    user = data.user ?? undefined;
  }

  if (!user) return { ready: false as const };

  await supabaseAdmin
    .from("user_roles")
    .upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });

  return { ready: true as const };
});
