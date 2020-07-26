//Gauge 1 [Temperature]
am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // create chart
    var chart = am4core.create("chartdiv", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.innerRadius = -25;

    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;

    var colorSet = new am4core.ColorSet();

    var range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 5;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(9);
    range0.axisFill.zIndex = -1;

    var range1 = axis.axisRanges.create();
    range1.value = 5;
    range1.endValue = 95;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(16);
    range1.axisFill.zIndex = -1;

    var range2 = axis.axisRanges.create();
    range2.value = 95;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(9);
    range2.axisFill.zIndex = -1;
    
    var hand = chart.hands.push(new am4charts.ClockHand());

    // using chart.setTimeout method as the timeout will be disposed together with a chart
    chart.setTimeout(randomValue, 2000);

    function randomValue() {
        hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
        chart.setTimeout(randomValue, 2000);
    }

}); // end am4core.ready()

//Gauge 2 [Humidity]
am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // create chart
    var chart = am4core.create("chartdiv2", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.innerRadius = -25;

    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;

    var colorSet = new am4core.ColorSet();

    var range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 5;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(9);
    range0.axisFill.zIndex = -1;

    var range1 = axis.axisRanges.create();
    range1.value = 5;
    range1.endValue = 95;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(16);
    range1.axisFill.zIndex = -1;

    var range2 = axis.axisRanges.create();
    range2.value = 95;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(9);
    range2.axisFill.zIndex = -1;

    var hand = chart.hands.push(new am4charts.ClockHand());

    // using chart.setTimeout method as the timeout will be disposed together with a chart
    chart.setTimeout(randomValue, 2000);

    function randomValue() {
        hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
        chart.setTimeout(randomValue, 2000);
    }

}); // end am4core.ready()

// Gauge 3 [VOC]
am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // create chart
    var chart = am4core.create("chartdiv3", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.innerRadius = -25;

    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;

    var colorSet = new am4core.ColorSet();

    var range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 5;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(9);
    range0.axisFill.zIndex = -1;

    var range1 = axis.axisRanges.create();
    range1.value = 5;
    range1.endValue = 95;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(16);
    range1.axisFill.zIndex = -1;

    var range2 = axis.axisRanges.create();
    range2.value = 95;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(9);
    range2.axisFill.zIndex = -1;

    var hand = chart.hands.push(new am4charts.ClockHand());

    // using chart.setTimeout method as the timeout will be disposed together with a chart
    chart.setTimeout(randomValue, 2000);

    function randomValue() {
        hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
        chart.setTimeout(randomValue, 2000);
    }

}); // end am4core.ready()

// Gauge 4 [CO2]
am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // create chart
    var chart = am4core.create("chartdiv4", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.innerRadius = -25;

    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;

    var colorSet = new am4core.ColorSet();

    var range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 5;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(9);
    range0.axisFill.zIndex = -1;

    var range1 = axis.axisRanges.create();
    range1.value = 5;
    range1.endValue = 95;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(16);
    range1.axisFill.zIndex = -1;

    var range2 = axis.axisRanges.create();
    range2.value = 95;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(9);
    range2.axisFill.zIndex = -1;

    var hand = chart.hands.push(new am4charts.ClockHand());

    // using chart.setTimeout method as the timeout will be disposed together with a chart
    chart.setTimeout(randomValue, 2000);

    function randomValue() {
        hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
        chart.setTimeout(randomValue, 2000);
    }

}); // end am4core.ready()

