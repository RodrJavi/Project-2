async function fetchUserFollowingList() {
    try{

        const response = await fetch('/api/users/following/user');

        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    }catch(error){}
}

fetchUserFollowingList();
