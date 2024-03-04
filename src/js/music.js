import SpotifyApi from "./SpotifyApi.js";
import Render from "./Render.js";

document.addEventListener('DOMContentLoaded', async function() {
    let url = document.location.search.substring(1)
    let params = new URLSearchParams(url)
    let id = params.get("id");
    
    const token = localStorage.getItem("token")

    const $containerMain = document.querySelector("#containerMain")
    const $albumImagem = document.querySelector("#albumImagem")
    const $albumName = document.querySelector("#albumName")
    const $albumSinger = document.querySelector("#albumSinger")
    const $playBtn = document.getElementById("play-btn");

   
    let album = await SpotifyApi.getAlbum(token, id)
    let albumTrack = await SpotifyApi.getTrack(token, id)

    Render.renderTrack(albumTrack, $containerMain)
    Render.playBtn ($playBtn)

    $albumImagem.src = album.images[1].url
    $albumName.innerHTML = album.name
    $albumSinger.innerHTML = album.artists[0].name

    
}
)
