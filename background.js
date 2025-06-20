chrome.tabs.onCreated.addListener((tab) => {
  const url = tab.pendingUrl || tab.url || "";
  if (url.startsWith("chrome://newtab") || url === "about:blank") {
    chrome.tabs.update(tab.id, { url: "http://e/" });
  }
});
