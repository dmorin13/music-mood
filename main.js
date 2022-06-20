//The user will enter a word and the API will return the tile of a song's lyrics that contains that word 
//(randomly generated) and then that songs lyrics will be searched in the spotify API and played via an audio integration, 
//if no matching song is found another song of similar theme wil be played 

//user input-- word or phrase- match that to a song "title"---> search spotify API for that song title


document.querySelector('button').addEventListener('click',catchAVibe)



function catchAVibe(){
  let song = document.querySelector('.song-input').value
  let artist=document.querySelector('.artist-input').value

  //https://genius.com/search?q=${vibes}

  //genius lyrics API: client ID : -KMem44FQcoySnlFoqKktsGGSr0SwTkKlpziKRgj7fdVNFwma-JL_hgkcsGc9H0h

  //  client secret: t_1NTELKUowrJssA6w1hc96XR6RKyOP7Z7YahZ6j_QdVMBeYu3bmxpxFVrBpqcpGCpd5c4OKfLDeeXhLbeOxTw 

  //client access token:  5-BlxCubKyz5p4wef3wdgKQrTHLQoG0aLFbpSCdI9Y2aEnGaUkUQomcg3BTX81G 

  // let url=`http://api.chartlyrics.com/apiv1.asmx/SearchLyricText?lyricText=${vibes}`

  let url =`https://api.lyrics.ovh/v1/${artist}/${song}`
  
  // let url = `https://api.musixmatch.com/ws/1.1/&apikey=2656ce1466285199be216f942ac70724f&?q=${vibes}`
  
  //http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP&track.lyrics.get?

  //GET https://private-anon-24c66a1b39-lyricsovh.apiary-proxy.com/v1/Coldplay/Adventure%20of%20a%20Lifetime?New%20item= 
  fetch(url)
  //res= result ---> parse it into JSON syntax ( parse response as JSON)
  .then(res => res.json())
  // data ---> pass the data retrieved into the function 
  .then(data =>{
  console.log(data)
  // document.querySelector('h2').innerText=
  // document.querySelector('img').src= 
  // document.querySelector('h3').innerText =

  // console.log(data)
  let lyrics= data.lyrics

  console.log(lyrics)
  document.querySelector('.p').innerText= lyrics
  document.querySelector('.h2').innerText=song


  let url2=`https://api.meaningcloud.com/sentiment-2.1?txt=${lyrics}&key=afd34233bc39d5d9de5fec52f609f811`
  
  fetch(url2)
  .then(res => res.json())
  console.log(res) //"response object" "request object" -"reqres" - meta data - header- body 
  .then(data =>{
  console.log(data)
  let score = data.score_tag 

  console.log(data.score_tag)
  console.log(data)

  if(score==="P+"||score==="P"){
    document.querySelector('.vibe').innerText= "It's an upbeat bop 😌"
    console.log('condition1')
  }
  else if(score==="N"||score==="N+"){
    document.querySelector('.vibe').innerText= "It's a chill vibe 🎼"
    console.log('condition2')
  }
  else if(score==="NEU"|| score==="NONE"){
    document.querySelector('.vibe').innerText= "In your feels much? 💙"
    console.log('condition3')
  }
  console.log(score)

  })

  
  document.querySelector('h2').innerText= document.querySelector('.song-input').value
  // document.querySelector('.p').innerText= lyrics
  //  document.querySelector('img').src= data
  
})

.catch(err =>{
  console.log(`error ${err}`)
})


}



//-----------------------

//SEE tutorial on how to integrate spotify API player 

// //Spotify API 
//  src="https://sdk.scdn.co/spotify-player.js"

// window.onSpotifyWebPlaybackSDKReady = () => {
//   const userAccessToken = "[99d68eeb302f4542affb98d5acdbebbc]";
//   const webPlayback = new Spotify.Player({
//     name: "Spotify Web Playback SDK",
//     getOAuthToken: callback => { callback(userAccessToken)}
//   });
//   webPlayback.connect();
// };

//idea for manipulating the API further to get more accurate results from the language- sentiment reader API 

//Lyric- api - project,loop through all sentiment scores in the object and if more than 1/2 or the majority of the responses are p return positive , if the majority are N then return negative, if neither is a majority or if NEU or NONE are the majority, return neutral message


