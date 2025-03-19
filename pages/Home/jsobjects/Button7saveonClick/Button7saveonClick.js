export default {
  async Button7saveonClick () {
    try {
      // Запускаем SQL-запрос на вставку данных
      await insert_all_inbox.run();

      // Очищаем форму после успешного сохранения
      Input2short.setValue("");
      RichTextEditor1long.setValue("");

      // Закрываем модальное окно
      closeModal('Modal2inbox');

      showAlert("Данные успешно сохранены!", "success");
    } catch (error) {
      showAlert("Ошибка при сохранении: " + error.message, "error");
    }
  }
}
