import { dataPointsGraphDB, dataPointsPieDB } from './costants.js'

const buttonGraph = document.querySelector(".buttonGraph");
const buttonPie = document.querySelector(".buttonPie");
const btnLocalRandomise = document.querySelector(".btnLocalRandomise");
const btnGetServer = document.querySelector(".btnGetServer");
const btnGetLocalServer = document.querySelector(".btnGetLocalServer");
const ratesChartWrapper = document.querySelector(".ratesChartWrapper");

let dataPointsGraph = dataPointsGraphDB
let dataPointsPie = dataPointsPieDB

const dataRandomizer = (array) => {
    array.forEach(i => {
        i.y = Math.floor(Math.random() * 99)
    }
    )
}


const renderGraph = (data) => {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", 
        data: [{
            type: "column",
            showInLegend: true,
            legendMarkerColor: "grey",
            dataPoints: data
        }]
    });
    chart.render();
}

const renderPie = (data) => {
    function explodePie(e) {
        if (!e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart2.render();
    }

    const chart2 = new CanvasJS.Chart("chartContainerPie", {
        exportEnabled: true,
        animationEnabled: true,
        legend: {
            cursor: "pointer",
            itemclick: explodePie
        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{name}: <strong>{y}%</strong>",
            indexLabel: "{name} - {y}%",
            dataPoints: data
        }]
    });
    chart2.render();
}

const renderFirst = () => {
    ratesChartWrapper.innerHTML = ''
    const chartContainer = document.createElement("div");
    chartContainer.id = 'chartContainer'
    chartContainer.style = "height: 370px; width: 100%;"
    ratesChartWrapper.appendChild(chartContainer)
    renderGraph(dataPointsGraph)
}

const renderSecond = () => {
    ratesChartWrapper.innerHTML = ''
    const chartContainer = document.createElement("div");
    chartContainer.id = 'chartContainerPie'
    chartContainer.style = "height: 370px; width: 100%;"
    ratesChartWrapper.appendChild(chartContainer)
    renderPie(dataPointsPie)
}

async function getDataFromServer() {
    try {
        const data = await fetch('https://api.demoleap.com/exercise', {
            method: "POST"
        })
        const response = await data.json()
        dataPointsGraph.forEach(i => { i['y'] = response['bars'][i['label']] })
        dataPointsPie.forEach(i=>{i['y']=response['pie'][i['name']]})
        renderSecond()

    } catch (error) {
        console.log(error);
    }
}

async function getDataFromLocalServer() {
    try {
        const data = await fetch('http://localhost:5000/api/data')
        const response = await data.json()
        dataPointsGraph = response['dataPointsGraph']
        dataPointsPie = response['dataPointsPie']
        renderFirst()
    } catch (error) {
        console.log(error);
    }
}


buttonGraph.addEventListener("click", () => {
    renderFirst()
});

buttonPie.addEventListener('click', () => {
    renderSecond()
})

btnLocalRandomise.addEventListener('click', () => {
    dataRandomizer(dataPointsGraph)
    dataRandomizer(dataPointsPie)
    renderFirst()
})

btnGetServer.addEventListener('click', () => {
    getDataFromServer()
})

btnGetLocalServer.addEventListener('click', () => {
    getDataFromLocalServer()
})