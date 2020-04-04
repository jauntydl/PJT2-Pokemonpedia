//#,Name,Type 1,Type 2,Total,HP,Attack,Defense,Sp. Atk,Sp. Def,Speed,Generation,Legendary
var datapath = "../resources/Pokemon.csv";
var monster_tot = 801;
function selectMonster() {
    return Math.ceil(Math.random() * (monster_tot+1));
}

var monster1_index = selectMonster();
console.log(monster1_index);

var monster2_index = selectMonster();
console.log(monster2_index);

function Battle(){
    d3.csv(datapath).then(function(p){ 
        var monster1_name = p[monster1_index].Name;
        console.log(monster1_name)
        var monster1_power = p[monster1_index].Total;
        console.log(monster1_power)
        var monster1_hp = p[monster1_index].HP;
        var monster1_att = p[monster1_index].Attack;
        var monster1_def = p[monster1_index].Defense;
        var monster1_satt = p[monster1_index]["Sp. Atk"];
        var monster1_sdef = p[monster1_index]["Sp. Def"];
        console.log(monster1_sdef)
        var monster1_spd = p[monster1_index].Speed;
        

        var monster2_name = p[monster2_index].Name;
        console.log(monster2_name)
        var monster2_power = p[monster2_index].Total;
        console.log(monster2_power)
        var monster2_hp = p[monster2_index].HP;
        var monster2_att = p[monster2_index].Attack;
        var monster2_def = p[monster2_index].Defense;
        var monster2_satt = p[monster2_index]["Sp. Atk"];
        var monster2_sdef = p[monster2_index]["Sp. Def"];
        console.log(monster1_sdef)
        var monster2_spd = p[monster2_index].Speed;
        var winner = " "

        if (monster1_power > monster2_power){
            winner = monster1_name
        } else if (monster1_power < monster2_power){
            winner = monster2_name
        } else{
            winner ="tie"
        }
    console.log("And the Winner is: " + winner);

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
 
Plotly.plot( barDiv, data, layout );
    
    });
}

Battle()

d3.csv(datapath).then(function(data) {
    console.log(data[56]);
})



