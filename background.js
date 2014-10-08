var flag = false;

function blocking(info){
  return {redirectUrl: chrome.extension.getURL("result.html")};
}

chrome.browserAction.setIcon({path:"green.png"});

chrome.browserAction.onClicked.addListener(function(){
  if(flag)
  {
    flag = false;
    chrome.webRequest.onBeforeRequest.removeListener(blocking);
    chrome.browserAction.setIcon({path:"green.png"});
  }
  else
  {
    flag = true;
    chrome.webRequest.onBeforeRequest.addListener(
      blocking,
      // filters
      {
        urls: links,
        types: ["main_frame"]
      },
      // extraInfoSpec
      ["blocking"]);
    chrome.browserAction.setIcon({path:"red.png"});
  }
});
