// Theme switcher
const lightThemeValue = "light-theme";
const lightThemeText = "Light Theme";
const darkThemeValue = "dark-theme";
const darkThemeText = "Dark Theme";
const themeLocalStorageId = "theme";

const themeButton = document.querySelector(".header-buttons__theme");

const switchThemeValue = (theme) =>
  theme === lightThemeValue ? darkThemeValue : lightThemeValue;

const switchThemeText = (theme) =>
  theme === lightThemeValue ? darkThemeText : lightThemeText;

function handleThemeChangeEvent(event) {
  const currentValue = event.target.value;
  const bodyClassList = document.body.classList || lightThemeValue;
  bodyClassList.toggle(darkThemeValue);

  themeButton.value = switchThemeValue(currentValue);
  themeButton.textContent = switchThemeText(currentValue);

  localStorage.setItem(themeLocalStorageId, currentValue);
  socket.emit("theme", currentValue);
}

function initializeTheme() {
  const theme = localStorage.getItem(themeLocalStorageId);

  if (theme === darkThemeValue) {
    document.body.classList.add(darkThemeValue);
  } else {
    document.body.classList.remove(darkThemeValue);
  }

  if (themeButton) {
    themeButton.value = theme ? switchThemeValue(theme) : darkThemeValue;
    themeButton.textContent = theme ? switchThemeText(theme) : darkThemeText;
  }
}

// Initialization
function initEventHandlers() {
  themeButton?.addEventListener("click", (event) => {
    handleThemeChangeEvent(event);
  });
}

function init() {
  initializeTheme();
  initEventHandlers();
  socket.on("theme", () => {
    initializeTheme();
  });
}

init();
