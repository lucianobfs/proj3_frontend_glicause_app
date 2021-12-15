import { useState, useEffect } from "react";
import Chart from "chart.js/auto";

function Graph(props) {
  const [chart, setChart] = useState(null);

  // const [loading, setLoading] = useState(true);

  // const [graph, setGraph] = useState(props.glucoseList);

  // useEffect(() => {
  //   async function fetchGraph() {
  //     try {
  //       const response = await api.get("/profile");

  //       setGlucoseData(response.data.glucose);
  //       console.log(glucoseData);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   }
  //   fetchGraph();
  // }, []);

  useEffect(() => {
    function renderChart() {
      let ctx = document.getElementById("myCanvas").getContext("2d");
      if (chart) {
        chart.destroy();
      }

      let chartInstance = new Chart(ctx, {
        width: "100px",
        height: "100px",
        type: "line",
        data: {
          labels: props.glucoseList
            .sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            })
            .map((item) => {
              return item.date;
            }),
          datasets: [
            {
              label: "Your Blood Glucose Measurement in mg/dL",
              data: props.glucoseList.map((item) => {
                return item.value;
              }),
              borderColor: "#0330fc",
              backgroundColor: "#AAACAC",
              fill: false,
            },
          ],
        },
      });

      setChart(chartInstance);
    }

    renderChart();
  }, [props.glucoseList]);

  return (
    <div>
      <div className="container container-fluid">
        <canvas id="myCanvas" className="mt-5 " />
      </div>
    </div>
  );
}

export default Graph;
