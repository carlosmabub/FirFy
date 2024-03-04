const client_id = "762e09cf5e3d4b5e9c741e78b10fe94d"
const client_secret = "56d2d731cf0f4344bf8ced9bd1fb96da"
const b64 = btoa(client_id + ":" + client_secret)

export default class SpotifyApi {
    static async getToken(code, grant_type, redirect_uri) {
        let body = {
            grant_type,
            code,
            redirect_uri
        }
    
        let responseToken = await axios({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            data: new URLSearchParams(Object.entries(body)).toString(),
            headers: {
                Authorization: `Basic ${b64}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        return responseToken.data.access_token
    }

    static async getUser(token){
        let userProfile = await axios ({
            method: "GET",
            url: "https://api.spotify.com/v1/me/",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return userProfile.data
    }

    static async getPlaylists(token) {
        let userPlaylists = await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me/playlists",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return userPlaylists.data.items
    }
    static async getAlbums(token) {
        let userAlbums = await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me/albums?limit=50",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return userAlbums.data
    }
    
    static async getAlbum(token, albumId) {
        let userAlbum = await axios({
            method: "GET",
            url: `https://api.spotify.com/v1/albums/${albumId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return userAlbum.data
    }

    static async getTrack(token, albumId) {
        let albumTrack = await axios({
            method: "GET",
            url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return albumTrack.data
    }

    static async track(token, trackId) {
        let track = await axios({
            method: "GET",
            url: `https://api.spotify.com/v1/tracks/${trackId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return track.data
    }
}