import { useLoaderData } from "react-router";

const DashboardPage = () => {
  const user = useLoaderData();
  return <div>Welcome, {user.name}</div>;
};

export default DashboardPage;
