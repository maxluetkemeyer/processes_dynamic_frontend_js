import { connectToDatabase } from "~/_components/graph_renderer/db";

export default async function Page() {

    const myLog = await connectToDatabase();

    return (
      <>
        <h1 className="text-2xl font-bold">Welcome to the Database tests!</h1>
        <p>{myLog.activities}</p>
        <p>{myLog.edges}</p>
      </>
    );
  }
  