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

    var jsonSimChart = new google.visualization.LineChart(
      $("#json-sim-chart")[0],
    );
    var wsSimChart = new google.visualization.LineChart($("#ws-sim-chart")[0]);

    var ajaxTempChart = new google.visualization.LineChart(
      $("#ajax-temp-chart")[0],
    );
    var ajaxAirChart = new google.visualization.LineChart(
      $("#ajax-air-chart")[0],
    );

    ///////
    //DATA HERE
    //////

    var jsonSimData = google.visualization.arrayToDataTable([
      ["Time", "JSON Simulation Polling Temperature"],
      [getTime(), 0],
    ]);
    var wsSimData = google.visualization.arrayToDataTable([
      ["Time", "WebSocket Simulation Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxTempData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Purple Air Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxAirData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Purple Air Polling Quality"],
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
    //air

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
    function updateRecords(record, value) {
      //console.log("Updating records with value:", object, value, object.id);
      if (value > record.highest) {
        record.highest = value;
        $(`#${record.highID}`).text(
          `Highest recorded value is ${record.highest}`,
        );
      }
      if (value < record.lowest) {
        record.lowest = value;
        $(`#${record.lowID}`).text(`Lowest recorded value is ${record.lowest}`);
      }
      //console.log(object, highID, lowID);
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

        addDataPoint(result, jsonSimData, jsonSimChart);
        console.log("JSON polling result received:", result);
        // addDataPoint(result, wsData, wsChart);
        // updateAjaxRecords(result.value);
        updateRecords(jsonSim, result.value);
        // updateWSRecords(result.value);
      });
    }

    setInterval(doJSONPoll, 5000);
    // TODO 6: AJAX Polling

    function doPurpleAirAJAXPollTemp() {
      $.ajax({
        url: "https://api.purpleair.com/v1/sensors/300625?fields=temperature",
        method: "GET",
        dataType: "json",
        headers: {
          "X-API-Key": "131A84F5-19A2-11F1-B596-4201AC1DC123"
        },
        success: function (result) {
          addDataPoint(result, ajaxTempData, ajaxTempChart);
          console.log("Temperature result received:", result);
          updateRecords(ajaxTemp, result.value);
          // Fill in the body of the success function
        },
        error: function (error) {
          console.error("AJAX error:", error);
        },
      });
    }
    setInterval(doPurpleAirAJAXPollTemp, 1000);

    // TODO 7: WebSocket Polling
    var socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = function (event) {
      var result = JSON.parse(event.data);
      addDataPoint(result, wsSimData, wsSimChart);
      console.log("WebSocket message received:", result);
      updateRecords(wsSim, result.value);
    };

    socket.onerror = function (error) {
      // Code for handling errors will go here
      console.error("WebSocket error:", error);
    };

    function doPurpleAirAJAXPollAir() {
      $.ajax({
        url: "https://api.purpleair.com/v1/sensors/300625?fields=pm2.5",
        method: "GET",
        dataType: "json",
        headers: {
          "X-API-Key": "131A84F5-19A2-11F1-B596-4201AC1DC123"
        },
        success: function (result) {
          addDataPoint(result, ajaxAirData, ajaxAirChart);
          console.log("Air quality result received:", result);
          updateRecords(ajaxAir, result.value);
          // Fill in the body of the success function
        },
        error: function (error) {
          console.error("AJAX error:", error);
        },
      });
    }
    setInterval(doPurpleAirAJAXPollAir, 3000);

    // Do not work below this line
    function getTime() {
      var d = new Date();
      return d.toLocaleTimeString();
    }
  }
});
