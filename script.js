//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  let allEpisodesContainerElement = document.querySelector(
    "#allEpisodesContainer"
  );
  episodeList.forEach((episode) => {
    let episodeContainer = document.createElement("div");
    episodeContainer.classList.add("episodeCard");
    let episodeVar = episode.number;
    if (episodeVar < 10) {
      episodeVar = `0${episode.number}`;
    }
    let seasonVar = episode.season;
    if (seasonVar < 10) {
      seasonVar = `0${episode.season}`;
    }
    let episodeTitleElement = document.createElement("h2");
    episodeTitleElement.innerText = `${episode.name} - S${seasonVar}E${episodeVar}`;
    episodeTitleElement.classList.add("border");
    let episodeImgElement = document.createElement("img");
    episodeImgElement.src = episode.image.medium;
    let episodeSummaryElement = document.createElement("p");
    episodeSummaryElement.classList.add("margin");
    episodeSummaryElement.innerText = episode.summary
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")
      .replaceAll("<br>", "");
    episodeContainer.append(
      episodeTitleElement,
      episodeImgElement,
      episodeSummaryElement
    );
    allEpisodesContainerElement.append(episodeContainer);
  });
  let copyrightElement = document.createElement("p");
  copyrightElement.innerText = "Data came from TVMaze.com";
  footerElement = document.querySelector("footer");
  footerElement.append(copyrightElement);
  console.log(episodeList);
  console.log(footerElement);
}

window.onload = setup;
