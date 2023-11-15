//Search term is key
//Term starts as an empty string
let term = "";

//This function takes the user's input and sets it as the new value of term
const updateTerm = () => {
  term = document.getElementById("searchTerm").value;

  //This checks if input was not a string or was left empty and returns an alert
  if(!term || term === "") {
    alert("Please enter a search term");
  }
  //If no error, then the term is looked up in the API
  else {
    const url = `https://itunes.apple.com/search?term=${term}`;
    const mainContainer = document.getElementById("container");

    //Each search adds a child to our container
    //We don't want to keep every search we ever make on the page
    //So this while loop will delete our old child when we make a new one
    while(mainContainer.firstChild){
    mainContainer.removeChild(mainContainer.firstChild);
    }
    //A fetch request is made to get info related to the term
    //? The API lets us know if we can get the info by returning a Promise?
    //If that goes through then we recieve a large body of text from the API
    //The response is taken and then parsed into a JS Object with key/value pairs
    //We take that object and use the map method to turn it into an array w/the info we want

    fetch(url)
      .then((Response) => Response.json())
      .then((data) => {
        const musicInfo = data.results;
        return musicInfo.map((result) => {
          //Each song or "box of info" is being called singleUnit
          //Here we are creating the HTML elements we want
          const singleUnit = document.createElement("singleUnit"),
            artist = document.createElement("p"),
            song = document.createElement("h4"),
            img = document.createElement("img"),
            audio = document.createElement("audio"),
            audioSource = document.createElement("source");

          //Here we add the appropriate content to each element
          artist.innerHTML = result.artistName;
          song.innerHTML = result.trackName;
          img.src = result.artworkUrl100;
          audioSource.src = result.previewUrl;
          audio.controls = true;

          //Now we take those elements and bundle them together in a singleUnit
          singleUnit.appendChild(img);
          singleUnit.appendChild(artist);
          singleUnit.appendChild(song);
          singleUnit.appendChild(audio);
          audio.appendChild(audioSource);

          //Then we take all the individual units and bundle them tigether in a container
          mainContainer.appendChild(singleUnit);
        })
      }) //If the API isn't able to get anything we'll get an error
      .catch(error=>console.log("Request failed:", error));
  }
}

//Now we want to get our search button functioning
//When the button is clicked, our updateTerm function will run
const searchBtn = document.getElementById("searchTermBtn");
searchBtn.addEventListener("click", updateTerm);


//Now we can search just by pressing the enter key
const enterKey = document.getElementById("searchTerm");
enterKey.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    updateTerm();
  }
});

//We don't want multiple audio samples to play at the same time
//So this function loops through a playing sample
//If another sample is clicked before the first sample is over
//It will pause the music of the first sample
document.addEventListener("play", event => {
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < audio.length; i++) {
      if (audio[i] != event.target) {
        audio[i].pause();
      }
    }
  },true)
//End of the pausing loop
