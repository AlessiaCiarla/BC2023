function loadAndInsertContent(url, containerId) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById(containerId).innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
  loadAndInsertContent("./../../../footer.html", "footerContainer");
  loadAndInsertContent("./../../../head-content.html", "headContainer");
  loadAndInsertContent("./../../../navbar.html", "navbarContainer");
});
