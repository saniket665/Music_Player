const search = document.querySelector(".search");
const playlists = document.querySelectorAll(".playlists");
const cards = document.querySelectorAll(".card");
const searchIconBig = document.querySelector(".search-icon-big");
const searchBar = document.querySelector(".searchbar");
const logo = document.querySelector(".logo");
const searchIcon = document.querySelector(".search-icon");
search.addEventListener("input", (e) => {
    playlists.forEach((playlist) => {
        let playlistTitle = playlist.querySelector(".title");
        let title = playlistTitle.innerHTML;
        if(title.includes(e.target.value) || title.toUpperCase().includes(e.target.value) || title.toLowerCase().includes(e.target.value)) {
        }
        else {
            playlist.style.display = "none";
        }
    }, changeDisplay(playlists));
})

function changeDisplay(data) {
    data.forEach(dataObj => {
        dataObj.style.display = "block";
    })
}

searchIconBig.addEventListener("click", () => {
    searchBar.classList.add("show-search");
    logo.style.display = "none";
    searchIconBig.classList.add("not-show");
});

searchIcon.addEventListener("click", () => {
    searchBar.classList.remove("show-search");
    logo.style.display = "inline-block";
    searchIconBig.classList.remove("not-show");
})

cards.forEach(card => {
    const playIcon = card.querySelector(".play-icon");
    playIcon.addEventListener("click", () => {
        const genre = card.querySelector(".info h3").innerHTML;
        const heading = card.parentElement.parentElement.firstElementChild.innerHTML;
        const img = card.querySelector("img").src;
        let obj = {
            Heading: heading,
            Genre: genre,
            Img: img
        }
        localStorage.setItem("heading", JSON.stringify(obj));
    })
})