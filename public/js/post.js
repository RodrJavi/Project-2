const postFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector("#post-content").value.trim();
    const postDate = new Date();
    const backgroundImage = "temporarystring"


    if (content) {
        const response = await fetch("/api/users/post", {
            method: "POST",
            body: JSON.stringify({ content, postDate, backgroundImage }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert("Error posting");
        }
    }
    else {
        alert("Post can not be empty");
    }
};

document
    .querySelector(".post-form")
    .addEventListener("submit", postFormHandler);
