type NavigateCallback = (path: string) => void;

let navigateCallback: NavigateCallback | null = null;

export const setNavigateCallback = (callback: NavigateCallback) => {
  navigateCallback = callback;
};

export const navigateTo = (path: string) => {
  if (navigateCallback) {
    navigateCallback(path);
  } else {
    console.error("Navigate callback is not set. Ensure the Router is initialized.");
  }
};