import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((message: any) => {
  if (message.action === "open-options") {
    browser.runtime.openOptionsPage();
  }
});

browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    browser.runtime.openOptionsPage();
  }
});
