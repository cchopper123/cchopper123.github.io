///////////////////////////////////////////////////////////
////////////////// JAVASCRIPT BEGINS HERE /////////////////

///////////////////////////////////////////////////////////
$(document).ready(function () {
  // Chart initialization code
  var maxDataPoints = 10;

  // Setup to use charts
  google.charts.load("current", { packages: ["corechart"] });
  google.setOnLoadCallback(drawVisualization);
  function drawVisualization() {
    /////////////////////////////////////////////////
    // CHART PREP SECTION: DO NOT TOUCH /////////////
    /////////////////////////////////////////////////
    var jsonChart = new google.visualization.LineChart($("#json-chart")[0]);
    var ajaxChart = new google.visualization.LineChart($("#ajax-chart")[0]);
    var wsChart = new google.visualization.LineChart($("#ws-chart")[0]);
    var jsonData = google.visualization.arrayToDataTable([
      ["Time", "JSON Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Polling Temperature"],
      [getTime(), 0],
    ]);
    var wsData = google.visualization.arrayToDataTable([
      ["Time", "WebSocket Polling Temperature"],
      [getTime(), 0],
    ]);

    var options = {
      title: "Temperature",
      curveType: "function",
      animation: {
        duration: 1000,
        easing: "in",
      },
      legend: { position: "bottom" },
    };
    /////////////////////////////////////////////////
    // END CHART PREP SECTION: //////////////////////
    /////////////////////////////////////////////////

    // Code to add a data point
    function addDataPoint(dataPoint, dataSet, chart) {
      if (dataSet.getNumberOfRows() > maxDataPoints) {
        dataSet.removeRow(0);
      }
      dataSet.addRow([getTime(), dataPoint.value]);
      chart.draw(dataSet, options);
    }

    // TODO 3: Initialize high and low records
    const jsonSim = {
      highest: 0,
      lowest: 100,
      highID: "json-sim-highest",
      lowID: "json-sim-lowest",
    };
    const ajaxTemp = {
      highest: 0,
      lowest: 100,
      highID: "ajax-temp-highest",
      lowID: "ajax-temp-lowest",
    };

    const ajaxAir = {
      highest: 0,
      lowest: 100,
      highID: "ajax-air-highest",
      lowID: "ajax-air-lowest",
    };

    const wsSim = {
      highest: 0,
      lowest: 100,
      highID: "ws-sim-highest",
      lowID: "ws-sim-lowest",
    };

    $("#json-sim-chart-container").append(
      `<p id=${jsonSim.highID}>Highest recorded JSON value is ${jsonSim.highest}</p>`,
    );

    $("#json-sim-chart-container").append(
      `<p id=${jsonSim.lowID}>Lowest recorded JSON value is ${jsonSim.lowest}</p>`,
    );

    //temperature polling records
    $("#ajax-temp-chart-container").append(
      `<p id=${ajaxTemp.highID}>Highest recorded Ajax value is ${ajaxTemp.highest}</p>`,
    );
    $("#ajax-temp-chart-container").append(
      `<p id=${ajaxTemp.lowID}>Lowest recorded Ajax value is ${ajaxTemp.lowest}</p>`,
    );

    $("#ajax-air-chart-container").append(
      `<p id=${ajaxAir.highID}>Highest recorded Ajax value is ${ajaxAir.highest}</p>`,
    );
    $("#ajax-air-chart-container").append(
      `<p id=${ajaxAir.lowID}>Lowest recorded Ajax value is ${ajaxAir.lowest}</p>`,
    );

    //websockect polling records
    $("#ws-sim-chart-container").append(
      `<p id=${wsSim.highID}>Highest recorded WS value is ${wsSim.highest}</p>`,
    );
    $("#ws-sim-chart-container").append(
      `<p id=${wsSim.lowID}>Lowest recorded WS value is ${wsSim.lowest}</p>`,
    );

    // TODO 4: Update high and low records
    function updateRecords(value, object) {
      if (value > object.highest) {
        object.highest = value;
        $(`#${object.highID}`).text(
          `Highest recorded value is ${object.highest}`,
        );
      }
      if (value < object.lowest) {
        object.lowest = value;
        $(`#${object.lowID}`).text(`Lowest recorded value is ${object.lowest}`);
      }
      console.log(object, highID, lowID);
      // }
      // function updateJSONRecords(value) {
      //   if (value > jsonSim.highest) {
      //     jsonSim.highest = value;
      //     $("#json-sim-highest").text(`Highest recorded value is ${jsonSim.highest}`);
      //   }
      //   if (value < jsonSim.lowest) {
      //     jsonSim.lowest = value;
      //     $("#json-sim-lowest").text(`Lowest recorded value is ${jsonSim.lowest}`);
      //   }
      // // }
      // function updateAjaxRecords(value) {
      //   if (value > ajaxSim.highest) {
      //     ajaxSim.highest = value;
      //     $("#ajax-sim-highest").text(`Highest recorded value is ${ajaxSim.highest}`);
      //   }
      //   if (value < ajaxSim.lowest) {
      //     ajaxSim.lowest = value;
      //     $("#ajax-sim-lowest").text(`Lowest recorded value is ${ajaxSim.lowest}`);
      //   }
      // }
      // function updateWSRecords(value) {
      //   if (value > wsSim.highest) {
      //     wsSim.highest = value;
      //     $("#ws-sim-highest").text(`Highest recorded value is ${wsSim.highest}`);
      //   }
      //   if (value < wsSim.lowest) {
      //     wsSim.lowest = value;
      //     $("#ws-sim-lowest").text(`Lowest recorded value is ${wsSim.lowest}`);
      //   }
    }

    // TODO 5: Regular JSON Polling
    function doJSONPoll() {
      $.getJSON("http://localhost:8080/", function (result) {
        // Callback code will go here in the next steps
        // addDataPoint(result, ajaxData, ajaxChart);

        addDataPoint(result, jsonData, jsonChart);
        // addDataPoint(result, wsData, wsChart);
        // updateAjaxRecords(result.value);
        updateJSONRecords(result.value);
        // updateWSRecords(result.value);
      });
    }
    setInterval(doJSONPoll, 2000);
    // TODO 6: AJAX Polling
    function doAJAXPoll() {
      $.ajax({
        url: "http://localhost:8080/",
        method: "GET",
        dataType: "json",
        success: function (result) {
          addDataPoint(result, ajaxData, ajaxChart);
          updateAjaxRecords(result.value);
          // Fill in the body of the success function
        },
      });
    }
    setInterval(doAJAXPoll, 1500);
    // TODO 7: WebSocket Polling
    var socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = function (event) {
      var result = JSON.parse(event.data);
      addDataPoint(result, wsData, wsChart);
      updateWSRecords(result.value);
    };

    socket.onerror = function (error) {
      // Code for handling errors will go here
      console.error("WebSocket error:", error);
    };
    // Do not work below this line
    function getTime() {
      var d = new Date();
      return d.toLocaleTimeString();
    }
  }
});
