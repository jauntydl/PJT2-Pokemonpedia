var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var barDiv = document.getElementById('bar-chart');
 
    var HP = {
        x: [monster1_name, monster2_name],
        y: [monster1_hp, monster2_hp],
        type: 'bar',
        name: 'HP'
        };
 
    var Attack = {
        x: [monster1_name, monster2_name],
        y: [monster1_att, monster2_att],
        type: 'bar',
        name: 'Attack'
        };
 
    var Defense = {
        x: [monster1_name, monster2_name],
        y: [monster1_def, monster2_def],
        type: 'bar',
        name: 'Defense'
        };
    var SAttack = {
        x: [monster1_name, monster2_name],
        y: [monster1_satt, monster2_satt],
        type: 'bar',
        name: 'Special Attack'
        };
    var SDefense = {
        x: [monster1_name, monster2_name],
        y: [monster1_sdef, monster2_sdef],
        type: 'bar',
        name: 'Special Defense'
        };
    var Speed = {
        x: [monster1_name, monster2_name],
        y: [monster1_spd, monster2_spd],
        type: 'bar',
        name: 'Speed'
        };
 
    var data = [HP, Attack, Defense, SAttack, SDefense, Speed];
 
    var layout = {
        title:'Stat comparison',
        barmode: 'stack'
    };

    // Step 5: Create Scales
  //= ============================================
  var xTimeScale = d3.scaleTime()
  .domain(d3.extent(donutData, d => d.date))
  .range([0, width]);

var yLinearScale1 = d3.scaleLinear()
  .domain([0, d3.max(donutData, d => d.morning)])
  .range([height, 0]);

var yLinearScale2 = d3.scaleLinear()
  .domain([0, d3.max(donutData, d => d.evening)])
  .range([height, 0]);

// Step 6: Create Axes
// =============================================
var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));
var leftAxis = d3.axisLeft(yLinearScale1);
var rightAxis = d3.axisRight(yLinearScale2);


// Step 7: Append the axes to the chartGroup
// ==============================================
// Add bottomAxis
chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

// Add leftAxis to the left side of the display
chartGroup.append("g").call(leftAxis);

// Add rightAxis to the right side of the display
chartGroup.append("g").attr("transform", `translate(${width}, 0)`).call(rightAxis);

 
    Plotly.newPlot( 'barDiv', data, layout );
    
    });