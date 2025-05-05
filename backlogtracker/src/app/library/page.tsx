import Header from "@/components/Header";

export default function Library() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <h1 className="text-4x1 font-bold text-gray-900 text-center mb-8">Library</h1>
      <section className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">My games</h2>
        <p className="text-gray-700">
          This is where you can view your games and the progress you have made.
        </p>
      </section>
    </main>
  )
}