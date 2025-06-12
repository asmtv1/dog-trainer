export default function OfflinePage() {
  const handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-semibold mb-4">Кажется, вы офлайн 📴</h1>
      <p className="mb-6 text-lg">
        Похоже, соединение с интернетом потеряно. Проверьте подключение и
        попробуйте снова.
      </p>
      <button
        onClick={handleReload}
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Перезагрузить
      </button>
    </main>
  );
}
