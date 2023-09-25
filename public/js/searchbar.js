const searchBar = document.getElementById('searchbar');

async function searchUser(){
    const username = searchBar.value.trim();
    console.log(username);

    try{
        const response = await fetch (`/api/users/${username}`)

        if(response.ok){
            const user = await response.json();
            document.location.replace(`/profile/${username}`);

        }else{
            document.location.replace("/")
        }
        
    }catch(error){

    }

}

searchBar.addEventListener("keydown", function (event){
    if(event.key === "Enter"){
        event.preventDefault();
        // console.log("Running search")
        searchUser();
    }
});

