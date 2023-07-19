// import { } from '

export default async function Dashboard() {
  // get user
  const response = await fetch("/api/user");
  // const data = await response.json();
  return (
    <div>
      <p>This is a protected route. Accessed from SSR.</p>
      <p>Welcome {"data"}!</p>
    </div>
  );
}
