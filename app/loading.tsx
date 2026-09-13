const App = () => {
  return <div role="status" aria-label="Loading page" className="container max-w-7xl px-5 py-16 sm:px-8"><div className="h-3 w-40 rounded-sm bg-secondary motion-safe:animate-pulse" /><div className="mt-5 h-14 max-w-lg rounded-md bg-secondary motion-safe:animate-pulse" /><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[0, 1, 2, 3].map((index) => <div key={index} className="h-72 rounded-lg bg-secondary motion-safe:animate-pulse" />)}</div><span className="sr-only">Preparing something delicious…</span></div>;
};
export default App;
