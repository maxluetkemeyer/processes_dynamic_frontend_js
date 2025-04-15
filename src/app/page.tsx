import Dashboard from "~/components/dashboard";

export default function Home() {
  return (
    <Dashboard>
      <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
      <p className="text-lg">This is your main content area.</p>
      <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
      <div className="bg-muted/50 mx-auto h-[100vh] w-full max-w-3xl rounded-xl" />
    </Dashboard>
  );
}
