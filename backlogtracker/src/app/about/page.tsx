import Header from '@/components/Header';

export default function About() {
    return (
        <main className="min-h-screen bg-gray-100 text-gray-900">
            <Header />

            <section className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Welcome!</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                Many of us tend to have a backlog of stuff that we have yet to complete. This goes doubly so for video games, as the alure of buying a brand new game is ever present and there is a huge tendency of buying a game, playing it once, and never touching it again, wasting so much money in the process.
                </p>

                <h2 className="text-2xl font-semibold mb-4 mt-4 text-center">Our Goal</h2>
                <p className="text-gray-700 text-center leading-relaxed">
                With this application, we aim to help you keep track of your backlog of video games. You can add games that you own directly to this service, and update your progress through the game as you play, whether the game still needs to be played, being currently played, completed, or abandoned.<br/>
                </p>
                <p className="text-gray-700 mb-4 mt-4 text-center leading-relaxed">
                There is also plans to link this service with your steam library in the future (sorry console fans, that is a harder task that I don't have the time to focus on right now), so games can be automatically imported into your backlog.<br/>
                </p>
                <p className="text-gray-700 mb-4 mt-4 text-center leading-relaxed">
                Many of the games that we buy and don't play deserve our attention just as much as the games we play often, and many gamers are in need of a way to save some of the money they have, and this acts as a solution to both of those problems.
                </p>
            </section>
        </main>
    )
}