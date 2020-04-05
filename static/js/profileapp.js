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
    });

}

d3.select("#GenTable")
    .on("click", Generate_Table)

   