//#,Name,Type 1,Type 2,Total,HP,Attack,Defense,Sp. Atk,Sp. Def,Speed,Generation,Legendary
var datapath = "../resources/Pokemon.csv";
var monster_tot = 801;
function selectMonster() {
    return Math.ceil(Math.random() * (monster_tot+1));
}


function Chart(){
    window.onload = function () {

        var options = {
            exportEnabled: true,
            animationEnabled: true,
            title:{
                text: "Stat Comparison"
            },
            subtitles: [{
                text: "Click Legend to Hide or Unhide Data Series"
            }],
            axisX: {
                title: "Stats"
            },
            axisY: {
                title: "Monster 1 Power Level",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC",
                includeZero: true
            },
            axisY2: {
                title: "Monster 2 Power Level",
                titleFontColor: "#C0504E",
                lineColor: "#C0504E",
                labelFontColor: "#C0504E",
                tickColor: "#C0504E",
                includeZero: true
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: [{
                type: "bar",
                name: "Monster 1",
                showInLegend: true,
                xValueFormatString: "#,##0 Units",
                yValueFormatString: "#,##0 Units",
                dataPoints: [
                    { x: "HP",  y: monster1_hp },
                    { x: "Attack", y: monster1_att },
                    { x: "Defense", y: monster1_def  },
                    { x: "Special Attack",  y: monster1_satt },
                    { x: "Special Defense",  y: monster1_sdef },
                    { x: "Speed",  y: monster1_spd }
                   
                ]
            },
            {
                type: "bar",
                name: "Monster 2",
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "#,##0 Units",
                yValueFormatString: "$#,##0.#",
                dataPoints: [
                    { x: "HP",  y: monster2_hp },
                    { x: "Attack", y: monster2_att },
                    { x: "Defense", y: monster2_def  },
                    { x: "Special Attack",  y: monster2_satt },
                    { x: "Special Defense",  y: monster2_sdef },
                    { x: "Speed",  y: monster2_spd }
                ]
            }]
        };
        $("#chartContainer").CanvasJSChart(options);
        
        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }
        
        }
}

function Battle(){
    var monster1_index = selectMonster();
    //console.log(monster1_index);

    var monster2_index = selectMonster();
    //console.log(monster2_index);
    d3.csv(datapath).then(function(p){ 
        var monster1_name = p[monster1_index].Name;
        //console.log(monster1_name)
        var monster1_power = p[monster1_index].Total;
        //console.log(monster1_power)
        var monster1_hp = p[monster1_index].HP;
        var monster1_att = p[monster1_index].Attack;
        var monster1_def = p[monster1_index].Defense;
        var monster1_satt = p[monster1_index]["Sp. Atk"];
        var monster1_sdef = p[monster1_index]["Sp. Def"];
        //console.log(monster1_sdef)
        var monster1_spd = p[monster1_index].Speed;
        
        var monster2_name = p[monster2_index].Name;
        //console.log(monster2_name)
        var monster2_power = p[monster2_index].Total;
        //console.log(monster2_power)
        var monster2_hp = p[monster2_index].HP;
        var monster2_att = p[monster2_index].Attack;
        var monster2_def = p[monster2_index].Defense;
        var monster2_satt = p[monster2_index]["Sp. Atk"];
        var monster2_sdef = p[monster2_index]["Sp. Def"];
        //console.log(monster1_sdef)
        var monster2_spd = p[monster2_index].Speed;
        var winner = " "

        if (monster1_power > monster2_power){
            winner = monster1_name
        } else if (monster1_power < monster2_power){
            winner = monster2_name
        } else{
            winner ="It's a tie!"
        }
    console.log("And the Winner is: " + winner);
    var list = d3.select(".battle");

    // remove any children from the list to
    list.html("");

    // append stats to the list
    list.append("li").text("The two fighters are:" + monster1_name + " and " + monster2_name);
    list.append("li").text("The winner is.....");
    list.append("li").text(winner);
    Chart()
    
    
    
    
    });

    
}

//Battle()

d3.csv(datapath).then(function(data) {
    console.log(data[56]);
})



