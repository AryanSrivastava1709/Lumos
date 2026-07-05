function Chat({ username, status }) {
  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      <h1 className="text-5xl font-bold">
        {status === "created"
          ? `Welcome, ${username}!`
          : `Welcome back, ${username}!`}
      </h1>
    </div>
  );
}

export default Chat;
