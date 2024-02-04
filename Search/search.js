var organism = "";
document.getElementById("organism").addEventListener("change", function () {
  document.getElementById("filter-div").style.display = "block";
  organism = this.options[this.selectedIndex].text;

  let organismArray = [];
  let filePaths = [];

  /* uomo*/
  if (organism === "Human (Homo Sapiens)") {
    filePaths = [
      "/data/human/PRJNA224073.csv",
      "/data/human/PRJNA383878.csv",
      "/data/human/PRJNA419983.csv",
      "/data/human/PRJNA482371.csv",
      "/data/human/PRJNA482372.csv",
      "/data/human/PRJNA509687.csv",
      "/data/human/PRJNA527289.csv",
      "/data/human/PRJNA590731.csv",
      "/data/human/PRJNA672095.csv",
    ];
  } else {
    filePaths = [
      "/data/mouse/PRJNA257779.csv",
      "/data/mouse/PRJNA278144.csv",
      "/data/mouse/PRJNA279421.csv",
      "/data/mouse/PRJNA355642.csv",
      "/data/mouse/PRJNA379366.csv",
      "/data/mouse/PRJNA414468.csv",
      "/data/mouse/PRJNA448674.csv",
      "/data/mouse/PRJNA451208.csv",
      "/data/mouse/PRJNA526675.csv",
      "/data/mouse/PRJNA531153.csv",
      "/data/mouse/PRJNA580009.csv",
    ];
  }

  Promise.all(
    filePaths.map((filePath) =>
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Errore nel caricamento del file: ${filePath}`);
          }
          return response.text();
        })
        .then((csvContent) => {
          const lines = csvContent.split("\n");
          const dataArray = [];

          for (let i = 0; i < lines.length; i++) {
            const values = lines[i].split(",");
            dataArray.push(values);
          }

          organismArray.push({ filePath: filePath, data: dataArray });
        })
        .catch((error) => {
          console.error(`Errore (${filePath}):`, error.message);
        })
    )
  );

  var filterSelect = document.getElementById("filter");
  filterSelect.addEventListener("change", function () {
    //pulisci prima tutto
    let valuesThirdSelect = [];
    var select = document.getElementById("results");
    while (select.children.length > 1) {
      select.removeChild(select.lastChild);
    }
    select.selectedIndex = 0;
    var filesNameDiv = document.getElementById("filesName");
    while (filesNameDiv.firstChild) {
      filesNameDiv.removeChild(filesNameDiv.firstChild);
    }
    document.getElementsByClassName("file-results")[0].style.display = "none";

    if (this.selectedIndex !== 0) {
      var filter = this.options[this.selectedIndex].text;
      organismArray.forEach(function (organism) {
        let index = organism.data[0].indexOf(filter);
        if (index !== -1) {
          for (let i = 1; i < organism.data.length; i++) {
            if (!valuesThirdSelect.includes(organism.data[i][index])) {
              valuesThirdSelect.push(organism.data[i][index]);
            }
          }
        }
      });
      valuesThirdSelect.sort();

      var select = document.getElementById("results");
      while (select.children.length > 1) {
        select.removeChild(select.lastChild);
      }
      valuesThirdSelect.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        select.appendChild(option);
      });
      document.getElementById("result-div").style.display = "block";

      var resultSelect = document.getElementById("results");
      resultSelect.addEventListener("change", function () {
        let fileArray = [];
        var valueToFind = this.value;
        organismArray.forEach(function (organism) {
          let index = organism.data[0].indexOf(filter);
          if (index !== -1) {
            for (let i = 1; i < organism.data.length; i++) {
              if (
                organism.data[i][index] === valueToFind &&
                !fileArray.includes(organism.filePath)
              ) {
                fileArray.push(organism.filePath);
              }
            }
          }
        });
        fileArray = fileArray.map(function (file) {
          return file.split("/").pop().split(".")[0];
        });

        var filesNameDiv = document.getElementById("filesName");
        while (filesNameDiv.firstChild) {
          filesNameDiv.removeChild(filesNameDiv.firstChild);
        }
        fileArray.forEach(function (file) {
          var p = document.createElement("p");
          var a = document.createElement("a");
          a.href = "https://www.ncbi.nlm.nih.gov/bioproject/" + file;
          a.target = "_blank";
          a.textContent = file;
          p.appendChild(a);
          filesNameDiv.appendChild(p);
        });
        document.getElementsByClassName("file-results")[0].style.display =
          "block";
      });
      valuesThirdSelect = [];
    }
  });
});
