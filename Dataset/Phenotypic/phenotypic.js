//mouse phenotypic data: biomaterial

// set the dimensions and margins of the graph
var margin = { top: 30, right: 80, bottom: 80, left: 300 },
  width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#biomaterialGraphic")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var myGroups = [
  "PRJNA257779",
  "PRJNA278144",
  "PRJNA279421",
  "PRJNA355642",
  "PRJNA379366",
  "PRJNA414468",
  "PRJNA448674",
  "PRJNA451208",
  "PRJNA526675",
  "PRJNA531153",
  "PRJNA580009",
];
var myVars = [
  "Frontal Cortex",
  "Hippocampus",
  "Hypothalamus",
  "Forebrain Tissue",
  "Visual Cortex",
  "Microglia dissected from mouse brain tissues",
  "Whole Cortex",
  "Cortical culture",
  "Blood",
  "Cerebellum",
];
// Build X scales and axis:
var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);

svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-90)");

// Build X scales and axis:
var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.04);
svg.append("g").call(d3.axisLeft(y));

var biomaterial = {
  PRJNA257779: ["Frontal Cortex", "Hippocampus"],
  PRJNA278144: ["Hypothalamus"],
  PRJNA279421: ["Visual Cortex"],
  PRJNA355642: ["Microglia dissected from mouse brain tissues"],
  PRJNA379366: ["Whole Cortex"],
  PRJNA414468: [],
  PRJNA448674: [],
  PRJNA451208: ["Hippocampus", "Cortical culture"],
  PRJNA526675: ["Forebrain Tissue"],
  PRJNA531153: ["Blood", "Cerebellum"],
  PRJNA580009: ["Forebrain Tissue"],
};

// Crea un array di oggetti dai dati in biomaterial
var data = [];
for (var key in biomaterial) {
  for (var i = 0; i < biomaterial[key].length; i++) {
    data.push({ group: key, variable: biomaterial[key][i] });
  }
}

// Crea i rettangoli
svg
  .selectAll()
  .data(data, function (d) {
    return d.group + ":" + d.variable;
  })
  .enter()
  .append("rect")
  .attr("x", function (d) {
    return x(d.group);
  })
  .attr("y", function (d) {
    return y(d.variable);
  })
  .attr("width", x.bandwidth())
  .attr("height", y.bandwidth())
  .style("fill", function (d) {
    // Controlla se la chiave dell'asse x ha un valore corrispondente sull'asse y nel tuo oggetto biomaterial
    if (biomaterial[d.group] && biomaterial[d.group].includes(d.variable)) {
      return "green"; // Se sì, rendi il rettangolo verde
    } else {
      return "white"; // Se no, rendi il rettangolo bianco
    }
  });

//-------------------------------------------------------------------
//mouse phenotypic data: layout
// set the dimensions and margins of the graph
var margin = { top: 30, right: 80, bottom: 80, left: 300 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#layoutGraphic")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var myGroups = [
  "PRJNA257779",
  "PRJNA278144",
  "PRJNA279421",
  "PRJNA355642",
  "PRJNA379366",
  "PRJNA414468",
  "PRJNA448674",
  "PRJNA451208",
  "PRJNA526675",
  "PRJNA531153",
  "PRJNA580009",
];
var myVars = ["Paired", "Single"];
// Build X scales and axis:
var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);

svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-90)");

// Build X scales and axis:
var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.04);
svg.append("g").call(d3.axisLeft(y));

var mouseLayout = {
  PRJNA257779: ["Paired"],
  PRJNA278144: ["Paired"],
  PRJNA279421: ["Single"],
  PRJNA355642: ["Paired"],
  PRJNA379366: ["Paired"],
  PRJNA414468: ["Paired"],
  PRJNA448674: ["Paired"],
  PRJNA451208: ["Paired"],
  PRJNA526675: ["Single"],
  PRJNA531153: ["Paired"],
  PRJNA580009: ["Single"],
};

// Crea un array di oggetti dai dati in mouseLayout
var data = [];
for (var key in mouseLayout) {
  for (var i = 0; i < mouseLayout[key].length; i++) {
    data.push({ group: key, variable: mouseLayout[key][i] });
  }
}

