// let audio = ""
// let previewUrl = ""
// const $playBtn = document.getElementById("play-btn");

export default class Render {
    static renderPlaylists(playlists, $playlists){
        for (let i = 0; i < 5; i++) {
            const playlist = playlists[i];
            const playlistLink = document.createElement('a');
            playlistLink.textContent = playlist.name;
            playlistLink.id = "playlist"
            playlistLink.href = playlist.external_urls.spotify;
            playlistLink.target = '_blank';
    
            $playlists.appendChild(playlistLink);
        }
    }

    static renderUserImage (user, $userImage){
        $userImage.src = user.images[1].url
    }

    static async renderAlbumCard(albums, $container){
        for (let i = 0; i < albums.items.length; i++) {
            const album = await albums.items[i].album; 
            
            const card = document.createElement("a");
            card.setAttribute("href", `https://fir-fy.vercel.app/src/pages/music.html?id=${album.id}`);
            card.setAttribute("id", `card`);
            
            const albumImage = document.createElement("img");
            albumImage.setAttribute("src", album.images[1].url);
            albumImage.setAttribute("alt", "");
            albumImage.setAttribute("id", `albumImage`); 

            const albumName = document.createElement("h1");
            albumName.textContent = album.name;
            albumName.setAttribute("id", `albumName`); 
            
            const albumSinger = document.createElement("h2");
            albumSinger.textContent = album.artists[0].name;
            albumSinger.setAttribute("id", `albumSinger`); 
            
            card.appendChild(albumImage);
            card.appendChild(albumName);
            card.appendChild(albumSinger);
            
            $container.appendChild(card);
        }
    }

    static async renderTrack(albumTrack, $containerMain){
        for (let i = 0; i < albumTrack.items.length; i++) {
            const track = await albumTrack.items[i]
            console.log(i)

            const songList = document.createElement("div");
            songList.setAttribute("id", `songList`);
            songList.addEventListener("click", () => {
                previewUrl = track.preview_url
                console.log(track.preview_url)
                this.playTrack($playBtn)
                this.resolvePlayTrack()
            })
            const numName = document.createElement("div");
            numName.setAttribute("id", `numName`); 
                
            const trackNumber = document.createElement("h2");
            trackNumber.textContent = `${1+i}`;
            trackNumber.setAttribute("id", `trackNumber`); 
            
            const trackInfo = document.createElement("div");
            trackInfo.setAttribute("id", `trackInfo`); 
            
            const musicName = document.createElement("h1");
            musicName.textContent = track.name;
            musicName.setAttribute("id", `musicName`);
    
            const singer = document.createElement("h2");
            singer.textContent = track.artists[0].name;
            singer.setAttribute("id", `singer`);
    
            const trackTime = document.createElement("h2");
            let timer = track.duration_ms/60000
            let duracaoFormatada = timer.toFixed(2).replace(".", ":")
            trackTime.textContent = duracaoFormatada ;
            trackTime.setAttribute("id", `trackTime`);
    
            trackInfo.appendChild(musicName);
            trackInfo.appendChild(singer);
            numName.appendChild(trackNumber);
            numName.appendChild(trackInfo);
            songList.appendChild(numName);
            songList.appendChild(trackTime);
            
            $containerMain.appendChild(songList);
        }
    }

    static async playTrack ($playBtn) {
        console.log("playTrack chamado")
        this.playTrackPromise = new Promise((resolve) => {
            this.resolvePlayTrack = resolve;
        });
        await this.playTrackPromise;
        
        $playBtn.addEventListener("click", function() {
             
            if (audio.paused) {
                audio.play();
                $playBtn.classList.remove("bi-play-circle-fill");
                $playBtn.classList.add("bi-pause-circle-fill");
            } else {
                audio.pause();
                $playBtn.classList.remove("bi-pause-circle-fill");
                $playBtn.classList.add("bi-play-circle-fill");
            }
            console.log(!audio)
        });

        if (!audio) {
            audio = new Audio(previewUrl);
            $playBtn.classList.remove("bi-play-circle-fill"); //funciona
            $playBtn.classList.add("bi-pause-circle-fill"); //funciona
            audio.addEventListener('ended', () => {
                audio = null;
            });
        } else {
            audio.pause();
            audio.src = previewUrl;
        }
        audio.play();

        
    }
}