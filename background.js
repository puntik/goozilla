/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// alert('Hello from background.js');

var min = 1;
var max = 5;
var current = min;

function updateIcon() {
    chrome.browserAction.setBadgeText({text: current.toString()});
    current++;
}

chrome.browserAction.onClicked.addListener(updateIcon);
// updateIcon();