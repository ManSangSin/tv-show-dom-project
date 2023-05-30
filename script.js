//You can edit ALL of the code here
// function becomes async as we need to wait for data before building the episode cards
const listOfShows = getAllShows();
const rootElem = document.getElementById("root");
//500 setup
async function setup500() {
  rootElem.innerHTML = "";
  buildShowDropdown(listOfShows);
  buildSearchInput();
  buildSearchCounter();
  buildPageForShows(listOfShows);
  buildFooter();
  showDropdownAction();
  searchInputAction();
}

async function rebuildPage(selectedShowURL) {
  rootElem.innerHTML = "";
  buildShowDropdown(listOfShows);
  buildSearchInput();
  buildSearchCounter();
  const allEpisodes = await fetchShowObject(selectedShowURL);
  buildEpisodeDropdown(allEpisodes);
  buildResetButton();
  buildPageForEpisodes(allEpisodes);
  showDropdownAction();
  episodeDropdownAction();
  searchInputAction();
  resetButtonAction();
  buildFooter();
}

function sortList(unorderedList) {
  return unorderedList.sort((a, b) => (a.name > b.name ? 1 : -1));
}

function buildShowDropdown(showList) {
  let showListSorted = sortList(showList);
  let dropdownElement = document.createElement("select");
  dropdownElement.id = "showDropdownList";
  rootElem.append(dropdownElement);
  showListSorted.forEach((show) => {
    let newOptionElement = document.createElement("option");
    newOptionElement.innerText = show.name;
    newOptionElement.value = show.id;
    dropdownElement.append(newOptionElement);
  });
}

function buildSearchInput() {
  let searchBoxElement = document.createElement("input");
  searchBoxElement.type = "text";
  searchBoxElement.id = "searchBox";
  rootElem.appendChild(searchBoxElement);
}

function buildPageForShows(showList) {
  showList.forEach((show) => {
    let showContainer = document.createElement("div");
    showContainer.classList.add("showCard", "searchClass");
    let showTitleElement = document.createElement("h2");
    showTitleElement.innerText = `${show.name}`;
    showTitleElement.classList.add("title", "border");
    let showInfoContainer = document.createElement("div");
    let showImgElement = document.createElement("img");
    if (show.image) {
      showImgElement.src = show.image.medium;
    } else {
      console.log(`${show.name} input is falsy`);
    }
    let showSummaryElement = document.createElement("p");
    showSummaryElement.classList.add("margin", "summary");
    showSummaryElement.innerHTML = show.summary;
    //rating, genres, status, runtime
    showExtraInfoContainer = document.createElement("div");
    showRatingElement = document.createElement("p");
    showRatingElement.innerText = `Rated: ${show.rating.average}`;
    showGenreElement = document.createElement("p");
    showGenreElement.innerText = `Genres: ${show.genres}`;
    showGenreElement.classList.add("genre");
    showStatusElement = document.createElement("p");
    showStatusElement.innerText = `Status: ${show.status}`;
    showRuntimeElement = document.createElement("p");
    showRuntimeElement.innerText = `Runtime: ${show.runtime}`;
    showExtraInfoContainer.append(
      showRatingElement,
      showGenreElement,
      showStatusElement,
      showRuntimeElement
    );
    showInfoContainer.append(
      showImgElement,
      showSummaryElement,
      showExtraInfoContainer
    );
    showInfoContainer.classList.add("flex");
    showContainer.append(showTitleElement, showInfoContainer);
    showContainer.addEventListener("click", test);
    rootElem.append(showContainer);
  });
}

function test() {
  alert("Hi");
}

function showDropdownAction() {
  const showDropdownSelect = document.querySelector("#showDropdownList");
  showDropdownSelect.addEventListener("change", function () {
    let showID = showDropdownSelect.value;
    let apiURL = `https://api.tvmaze.com/shows/${showID}/episodes`;
    rebuildPage(apiURL);
  });
}

async function fetchShowObject(showURL) {
  const response = await fetch(showURL);
  return response.json();
}

function getNumberDoubleDigit(number) {
  if (number < 10) {
    number = `0${number}`;
  }
  return number;
}

