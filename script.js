//You can edit ALL of the code here
// function becomes async as we need to wait for data before building the episode cards
async function setup() {
  // const allEpisodes = getAllEpisodes();
  let input = "https://api.tvmaze.com/shows/82/episodes";
  const allEpisodes = await fetchMovies(input);
  makePageForEpisodes(allEpisodes);
  makeShowDropdown();
}

async function rebuildPage(input) {
  document.querySelector("#allEpisodesContainer").innerHTML = "";
  document.querySelector("#episodeDropdownList").innerHTML = "";
  const allEpisodes = await fetchMovies(input);
  makePageForEpisodes(allEpisodes);
  makeShowDropdown();
}

async function fetchMovies(showURL) {
  const response = await fetch(showURL);
  return response.json();
}

function makeShowDropdown() {
  const showList = getAllShows();
  showList.sort((a, b) => (a.name > b.name ? 1 : -1));
  const dropdownElement = document.querySelector("#showDropdownList");
  showList.forEach((show) => {
    let newOptionElement = document.createElement("option");
    newOptionElement.innerText = show.name;
    newOptionElement.value = show.id;
    dropdownElement.append(newOptionElement);
  });
}

function reorderDropdownList() {
  document.querySelector("");
}

const showDropdownSelect = document.querySelector("#showDropdownList");
showDropdownSelect.addEventListener("change", function () {
  let showID = showDropdownSelect.value;
  let apiURL = `https://api.tvmaze.com/shows/${showID}/episodes`;
  rebuildPage(apiURL);
});

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
    episodeContainer.id = `S${seasonVar}E${episodeVar}`;
    let episodeTitleElement = document.createElement("h2");
    episodeTitleElement.innerText = `${episode.name} - S${seasonVar}E${episodeVar}`;
    episodeTitleElement.classList.add("title");
    episodeTitleElement.classList.add("border");
    let episodeImgElement = document.createElement("img");
    episodeImgElement.src = episode.image.medium;
    let episodeSummaryElement = document.createElement("p");
    episodeSummaryElement.classList.add("margin", "summary");
    episodeSummaryElement.innerHTML = episode.summary;
    episodeContainer.append(
      episodeTitleElement,
      episodeImgElement,
      episodeSummaryElement
    );
    allEpisodesContainerElement.append(episodeContainer);
    let createNewDropdownOption = document.createElement("option");
    let episodeDropdownElement = document.querySelector("#episodeDropdownList");
    createNewDropdownOption.innerText = `S${seasonVar}E${episodeVar}: ${episode.name}`;
    createNewDropdownOption.value = `S${seasonVar}E${episodeVar}`;
    episodeDropdownElement.append(createNewDropdownOption);
  });
  let copyrightElement = document.createElement("p");
  copyrightElement.innerText = "Data came from TVMaze.com";
  footerElement = document.querySelector("footer");
  footerElement.append(copyrightElement);
  console.log(episodeList);
  console.log(footerElement);
}
//create a dropdown option element and append to dropdown option element
let episodeDropdownElement = document.querySelector("#episodeDropdownList");
episodeDropdownElement.addEventListener("change", function () {
  window.location = `#${episodeDropdownElement.value}`;
});

let searchInputElement = document.querySelector("#searchBox");
searchInputElement.addEventListener("input", test4);

function test() {
  alert("All good!");
}

function test2() {
  let searchText = searchInputElement.value;
  console.log(searchText);
}

function test3() {
  cacheAllEpisodes.forEach((episode) => {
    let searchText = searchInputElement.value.toLowerCase();
    if (episode.name.toLowerCase().includes(searchText)) {
      console.log(episode.name);
    }
  });
}

function test4() {
  let filteredArr = document.querySelectorAll(".episodeCard");
  let episodeCounterDisplay = document.querySelector("#episodeCounterDisplay");
  episodeCounterDisplay.clear;
  console.log(episodeCounterDisplay);
  let hiddenEpisodeCounter = 0;
  filteredArr.forEach((element) => {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    }
    let searchText = searchInputElement.value.toLowerCase();
    let summary = element.querySelector(".summary");
    let title = element.querySelector(".title");
    if (title.textContent.toLowerCase().includes(searchText) === false) {
      if (summary.textContent.toLowerCase().includes(searchText) === false) {
        element.classList.add("hidden");
        hiddenEpisodeCounter++;
      }
    }

    if (searchText.length === 0) {
      episodeCounterDisplay.innerText = "";
    } else {
      episodeCounterDisplay.innerText = `Matching result: ${
        filteredArr.length - hiddenEpisodeCounter
      }/${filteredArr.length}`;
    }
  });
}

window.onload = setup;
