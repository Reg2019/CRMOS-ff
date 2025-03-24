export default {
  async login () {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');

    const supabase = createClient(
      'https://b912187pi.bqt2030.click',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsaGtiY2tlenRqa3d4c2dyenZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMjc5MzQsImV4cCI6MjA0NzgwMzkzNH0.o1JrHPtfzF-GS_ImGpzVv9CGtE4zj-0HLmr8PK7zf-Y'
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email: Input1login.text,
      password: Input1password.text
    });

    if (error) {
      showAlert("Ошибка входа: " + error.message, "error");
      return false;
    }
		storeValue("access_token", data.session.access_token);
		storeValue("user_id", data.user.id);
		storeValue("user_email", data.user.email); // 👈 вот это нужно

		// showAlert("Успешный вход!", "success");
		showAlert(`Успешный вход c email ${data.user.email}`, "success");


    // 🔄 переход на домашнюю страницу
		// console.log("Навигация на домашнюю страницу");
    navigateTo("Home");

    return true;
  },

  async logout () {
    storeValue("access_token", null);
    storeValue("user_id", null);
    storeValue("user_profile", null);
    navigateTo("LoginPage");
  },

  async checkAuth () {
    if (!appsmith.store.access_token) {
      await navigateTo("LoginPage");
      return;
    }

    // (опционально) Получить профиль
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');

    const supabase = createClient(
      'https://b912187pi.bqt2030.click',
      appsmith.store.access_token
    );

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user?.id) {
      await this.logout();
      return;
    }

    // ⚙️ Загрузка профиля из таблицы user_profiles
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profile) {
      storeValue("user_profile", profile);
    }
  }
}