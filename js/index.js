
const buttonGraph = document.querySelector("#buttonGraph");
const buttonPie = document.querySelector("#buttonPie");
const btnLocalRandomise = document.querySelector("#btnLocalRandomise");
const btnGetServer = document.querySelector("#btnGetServer");
const btnGetLocalServer = document.querySelector("#btnGetLocalServer");
const ratesChartWrapper = document.querySelector("#ratesChartWrapper");



const dataRandomizer = (array) => {
    array.forEach(i => {
        i.y = Math.floor(Math.random() * 99)
    }
    )
}

let dataPointsGraph = [
    { y: 13, label: "Jan." },
    { y: 22, label: "Feb." },
    { y: 23, label: "Mar." },
    { y: 38, label: "Apr." },
    { y: 45, label: "May." },
    { y: 39, label: "Jun." },
    { y: 42, label: "Jul." },
    { y: 47, label: "Aug." },
    { y: 34, label: "Sep." },
    { y: 17, label: "Oct." },
    { y: 28, label: "Nov." },
    { y: 12, label: "Dec." },
]

let dataPointsPie = [
    { y: 26, name: "School Aid", },
    { y: 20, name: "Medical Aid" },
    { y: 5, name: "Debt/Capital" },
    { y: 3, name: "Elected Officials" },
    { y: 7, name: "University" },
    { y: 17, name: "Executive" },
    { y: 22, name: "Other Local Assistance" }
]

const renderGraph = (data) => {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
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
        if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
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
    ratesChartWrapper.insertAdjacentHTML('beforeend', '<div id="chartContainer" style="height: 370px; width: 100%;"></div>')
    renderGraph(dataPointsGraph)
}

const renderSecond = () => {
    ratesChartWrapper.innerHTML = ''
    ratesChartWrapper.insertAdjacentHTML('beforeend', '<div id="chartContainerPie" style="height: 370px; width: 100%;"></div>')
    renderPie(dataPointsPie)
}

async function getDataFromServer() {
    try {
        const data = await fetch('https://api.demoleap.com/exercise', {
            method: "POST",
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/',
                'Access-Control-Allow-Credentials': 'true'
            }
        })

        console.log(data);

        const response = await data.json()

        console.log(response);

    } catch (error) {
        console.log(error);
    }
}

async function getDataFromLocalServer() {
    try {
        const data = await fetch('http://localhost:5000/api/data')
        const response = await data.json()
        dataPointsGraph = response.dataPointsGraph
        dataPointsPie = response.dataPointsPie
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