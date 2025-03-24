export default {
  login: async () => {
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

    storeValue("access_token", data.session?.access_token);
    storeValue("user_id", data.user?.id);

    showAlert("Успешный вход!", "success");
    return true;
  }
}
