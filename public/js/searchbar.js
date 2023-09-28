const searchBar = document.getElementById("searchbar");

async function searchUser() {
  // Removes whitespace from text input and stores into username variable
  const username = searchBar.value.trim();

  try {
    const response = await fetch(`/api/users/${username}`);

    if (response.ok) {
      const user = await response.json();
      document.location.replace(`/profile/${username}`);
    } else {
      document.location.replace("/");
    }
  } catch (error) {}
}

searchBar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchUser();
  }
});