// Crea i rettangoli
svg
  .selectAll()
  .data(data, function (d) {
    return d.group + ":" + d.variable;
  })
  .enter()
  .append("rect")
  .attr("x", function (d) {
    return x(d.group);
  })
  .attr("y", function (d) {
    return y(d.variable);
  })
  .attr("width", x.bandwidth())
  .attr("height", y.bandwidth())
  .style("fill", function (d) {
    // Controlla se la chiave dell'asse x ha un valore corrispondente sull'asse y nel tuo oggetto biomaterial
    if (mouseLayout[d.group] && mouseLayout[d.group].includes(d.variable)) {
      return "green"; // Se sì, rendi il rettangolo verde
    } else {
      return "white"; // Se no, rendi il rettangolo bianco
    }
  });

//-------------------------------------------------------------------
//human phenotypic data: sex

// set the dimensions and margins of the graph
var margin = { top: 30, right: 80, bottom: 80, left: 300 },
  width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#sexGraphic")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var myGroups = [
  "PRJNA224073",
  "PRJNA383878",
  "PRJNA419983",
  "PRJNA482371",
  "PRJNA482372",
  "PRJNA509687",
  "PRJNA527289",
  "PRJNA590731",
  "PRJNA672095",
];
var myVars = ["Female", "Male", "Unknown"];
// Build X scales and axis:
var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);

svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-90)");

// Build X scales and axis:
var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.04);
svg.append("g").call(d3.axisLeft(y));

var sex = {
  PRJNA224073: ["Female", "Male", "Unknown"],
  PRJNA383878: ["Female"],
  PRJNA419983: ["Unknown"],
  PRJNA482371: ["Unknown"],
  PRJNA482372: ["Unknown"],
  PRJNA509687: ["Unknown"],
  PRJNA527289: ["Female"],
  PRJNA590731: ["Unknown"],
  PRJNA672095: ["Unknown"],
};

// Crea un array di oggetti dai dati in sex
var data = [];
for (var key in sex) {
  for (var i = 0; i < sex[key].length; i++) {
    data.push({ group: key, variable: sex[key][i] });
  }
}

// Crea i rettangoli
svg
  .selectAll()
  .data(data, function (d) {
    return d.group + ":" + d.variable;
  })
  .enter()
  .append("rect")
  .attr("x", function (d) {
    return x(d.group);
  })
  .attr("y", function (d) {
    return y(d.variable);
  })
  .attr("width", x.bandwidth())
  .attr("height", y.bandwidth())
  .style("fill", function (d) {
    if (sex[d.group] && sex[d.group].includes(d.variable)) {
      return "blue"; // Se sì, rendi il rettangolo verde
    } else {
      return "white"; // Se no, rendi il rettangolo bianco
    }
  });

//-------------------------------------------------------------------
//human phenotypic data: layout
// set the dimensions and margins of the graph
var margin = { top: 30, right: 80, bottom: 80, left: 300 },
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#humanLayoutGraphic")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var myGroups = [
  "PRJNA224073",
  "PRJNA383878",
  "PRJNA419983",
  "PRJNA482371",
  "PRJNA482372",
  "PRJNA509687",
  "PRJNA527289",
  "PRJNA590731",
  "PRJNA672095",
];
var myVars = ["Paired", "Single"];
// Build X scales and axis:
var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);

svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-90)");

// Build X scales and axis:
var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.04);
svg.append("g").call(d3.axisLeft(y));

var humanLayout = {
  PRJNA224073: ["Single"],
  PRJNA383878: ["Single"],
  PRJNA419983: ["Paired"],
  PRJNA482371: ["Paired"],
  PRJNA482372: ["Paired"],
  PRJNA509687: ["Paired"],
  PRJNA527289: ["Single"],
  PRJNA590731: ["Paired"],
  PRJNA672095: ["Paired"],
};

// Crea un array di oggetti dai dati in humanLayout
var data = [];
for (var key in humanLayout) {
  for (var i = 0; i < humanLayout[key].length; i++) {
    data.push({ group: key, variable: humanLayout[key][i] });
  }
}

// Crea i rettangoli
svg
  .selectAll()
  .data(data, function (d) {
    return d.group + ":" + d.variable;
  })
  .enter()
  .append("rect")
  .attr("x", function (d) {
    return x(d.group);
  })
  .attr("y", function (d) {
    return y(d.variable);
  })
  .attr("width", x.bandwidth())
  .attr("height", y.bandwidth())
  .style("fill", function (d) {
    // Controlla se humanLayout[d.group] esiste e se è un array
    if (humanLayout[d.group] && Array.isArray(humanLayout[d.group])) {
      // Se esiste e è un array, controlla se include d.variable
      if (humanLayout[d.group].includes(d.variable)) {
        return "blue"; // Se sì, rendi il rettangolo blu
      }
    }
    return "white"; // Se no, rendi il rettangolo bianco
  });
