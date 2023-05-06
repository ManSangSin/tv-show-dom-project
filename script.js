//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  allEpisodesContainerElement = document.querySelector("#allEpisodesContainer");
  episodeList.forEach((episode) => {
    episodeContainer = document.createElement("div");
    episodeTitleElement = document.createElement("h2");
    episodeTitleElement.innerText = episode.name;
    episodeImgElement = document.createElement("img");
    episodeImgElement.src = episode.image.medium;
    episodeContainer.append(episodeTitleElement, episodeImgElement);
    allEpisodesContainerElement.append(episodeContainer);
  });
  console.log(episodeList);
}

window.onload = setup;
