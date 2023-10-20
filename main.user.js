// ==UserScript==
// @name         国家中小学智慧教育平台电子课本下载
// @namespace    https://github.com/willkwok2019/smartedu-book-download
// @version      1.0.0
// @description  在国家中小学智慧教育平台网站中添加电子课本下载按钮，免登录下载电子课本
// @author       WillKwok
// @match        https://*.smartedu.cn/tchMaterial/detail*
// @match        https://*.smartedu.cn/elecedu/detail*
// @match        https://www.zxx.edu.cn/tchMaterial/detail*
// @icon         https://basic.smartedu.cn/favicon.ico
// @license      MIT
// @grant        none
// ==/UserScript==

var styleElement = document.createElement('style');
var customStyles = `
  .download-this-book {
    width: 64px;
    font-size: 12px;
    color: #fff;
    background-color: #1e62ec;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2Ij48cmVjdCBzdHlsZT0iZmlsbDojZmZmIiB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHJ4PSI3LjY4IiByeT0iNy42OCIvPjxwYXRoIGNsYXNzPSJkIiBzdHlsZT0iZmlsbDojMWQ2MmVjIiBkPSJtMjguNzIsMzAuOEg3LjI4Yy0xLjc1LDAtMy4xNy0xLjQyLTMuMTctMy4xN3YtMTFjMC0xLjc1LDEuNDItMy4xNywzLjE3LTMuMTdoNC40MmMuNTEtLjAzLjk2LjM2Ljk5Ljg4LjAzLjUxLS4zNi45Ni0uODguOTktLjA0LDAtLjA3LDAtLjExLDBoLTQuNDJjLS43MiwwLTEuMy41OC0xLjMxLDEuMzF2MTFjMCwuNzIuNTgsMS4zLDEuMzEsMS4zMWgyMS40NWMuNzIsMCwxLjMtLjU4LDEuMzEtMS4zMXYtMTFjMC0uNzItLjU4LTEuMzEtMS4zMS0xLjMxaC00LjE1Yy0uNTEuMDMtLjk2LS4zNi0uOTktLjg4LS4wMy0uNTEuMzYtLjk2Ljg4LS45OS4wNCwwLC4wNywwLC4xMSwwaDQuMTVjMS43NSwwLDMuMTcsMS40MiwzLjE3LDMuMTd2MTFjMCwxLjc1LTEuNDIsMy4xNy0zLjE3LDMuMTdaIi8+PHBhdGggc3R5bGU9ImZpbGw6I2ZmN2MyNSIgZD0ibTE4LDI1LjIxYy0uNTYsMC0xLjA5LS4yMi0xLjQ4LS42MWwtNS40OC01LjQ3Yy0uMzQtLjM5LS4zMS0uOTguMDgtMS4zMi4zNS0uMzIuODktLjMyLDEuMjQsMGw1LjQ4LDUuNDhjLjA5LjA5LjI0LjA5LjMzLDBsNS40OC01LjQ4Yy4zOC0uMzUuOTctLjMyLDEuMzIuMDYuMzMuMzYuMzMuOSwwLDEuMjZsLTUuNDgsNS40OGMtLjM5LjM5LS45My42MS0xLjQ4LjYxWiIvPjxwYXRoIHN0eWxlPSJmaWxsOiNmZjdjMjUiIGQ9Im0xOCwyNC40M2MtLjUxLDAtLjkzLS40Mi0uOTMtLjkzVjQuMjljLjAzLS41MS40Ny0uOTEuOTktLjg4LjQ3LjAzLjg1LjQuODguODh2MTkuMjFjMCwuNTEtLjQyLjkzLS45My45M1oiLz48L3N2Zz4=);
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: center 13px;
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 55px 0 13px;
    position: fixed;
    bottom: 476px;
    right: 16px;
    z-index: 999;
    cursor: pointer;
  }
`;
styleElement.innerHTML = customStyles;
document.head.appendChild(styleElement);

var button = document.createElement('button');
button.textContent = '下载课本';
button.classList.add('download-this-book');
document.body.appendChild(button);
window.onload = function() {
    button.addEventListener('click', downloadThisBook);
}
function downloadThisBook() {
    var url = window.location.href;
    var regex = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g;
    var match = regex.exec(url);
    if (match) {
        var id = match[0];
        var redirectUrl = `https://r2-ndr.ykt.cbern.com.cn/edu_product/esp/assets/${id}.pkg/pdf.pdf`;

        var elements = document.querySelectorAll('h3[class^="index-module_title_"]');
        var textContents = [];
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            textContents.push(element.textContent);
        }

        if (textContents.length === 0) {
            textContents.push("下载");
        }

        var x = new XMLHttpRequest();
        x.open("GET", redirectUrl, true);
        x.responseType = 'blob';
        x.onload = function(e) {
            var url = window.URL.createObjectURL(x.response);
            var a = document.createElement('a');
            a.href = url;
            a.download = textContents[0] + '.pdf';
            a.click();
        }
        x.send();

    } else {
        console.log("No ContentID Found!");
        alert('No ContentID Found!');
    }
}