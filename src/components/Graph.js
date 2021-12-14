import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import api from "../apis/api";

function Graph() {
  const [glucoseData, setGlucoseData] = useState([]);

  const [chart, setChart] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGraph() {
      try {
        const response = await api.get("/profile");

        setGlucoseData(response.data.glucose);
        console.log(glucoseData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchGraph();
  }, []);

  useEffect(() => {
    if (!loading) {
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
            labels: glucoseData.sort((a, b) => {
              return new Date(a.date) - new Date (b.date)
            }).map((item) => {
                return item.date
            }),
            datasets: [
              {
                label: "Your Blood Glucose Measurement in mg/dL",
                data: glucoseData.map((item) => {
                    return item.value
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
    }
  }, [loading]);

  return (
    <div>
      {loading ? (
        <div className="spinner-border align-content-center" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
          <div className="container container-fluid">
        <canvas id="myCanvas" className="mt-5 " />
        </div>
      )}
    </div>
  );
}

export default Graph;
