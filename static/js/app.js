// Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

function buildMetadata(sample) {
    d3.json('samples.json').then((data) => {
        var metadata = data.metadata;
        var resultsarray = metadata.filter(sampleobject =>
            sampleobject.id == sample);
        var result = resultsarray[0]
        var panel = d3.select('#sample-metadata');
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append('h6').text(`${key}: ${value}`);
        });
    });
}

// Create a bubble chart that displays each sample.

function buildCharts(sample) {
d3.json('samples.json').then((data) => {
    var samples = data.samples;
    var resultsarray = samples.filter(sampleobject =>
        sampleobject.id == sample);
    var result = resultsarray[0]

    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;

    var LayoutBubble = {
        margin: { t: 0},
        xaxis: { title: 'OYU ID' },
        hovermode: 'closest',
        };

    var DataBubble = [
        {
            x: ids,
            y: values,
            text: labels,
            mode: 'markers',
            marker: {
                color: ids,
                size: values,
                }
        }
    ];
        
    Plotly.newPlot('bubble', DataBubble, LayoutBubble);

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.

    var bar_data = [
        {
            y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            x: values.slice(0, 10).reverse(),
            text: labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }
    ];

    var barLayout = {
        title: "Top 10 | Bacteria",
        margin: { t: 30, l: 150 }
    };
    
    Plotly.newPlot('bar', bar_data, barLayout);
});
}


// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.
// Display each key-value pair from the metadata JSON object somewhere on the page.
// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ Links to an external site. to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.