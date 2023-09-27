const unfollowUser = async () => {
    try {
        const username = window.location.pathname.split("/").pop();
        console.log(username);

        const response = await fetch(`/api/users/unfollow`, {
            method: "DELETE",
            body: JSON.stringify({ username }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            console.log(`Successfully unfollowed ${username}`);
        } else {
            console.log(response);
            console.log(`Error unfollowing ${username}`);
        }

        location.reload();

    }
    catch (error) {
        console.error("Error unfollowing", error);
    }
}

document.querySelector("#unfollowBtn").addEventListener("click", unfollowUser);