export default {
  async CheckAuth () {
    if (!appsmith.store.access_token) {
      await navigateTo("LoginPage");
      return;
    }

    return true;
  }
}
