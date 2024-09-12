import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/data")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                drawChart(data);
            });
    }, []);

    const drawChart = (data) => {
        const width = 500;
        const height = 300;

        const svg = d3
            .select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#f4f4f4");

        const xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.year))
            .range([0, width])
            .padding(0.4);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.intensity)])
            .range([height, 0]);

        svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        svg.append("g").call(d3.axisLeft(yScale));

        svg
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.year))
            .attr("y", (d) => yScale(d.intensity))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d.intensity))
            .attr("fill", "#69b3a2");
    };

    return <div id="chart"></div>;
};

export default Dashboard;
