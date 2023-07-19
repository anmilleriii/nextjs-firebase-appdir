export default function AuthLayout({ children }) {
  return (
    <main
      style={{
        textAlign: "center",
        width: "50%",
        margin: "auto",
        marginBlock: "15%",
        overflowY: "hidden",
      }}
    >
      <h1>Portal</h1>
      <p>
        This shows using Firebase in NextJS 13 with app directory,
        authenticating on both client and server.
      </p>
      {children}
    </main>
  );
}
