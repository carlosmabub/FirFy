import SpotifyApi from "./SpotifyApi.js";
import Render from "./render.js";
export let playlists = ""

const $userName = document.querySelector("#userName")
const $playlists = document.querySelector("#playlists")
const $userImage = document.querySelector("#userImage")
const $container = document.querySelector("#container-main")

document.addEventListener('DOMContentLoaded', async function() {
    let url = document.location.search.substring(1)
    let params = new URLSearchParams(url)
    let code = params.get("code")
    const redirect_uri = "https://fir-fy.vercel.app/src/pages/home.html"
    const grant_type = "authorization_code"
    
    let token = ""
    let user = ""
    let playlists = ""
    var albums = ""
    
    token = await SpotifyApi.getToken(code, grant_type, redirect_uri)
    localStorage.setItem("token",token)
   
    user = await SpotifyApi.getUser(token)
   
    playlists = await SpotifyApi.getPlaylists(token)
    
    albums = await SpotifyApi.getAlbums(token)
    
    
    Render.renderPlaylists(playlists, $playlists)

    Render.renderUserImage(user, $userImage)

    Render.renderAlbumCard(albums, $container)

       
    $userName.innerHTML = `Bom dia, ${user.display_name}`

}
);

