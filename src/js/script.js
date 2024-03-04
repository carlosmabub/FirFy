const ClientID = "762e09cf5e3d4b5e9c741e78b10fe94d"
const redirectURI = "https://fir-fy.vercel.app/src/pages/home.html"
const scope = "user-library-read user-follow-modify user-follow-read user-read-email user-read-private playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control ugc-image-upload"

const login = document.querySelector("#button")

login.addEventListener("click", (e) => {
    e.preventDefault()
    const apiURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${ClientID}&scope=${scope}&redirect_uri=${redirectURI}`

    login.setAttribute("href", apiURL)
    window.location.href = apiURL
})
