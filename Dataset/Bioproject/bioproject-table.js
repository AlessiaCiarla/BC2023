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

    tableHeader += "<th>Details</th></tr></thead>";
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
            td.textContent = "hello " + text;
            break;
          case "RUN":
            td.textContent = "PROVA " + text;
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
            td.appendChild(img); // Aggiungi l'immagine come contenuto della cella
            break;
          default:
            td.textContent = text;
            break;
        }

        tr.appendChild(td);
      }

      const tdButton = document.createElement("td");
      const button = document.createElement("button");
      button.textContent = "SEE MORE";
      button.id = "col_det";

      const img = document.createElement("img");
      img.id = "img_detail";
      img.src = "/img/detail_icona.png";

      button.appendChild(img);

      button.addEventListener("click", function () {
        location.href = "./Details/bioproject-detail.html";
      });

      tdButton.appendChild(button);
      tr.appendChild(tdButton);

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
