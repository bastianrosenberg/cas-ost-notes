import { THEME } from "../utils/constants.js";

// Theme switcher
const themeButton = document.querySelector(".header-buttons__theme");

const switchThemeValue = (theme) =>
  theme === THEME.LIGHT_VALUE ? THEME.DARK_VALUE : THEME.LIGHT_VALUE;

const switchThemeText = (theme) =>
  theme === THEME.LIGHT_VALUE ? THEME.DARK_TEXT : THEME.LIGHT_TEXT;

function handleThemeChangeEvent(event) {
  const currentValue = event.target.value;
  const bodyClassList = document.body.classList || THEME.LIGHT_VALUE;
  bodyClassList.toggle(THEME.DARK_VALUE);

  themeButton.value = switchThemeValue(currentValue);
  themeButton.textContent = switchThemeText(currentValue);

  localStorage.setItem(THEME.STORAGE_KEY, currentValue);
  socket.emit("theme", currentValue);
}

function initializeTheme() {
  const theme = localStorage.getItem(THEME.STORAGE_KEY);

  if (theme === THEME.DARK_VALUE) {
    document.body.classList.add(THEME.DARK_VALUE);
  } else {
    document.body.classList.remove(THEME.DARK_VALUE);
  }

  if (themeButton) {
    themeButton.value = theme ? switchThemeValue(theme) : THEME.DARK_VALUE;
    themeButton.textContent = theme ? switchThemeText(theme) : THEME.DARK_TEXT;
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
