class TableCsv {
  /**
   * @param {HTMLTableElement} root The table element which will display the CSV data.
   */
  constructor(root) {
    this.root = root;
  }

  /**
   * Clears existing data in the table and replaces it with new data.
   *
   * @param {string[][]} data A 2D array of data to be used as the table body
   * @param {string[]} headerColumns List of headings to be used
   */
  update(data, headerColumns = []) {
    this.clear();
    this.setTable(headerColumns, data);
  }

  /**
   * Clears all contents of the table (incl. the header).
   */
  clear() {
    this.root.innerHTML = "";
  }

  /**
   * Sets the table
   *
   * @param {string[]} headerColumns List of headings to be used
   * @param {string[][]} data A 2D array of data to be used as the table body
   */
  setTable(headerColumns, data) {
    let tableHeader = "<thead><tr>";

    for (let i = 0; i < headerColumns.length; i++) {
      const columnHeader = headerColumns[i].toUpperCase();
      tableHeader += `<th>${columnHeader}</th>`;
    }

    // tableHeader += "<th>Details</th></tr></thead>";
    tableHeader = tableHeader.toUpperCase();

    this.root.insertAdjacentHTML("afterbegin", tableHeader);

    const tbody = document.createElement("tbody");

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const tr = document.createElement("tr");

      for (let j = 0; j < row.length; j++) {
        const text = row[j];
        const td = document.createElement("td");

        switch (headerColumns[j].toUpperCase()) {
          case "ORGANISM":
            let organismDiv = document.createElement("div");
            let organismImg = document.createElement("img");
            organismDiv.style.backgroundColor = "#FFBF00";
            organismDiv.style.padding = "5px";
            organismDiv.style.borderRadius = "10px";
            if (
              text == "Homo sapiens" ||
              text == "Homo_sapiens" ||
              text == "Homo Sapiens"
            ) {
              organismImg.src = "/img/homo.png";
              organismDiv.title = "Homo sapiens";
            } else if (text == "Mus Musculus" || text == "Mus musculus") {
              organismImg.src = "/img/mouse.png";
              organismDiv.title = "Mus Musculus";
            } else {
              organismDiv.textContent = text;
            }
            organismDiv.appendChild(organismImg);
            td.appendChild(organismDiv);
            break;

          case "RUN":
            td.textContent = text;
            break;

          case "EXPERIMENT ID":
            let imgId = document.createElement("img");
            imgId.src = "/img/id.png";
            let div = document.createElement("div");
            let a = document.createElement("a");
            a.href = "https://www.ncbi.nlm.nih.gov/sra/?term=" + text;
            a.target = "_blank";
            a.title = "Go to SRA";
            a.className = "myLink";
            a.textContent = text;
            div.style.backgroundColor = "#9DB4C0";
            div.style.color = "white";
            div.style.padding = "5px";
            div.style.borderRadius = "10px";
            div.style.display = "flex";
            div.style.gap = "10px";
            div.appendChild(a);
            div.appendChild(imgId);
            td.appendChild(div);
            break;

          case "CELLULAR FRACTION":
            const cellularImg = document.createElement("img");
            if (text == "Cerebellum" || text == "Brain - Cerebellum (CB)") {
              cellularImg.src = "/img/cerebellum.png";
              cellularImg.title = "Cerebellum";
            } else if (text == "Brain - Cerebral cortex (CTX)") {
              cellularImg.src = "/img/brain_cortex.png";
              cellularImg.title = "Brain - Cerebral cortex (CTX)";
            } else {
              cellularImg.src = "/img/cell.png";
              cellularImg.title = "Whole Cell";
            }
            td.appendChild(cellularImg);
            break;

          case "SEX":
            const img = document.createElement("img");
            if (text == "Female") {
              img.src = "/img/female.png";
              img.title = "Female";
            } else {
              img.src = "/img/male.png";
              img.title = "Male";
            }
            td.appendChild(img);
            break;
          default:
            td.textContent = text;
            break;
        }

        tr.appendChild(td);
      }

      //   const tdButton = document.createElement("td");
      //   const button = document.createElement("button");
      //   button.textContent = "SEE MORE";
      //   button.id = "col_det";

      //   const img = document.createElement("img");
      //   img.id = "img_detail";
      //   img.src = "/img/detail_icona.png";

      //   button.appendChild(img);

      //   button.addEventListener("click", function () {
      //     location.href = "./Details/bioproject-detail.html";
      //   });

      //   tdButton.appendChild(button);
      //   tr.appendChild(tdButton);

      tbody.appendChild(tr);
    }

    this.root.appendChild(tbody);
  }
}

const tableRoot = document.querySelector("#csvRoot");
const csvFileInput = document.querySelector("#csvFileInput");
const tableCsv = new TableCsv(tableRoot);

csvFileInput.addEventListener("change", (e) => {
  Papa.parse(csvFileInput.files[0], {
    delimiter: ",",
    skipEmptyLines: true,
    complete: (results) => {
      tableCsv.update(results.data.slice(1), results.data[0]);
    },
  });
});
