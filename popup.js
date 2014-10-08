//function blocking(info){
//  return {redirectUrl: chrome.extension.getURL("result.html")};
//}


var PopupController = function () {
  this.addButton = document.getElementById('addButton');
  //this.timeframe_ = document.getElementById('timeframe');
  this.addListeners_();
};

PopupController.prototype = {
  addButton: null,
  //timeframe_: null,
  flag: true,
  addListeners_: function () {
    this.addButton.addEventListener('click', this.handleClick_.bind(this));
  },

  handleCallback_: function () {
    var success = document.createElement('div');
    success.classList.add('overlay');
    success.setAttribute('role', 'alert');
    success.textContent = 'Data has been cleared.';
    document.body.appendChild(success);
  },
  blocking: function(){
			return {redirectUrl: chrome.extension.getURL("result.html")};      	
	      },
  handleClick_: function () {
	  if(this.flag)
	  {
	    this.flag = false;
	    chrome.webRequest.onBeforeRequest.removeListener(this.blocking);
	    chrome.browserAction.setIcon({path:"green.png"});
	  }
	  else
	  {
	    this.flag = true;
	    chrome.webRequest.onBeforeRequest.addListener(
	      this.blocking,
	      // filters
	      {
	        urls: ["*://dantri.com.vn/*"],
	        types: ["main_frame"]
	      },
	      // extraInfoSpec
	      ["blocking"]);
	    chrome.browserAction.setIcon({path:"red.png"});
	  }  
  }
};


document.addEventListener('DOMContentLoaded', function () {
	//chrome.browserAction.setIcon({path:"green.png"});
  	window.PC = new PopupController();
});