function buildPageForEpisodes(episodeList) {
  let allEpisodesContainerElement = document.createElement("div");
  allEpisodesContainerElement.id = "allEpisodesContainer";
  allEpisodesContainerElement.classList.add("allEpisodesContainer");
  episodeList.forEach((episode) => {
    let episodeContainer = document.createElement("div");
    episodeContainer.classList.add("episodeCard", "searchClass");
    let seasonVar = getNumberDoubleDigit(episode.season);
    let episodeVar = getNumberDoubleDigit(episode.number);
    episodeContainer.id = `S${seasonVar}E${episodeVar}`;
    let episodeTitleElement = document.createElement("h2");
    episodeTitleElement.innerText = `${episode.name} - S${seasonVar}E${episodeVar}`;
    episodeTitleElement.classList.add("title", "border");
    let episodeImgElement = document.createElement("img");
    if (episode.image) {
      episodeImgElement.src = episode.image.medium;
    }
    let episodeSummaryElement = document.createElement("p");
    episodeSummaryElement.classList.add("margin", "summary");
    episodeSummaryElement.innerHTML = episode.summary;
    episodeContainer.append(
      episodeTitleElement,
      episodeImgElement,
      episodeSummaryElement
    );
    allEpisodesContainerElement.append(episodeContainer);
  });
  rootElem.appendChild(allEpisodesContainerElement);
}

function buildFooter() {
  let copyrightElement = document.createElement("p");
  copyrightElement.innerText = "Data came from TVMaze.com";
  rootElem.appendChild(copyrightElement);
}

function buildEpisodeDropdown(episodeList) {
  let episodeDropdownElement = document.createElement("select");
  episodeDropdownElement.id = "episodeDropdownList";
  episodeList.forEach((episode) => {
    let seasonVar = getNumberDoubleDigit(episode.season);
    let episodeVar = getNumberDoubleDigit(episode.number);
    let createNewDropdownOption = document.createElement("option");
    createNewDropdownOption.innerText = `S${seasonVar}E${episodeVar}: ${episode.name}`;
    createNewDropdownOption.value = `S${seasonVar}E${episodeVar}`;
    episodeDropdownElement.append(createNewDropdownOption);
    rootElem.append(episodeDropdownElement);
  });
}

function buildResetButton() {
  let resetButtonElement = document.createElement("input");
  resetButtonElement.id = "resetButton";
  resetButtonElement.type = "button";
  resetButtonElement.value = "Return to Show List";
  rootElem.appendChild(resetButtonElement);
}

function resetButtonAction() {
  let resetButtonElement = document.getElementById("resetButton");
  resetButtonElement.addEventListener("click", setup500);
}

function episodeDropdownAction() {
  //create a dropdown option element and append to dropdown option element
  let episodeDropdownElement = document.getElementById("episodeDropdownList");
  episodeDropdownElement.addEventListener("change", function () {
    window.location = `#${episodeDropdownElement.value}`;
  });
}

function searchInputAction() {
  let searchInputElement = document.getElementById("searchBox");
  searchInputElement.addEventListener("input", searchAsYouType);
}

function searchAsYouType() {
  let searchInputElement = document.getElementById("searchBox");
  let filteredArr = document.querySelectorAll(".searchClass");
  let hiddenEpisodeCounter = 0;
  filteredArr.forEach((element) => {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    }
    let searchText = searchInputElement.value.toLowerCase();
    let summary = element.querySelector(".summary");
    let title = element.querySelector(".title");
    let genre = element.querySelector(".genre");
    if (title.textContent.toLowerCase().includes(searchText) === false) {
      if (summary.textContent.toLowerCase().includes(searchText) === false) {
        if (genre.textContent.toLowerCase().includes(searchText) === false) {
          element.classList.add("hidden");
          hiddenEpisodeCounter++;
        }
      }
    }
    updateCounter(hiddenEpisodeCounter, searchText, filteredArr);
  });
}

function buildSearchCounter() {
  let counterDisplayElement = document.createElement("p");
  counterDisplayElement.id = "counterDisplay";
  rootElem.appendChild(counterDisplayElement);
}

function updateCounter(hiddenCount, searchText, filteredArr) {
  let counterDisplay = document.getElementById("counterDisplay");
  counterDisplay.clear;
  console.log(counterDisplay);
  if (searchText.length === 0) {
    counterDisplay.innerText = "";
  } else {
    counterDisplay.innerText = `Matching result: ${
      filteredArr.length - hiddenCount
    }/${filteredArr.length}`;
  }
}

window.onload = setup500;
