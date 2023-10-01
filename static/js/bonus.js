// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ Links to an external site. to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.


var arrColorsG = ["#5899DA", "#E8743B", "#19A979", "#ED4A7B", "#945ECF", "#13A4B4", "#525DF4", "#BF399E", "#6C8893", "white"];

// Update the chart whenever a new sample is selected.

function buildMetadata(sample) {
    d3.json('samples.json').then((data) => {
        var metadata = data.metadata;
        var resultsarray = metadata.filter(sampleobject =>
            sampleobject.id == sample);
        var result = resultsarray[0]
        var panel = d3.select('#sample_metadata');
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append('h6').text(`${key}: ${value}`);
        });
    });
}

function buildGaugeChart(sample) {
    console.log('sample', sample);

    d3.json('samples.jason').then (data => {
        var objs = data.metadata;
        //console.lof('objs', objs);

        var matchedSampleObj = objs.filter(sampleData =>
            sampleData['id'] === parseInt(sample));
        // console.log('buildGaugeChart matchedSampleObj', matchedSampleObj);
        
        buildGaugeChart(matchedSampleObj[0]);
    });
}

function gaugeChart(data) {
    console.log('gaugeChart', data);

    if(data.wfreq === null) {
        data.wfreq = 0;
    }

    let degree = parseInt(data.wfreq) * (180/10);
    let degrees = 180 - degree;
    let radius = .5;
    let radians = degrees * Math.PI / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);

    let mainPath = 'M-.0 -0.25 L .0 0.025 L ',
        pathX =  String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    let path = mainPath.concat(pathX, space, pathY, pathEnd);

    let trace = [{ type: 'scatter',
        x: [0], y: [0],
        marker: {size: 50, color: '2F6497'},
        name: 'Wash Frequency',
        text: data.wfreq,
        hoverinfo: 'text+name'},
    {   values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
        textinfo: 'text',
        textposition: 'inside',
        textfont:{
            size: 16,
            },
        marker: {colors: [...arrColorsG]},
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '2-1', '0-1',''],
        hoverinfo: 'text',
        hole: .5,
        tyoe: 'pie',
        showlegend: false
    }];
    
    let layout = {
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '#2F6497',
            line: {
                color: '#2F6497'
            }
        }],
        
        title: '<b>Washing Frequency</b> <br> <b>Per Week</b>',
        height: 550,
        width: 550,
        xaxis: {zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]},
        yaxis: {zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]},
    };

    Plotly.newPlot('gauge', trace. layout, {responsive: true});
}