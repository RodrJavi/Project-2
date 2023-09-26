const followUser = async () => {
  const username = window.location.pathname.split("/").pop();

  const response = await fetch("/api/users/followUser", {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("Successfully made follow request");
  }
};

document.querySelector("#followBtn").addEventListener("click", followUser);
