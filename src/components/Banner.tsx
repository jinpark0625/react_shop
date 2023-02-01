export default function Banner() {
  return (
    <section className="relative h-96 bg-yellow-900">
      <div className="h-full w-full bg-banner bg-cover opacity-80"></div>
      <div className="absolute top-32 w-full text-center text-gray-50 drop-shadow-2xl">
        <h2 className="text-6xl">Shop With Us</h2>
        <p className="text-2xl">Best Products, High Quality</p>
      </div>
    </section>
  );
}
