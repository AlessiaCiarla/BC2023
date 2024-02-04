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
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("headerColumns", JSON.stringify(headerColumns));
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
            let runDiv = document.createElement("div");
            let runLink = document.createElement("a");
            runLink.href =
              "https://trace.ncbi.nlm.nih.gov/Traces/?view=run_browser&acc=" +
              text +
              "&display=metadata";
            runLink.target = "_blank";
            runLink.title = "Go to Metadata";
            runLink.className = "myLink";
            runLink.textContent = text;
            runDiv.style.backgroundColor = "#9DB4C0";
            runDiv.style.color = "white";
            runDiv.style.padding = "5px";
            runDiv.style.borderRadius = "10px";
            runDiv.appendChild(runLink);
            td.appendChild(runDiv);
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

          case "EXPERIMENT TYPE":
            let imgType = document.createElement("img");
            if (text == "In vivo") {
              imgType.src = "/img/in_vivo.png";
              imgType.title = "In vivo";
            } else {
              imgType.src = "/img/in_vitro.png";
              imgType.title = "In vitro";
            }
            td.appendChild(imgType);
            break;

          case "GENOTYPE VARIATION":
            let imgVar = document.createElement("img");
            if (text == "Unknown") {
              imgVar.src = "/img/unknow.png";
              imgVar.title = "Unknown";
            } else if (text == "WT" || text == "Wild type") {
              imgVar.src = "/img/wild_type.png";
              imgVar.title = "WT";
            } else if (text == "RTT1") {
              imgVar.src = "/img/rett_bow.png";
              imgVar.title = "RTT1";
            } else if (text == "RTT2") {
              imgVar.src = "/img/rett_bow.png";
              imgVar.title = "RTT2";
            } else if (text == "Wild type for MeCP2 knockout") {
              imgVar.src = "/img/wild_type.png";
              imgVar.title = "Wild type for MeCP2 knockout";
            } else if (text == "MeCP2 knockout" || text == "Mecp2_KO") {
              imgVar.src = "/img/rett_bow.png";
              imgVar.title = "MeCP2 knockout";
            } else if (text == "Mecp2-null (Mecp2Jae)") {
              imgVar.src = "/img/rett_bow.png";
              imgVar.title = "Mecp2-null (Mecp2Jae)";
            } else if (text == "Not Available") {
              imgVar.src = "/img/denied.png";
              imgVar.title = "Not Available";
            } else {
              td.style.maxWidth = "260px";
              let maxLength = 30;
              if (text.length > maxLength) {
                td.textContent = text.substring(0, maxLength) + "...";
              } else {
                td.textContent = text;
              }
              td.title = text;
            }
            td.appendChild(imgVar);
            break;

          case "GENOTYPE":
            const genotypeImg = document.createElement("img");
            if (text == "WT" || text == "Wild" || text == "Wild-type") {
              genotypeImg.src = "/img/wild_type.png";
              genotypeImg.title = "WT";
            } else if (text == "RTT") {
              genotypeImg.src = "/img/rett_bow.png";
              genotypeImg.title = "RTT";
            } else if (text == "Mecp2") {
              genotypeImg.src = "/img/rett_bow.png";
              genotypeImg.title = "Mecp2";
            } else if (text == "MECP2 mutant 1") {
              genotypeImg.src = "/img/rett_bow.png";
              genotypeImg.title = "MECP2 mutant 1";
            } else if (text == "MECP2 mutant 2") {
              genotypeImg.src = "/img/rett_bow.png";
              genotypeImg.title = "MECP2 mutant 2";
            } else if (text == "MeCP2 knock-out") {
              genotypeImg.src = "/img/rett_bow.png";
              genotypeImg.title = "MeCP2 knock-out";
            } else if (
              text == "MeCP2_KO" ||
              text == "MeCP2 KO" ||
              text == "Mecp2_KO"
            ) {
              genotypeImg.src = "/img/rett_bow.png";
              genotypeImg.title = "MeCP2 KO";
            } else if (
              text == "Mecp2-null (Mecp2Jae)" ||
              text == "Mecp2-null"
            ) {
              genotypeImg.src = "/img/rett_bow.png";
              genotypeImg.title = "Mecp2-null (Mecp2Jae)";
            } else {
              td.textContent = text;
            }
            td.appendChild(genotypeImg);
            break;

          case "LAYOUT":
            const layoutImg = document.createElement("img");
            if (text == "Paired") {
              layoutImg.src = "/img/pair.png";
              layoutImg.title = "Paired";
            } else {
              layoutImg.src = "/img/single.png";
              layoutImg.title = "Single";
            }
            td.appendChild(layoutImg);
            break;

          case "DISEASE":
            const diseaseImg = document.createElement("img");
            if (text == "RTT") {
              diseaseImg.src = "/img/rett_bow.png";
              diseaseImg.title = "RTT";
            } else if (text == "WT") {
              diseaseImg.src = "/img/wild_type.png";
              diseaseImg.title = "WT";
            } else {
              td.textContent = text;
            }
            td.appendChild(diseaseImg);
            break;

          case "PLATFORM":
            const platformImg = document.createElement("img");
            if (text == "Not Available") {
              platformImg.src = "/img/denied.png";
              platformImg.title = "Not Available";
            } else {
              td.textContent = text;
            }
            td.appendChild(platformImg);
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

          case "TREATMENT":
            const treatmentImg = document.createElement("img");
            if (text == "None") {
              treatmentImg.src = "/img/denied.png";
              treatmentImg.title = "None";
            } else if (text == "KCl") {
              treatmentImg.src = "/img/potassium.png";
              treatmentImg.title = "potassium chloride (KCI)";
            } else {
              td.textContent = text;
            }
            td.appendChild(treatmentImg);
            break;

          case "SEX":
            const img = document.createElement("img");
            if (text == "Female") {
              img.src = "/img/female.png";
              img.title = "Female";
            } else if (text == "Male") {
              img.src = "/img/male.png";
              img.title = "Male";
            } else {
              img.src = "/img/denied.png";
              img.title = "Not Available";
            }
            td.appendChild(img);
            break;
          default:
            td.textContent = text;
            break;
        }

        tr.appendChild(td);
      }

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
