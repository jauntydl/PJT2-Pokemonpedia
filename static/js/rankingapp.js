datapath = "../resources/Pokemon.csv";

// Function to get max value out of list
function Getmaxval(data) {
    var max = 0;
    data.forEach(d => {
        if (d > max) {
            max = d;
        }
    })
    return max
}

//Function to get the top N data
function GetTopN(Data, N) {
    Sorted_Data = Data.sort((a, b) => b.Score - a.Score).slice(0, N)
    return Sorted_Data
}

// Function to push rank score into Object
function GetRankScore(Data, criteria) {
    // Initialize Score
    Data.forEach(d => {
        d["Score"] = 0;
    })
    criteria.forEach(s => {
        var s_list = [];

        Data.forEach(d => {
            s_list.push(parseInt(d[s]))
        })
        var maxima = Getmaxval(s_list);

        Data.forEach(d => {
            d["Score"] = parseInt(d["Score"]) + Math.round(100 * parseInt(d[s]) / maxima)
        })
    })
    return Data;
}


// Function to get array of selected criteria from checkboxes
function Select_Criteria() {

    var Checked_Criteria = [];

    var checkboxes = Array.from(document.getElementsByClassName("cb"));
    checkboxes.forEach(d => {

        if (d.checked === true) {
            Checked_Criteria.push(d.value);
        }

    })
    console.log(Checked_Criteria)
    return Array.from(Checked_Criteria);
}

function Generate_Table() {

    var table = d3.select("tbody");
    table.html("");

    d3.csv(datapath).then(d => {

        var Checked_Criteria = [];
        var checkboxes = Array.from(document.getElementsByClassName("cb"));
        checkboxes.forEach(d => {
            if (d.checked === true) {
                Checked_Criteria.push(d.value);
            }
        })

        var New_Data = GetRankScore(d, Checked_Criteria);
        var TopNum = document.getElementById("NofPoke")
        var Table_Data = GetTopN(New_Data, TopNum.value)
        var tbody = d3.select("tbody");

        Table_Data.forEach(d => {
            var row = tbody.append("tr");
            Object.entries(d).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        });

        PlotChart(Table_Data)

    });
}

d3.select("#GenTable")
    .on("click", Generate_Table);



function PlotChart(data) {
    var chartbody = d3.select("cbody")
    chartbody.html("");

    var dataArray = [];
    var dataCategories = [];

    data.forEach(d => {
        dataArray.push(d.Score);
        dataCategories.push(d.Name);
    });

    // svg container
    var height = 600;
    var width = 1100;

    // margins
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    // chart area minus margins
    var chartHeight = height - margin.top - margin.bottom;
    var chartWidth = width - margin.left - margin.right;

    // create svg container
    var svg = d3.select("cbody").append("svg")
        .attr("height", height)
        .attr("width", width);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataArray)])
        .range([chartHeight, 0]);

    // scale x to chart width
    var xScale = d3.scaleBand()
        .domain(dataCategories)
        .range([0, chartWidth])
        .padding(0.1);

    // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    d3.selectAll(".tick")
        .selectAll('text')
        .attr("transform", "translate(0,20) rotate(30)")

    // set y to the y axis
    chartGroup.append("g")
        .call(yAxis);

    // Create the rectangles using data binding
    var barsGroup = chartGroup.selectAll("rect")
        .data(dataArray)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(dataCategories[i]))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d))
        .attr("fill", "lightseagreen");

}

