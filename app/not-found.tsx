export default function Custom404() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold">OOPS!</h1>
      <p className="text-xl mt-2 ">you're lost :(</p>
      <p className="mt-5 text-lg ">
        But don’t worry! here is the right path to
      </p>
      <a
        className="mt-4 inline-block px-5 py-3 bg-black text-white rounded-md"
        href="/"
      >
        Go home
      </a>
    </div>
  );
}
