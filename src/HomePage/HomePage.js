import React, { useEffect } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";
import * as d3 from "d3";

function HomePage() {
  useEffect(() => {
    getBudget();

    var dataSource = {
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#ffcd56",
            "#ff6384",
            "#36a2eb",
            "#fd6b19",
            "#000fff",
            "#ff90ff",
            "#tiger3",
          ],
        },
      ],
      labels: [],
    };

    function getBudget() {
      axios.get("http://localhost:3004/budget").then(function (res) {
        for (var i = 0; i < res.data.myBudget.length; i++) {
          dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
          dataSource.labels[i] = res.data.myBudget[i].title;
        }
        createChart();
      });
    }

    function createChart() {
      var ctx = document.getElementById("myChart").getContext("2d");
      var existingChart = Chart.getChart(ctx);

      // If an existing chart is found, destroy it
      if (existingChart) {
        existingChart.destroy();
      }
      var myPieChart = new Chart(ctx, {
        type: "pie",
        data: dataSource,
      });
    }
    getBudget();

    function createD3DonutChart() {
      var width = 650;
      var height = 400;
      var radius = Math.min(width, height) / 2;

      var color = d3.scaleOrdinal(d3.schemeCategory10);

      var svg = d3
        .select("#donut")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      var outerArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      d3.json("http://localhost:3004/budget").then(function (data) {
        var pie = d3.pie().value(function (d) {
          return d.budget;
        });

        var pieData = pie(data.myBudget);

        var arc = d3
          .arc()
          .innerRadius(radius - 100)
          .outerRadius(radius);

        var arcs = svg
          .selectAll("arc")
          .data(pieData)
          .enter()
          .append("g")
          .attr("class", "arc");

        arcs
          .append("path")
          .attr("d", arc)
          .attr("fill", function (d) {
            return color(d.data.title);
          });

        svg
          .selectAll("allSlices")
          .data(pieData)
          .enter()
          .append("path")
          .attr("d", arc)
          .attr("fill", function (d) {
            return color(d.data.title);
          })
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 0.7);
        svg
          .selectAll("allPolylines")
          .data(pieData)
          .enter()
          .append("polyline")
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 1)
          .attr("points", function (d) {
            var posA = arc.centroid(d);
            var posB = outerArc.centroid(d);
            var posC = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
          });

        svg
          .selectAll("allLabels")
          .data(pieData)
          .enter()
          .append("text")
          .text(function (d) {
            console.log(d.data.title);
            return d.data.title;
          })
          .attr("transform", function (d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
          })
          .style("text-anchor", function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? "start" : "end";
          });
      });
    }
    createD3DonutChart();
  }, []);

  return (
    <main className="center" id="main">
      {/* <!-- This is a Semantic HTML Change --> */}
      <section className="page-area">
        <article>
          {/* <!-- This is an SEO Change --> */}
          <h3>Stay on track</h3>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          {/* <!-- This is an SEO Change --> */}
          <h3>Alerts</h3>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          {/* <!-- This is an SEO Change --> */}
          <h3>Results</h3>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          {/* <!-- This is an SEO Change --> */}
          <h3>Free</h3>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>

        <article>
          {/* <!-- This is an SEO Change --> */}
          <h3>Stay on track</h3>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          {/* <!-- This is an SEO Change --> */}
          <h3>Alerts</h3>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          {/* <!-- This is an SEO Change --> */}
          <h3>Results</h3>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          {/* <!-- This is an SEO Change --> */}
          <h3>Chart</h3>
          <p>
            {/* <!-- This is an A11y Change --> */}
            <canvas
              id="myChart"
              width="400"
              height="400"
              aria-label="Pie chart displaying budget"
            ></canvas>
          </p>
        </article>
        <article>
          <h3>D3JS Chart</h3>
          <svg id="donut" width="650" height="500"></svg>
        </article>
      </section>
    </main>
  );
}

export default HomePage;
