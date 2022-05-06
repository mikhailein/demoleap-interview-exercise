window.onload = function () {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Top Oil Reserves"
        },
        axisY: {
            title: "Reserves(MMbbl)"
        },
        data: [{
            type: "column",
            showInLegend: true,
            legendMarkerColor: "grey",
            legendText: "MMbbl = one million barrels",
            dataPoints: [
                { y: 300878, label: "Venezuela" },
                { y: 266455, label: "Saudi" },
                { y: 169709, label: "Canada" },
                { y: 158400, label: "Iran" },
                { y: 142503, label: "Iraq" },
                { y: 101500, label: "Kuwait" },
                { y: 97800, label: "UAE" },
                { y: 80000, label: "Russia" }
            ]
        }]
    });
    chart.render();


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
        title: {
            text: "State Operating Funds"
        },
        legend: {
            cursor: "pointer",
            itemclick: explodePie
        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{name}: <strong>{y}%</strong>",
            indexLabel: "{name} - {y}%",
            dataPoints: [
                { y: 26, name: "School Aid", exploded: true },
                { y: 20, name: "Medical Aid" },
                { y: 5, name: "Debt/Capital" },
                { y: 3, name: "Elected Officials" },
                { y: 7, name: "University" },
                { y: 17, name: "Executive" },
                { y: 22, name: "Other Local Assistance" }
            ]
        }]
    });
    chart2.render();

}
