datapath = "../resources/Pokemon.csv";
tbody = d3.select("tbody")

function reset() {
    tbody.html("")

    d3.csv(datapath).then(d => {
        d.forEach(d => {
            var row = tbody.append("tr");
            Object.entries(d).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        });
    });
}


function Search_Monster() {

    tbody.html("")
    d3.csv(datapath).then(d => {

        var inputValue = d3.select("#PokemonSearch").property('value');
        var filteredData = d.filter(d => d.Name === inputValue);

        filteredData.forEach(d => {
            var row = tbody.append("tr");
            Object.entries(d).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        });
    });

}

reset()
d3.select("#searchbutton")
    .on("click", Search_Monster)
d3.select("#listbutton")
    .on("click", reset)



