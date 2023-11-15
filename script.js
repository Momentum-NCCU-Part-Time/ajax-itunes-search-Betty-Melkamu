let term = "";
const updateTerm = () => {
  term = document.getElementById("searchTerm").value;
  if (!term || term === "") {
    alert("Please enter a seach term");
  } else {
    const url = `https://itunes.apple.com/search?term=${term}`;
    const mainContainer = document.getElementById("container");
    while (mainContainer.firstChild) {
      mainContainer.removeChild(mainContainer.firstChild);
    }
    fetch(url)
      .then((Response) => Response.json())
      .then((data) => {
        const musicInfo = data.results;
        return musicInfo.map((result) => {
          const singleUnit = document.createElement("singleUnit"),
            artists = document.createElement("p"),
            song = document.createElement("h4"),
            img = document.createElement("img"),
            audio = document.createElement("audio"),
            audioSource = document.createElement("source");

          artists.innerHTML = result.artistName;
          song.innerHTML = result.trackName;
          img.src = result.artworkUrl100;
          audioSource.src = result.previewUrl;
          audio.controls = true;

          singleUnit.appendChild(img);
          singleUnit.appendChild(artists);
          singleUnit.appendChild(song);
          singleUnit.appendChild(audio);
          audio.appendChild(audioSource);

          mainContainer.appendChild(singleUnit);
        });
      })
      .catch((error) => console.log("Request failed:", error));
  }
};

const searchBtn = document.getElementById("searchTermBtn");
searchBtn.addEventListener("click", updateTerm);

const enterKey = document.getElementById("searchTerm");
enterKey.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    updateTerm();
  }
});

document.addEventListener(
  "play",
  (event) => {
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < audio.length; i++) {
      if (audio[i] != event.target) {
        audio[i].pause();
      }
    }
  },
  true
);
