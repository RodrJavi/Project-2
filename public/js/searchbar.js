const searchBar = document.getElementById("searchbar");

// functrion to seach for thet user
async function searchUser() {
  const username = searchBar.value.trim();
  console.log(username);

  try {
    // Checks to see if a route to if the user exists
    const response = await fetch(`/api/users/${username}`);

    // If the user exists, directed to that user profile page
    if (response.ok) {
      const user = await response.json();
      document.location.replace(`/profile/${username}`);

      // If user does not exist, redirect to homepage
    } else {
      document.location.replace("/");
    }
  } catch (error) {}
}

// Event listener that listens for enter key press
searchBar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchUser();
  }
});
