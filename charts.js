function init() {
  var selector = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
  console.log(data);
  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
      selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });
})}
init();

// create the function to get the necessary data
function getDemoInfo(id) {
  // read the json file to get data
      d3.json("samples.json").then((data)=> {
  // get the metadata info for the demographic panel
          var metadata = data.metadata;
  
          console.log(metadata)
  
        // filter meta data info by id
      var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data
      var demographicInfo = d3.select("#sample-metadata");
          
       // empty the demographic info panel each time before getting new id info
      demographicInfo.html("");
  
       // grab the necessary demographic data data for the id and append the info to the panel
          Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
          });
      });
  }
  // create the function for the change event
  function optionChanged(id) {
      // getPlots(id);
      getDemoInfo(id);
  }
  
  // create the function for the initial data rendering
  function init() {
      // select dropdown menu 
      var dropdown = d3.select("#selDataset");
  
      // read the data 
      d3.json("samples.json").then((data)=> {
          console.log(data)
  
          // get the id data to the dropdwown menu
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
  
          // call the functions to display the data and the plots to the page
          // getPlots(data.names[0]);
          getDemoInfo(data.names[0]);
      });
  }
  
  init();

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
    PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample); 
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = result.otu_ids; 
    var labels = result.otu_labels.slice(0,10).reverse();
    var values = result.sample_values.slice(0,10).reverse();
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = ids.map(sampleObj => "OTU" + sampleObj).slice(0,10).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [{
    x: values,
    y: yticks,
    type: "bar",
    orientation: "h",
    text: labels
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
    title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
        // Bar and Bubble charts
        // 1. Create the trace for the bubble chart.
        var bubbleData = [{
          x: ids,
          y: values,
          text: labels,
          mode: "markers",
          marker: {
            size: values,
            color: ids,
            colorscale: "navy"
    }
    }];
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      automargin: true,
      hovermode: "closest"
    };
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var gaugeArray = metadata.filter(metaObj => metaObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var gaugeResults = gaugeArray[0];
  

    // 2. Create a variable that holds the first sample in the metadata array.
    var gaugeSample = gaugeResults[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var gaugeId = result.otu_ids;
    var gaugeLabels = result.otu_labels
    var gaugeSamples = result.sample_values

    // 3. Create a variable that holds the washing frequency.
    var wFreqs = gaugeResults.wfreq;
    console.log(wFreqs)
  
    // Create the yticks for the bar chart.
    
    // // Use Plotly to plot the bar data and layout.
    // Plotly.newPlot();
    
    // // Use Plotly to plot the bubble data and layout.
    // Plotly.newPlot();
  
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      value: wFreqs,
      type: "indicator",
      mode: "gauge+number",
      title: {text: "<b>Belly Button Washing Frequency </b><br></br> Scrubs Per Week"},
      gauge: {
        axis: {range: [null,10]},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "firebrick"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "seagreen"},
          {range: [6,8], color: "aliceblue"},
          {range: [8,10], color: "pink"}
        ],
        dtick: 2 
      }
    
  }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
    automargin: true
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  
  });

}
