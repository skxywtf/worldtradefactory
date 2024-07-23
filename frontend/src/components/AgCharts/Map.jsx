import React, { useEffect, useRef } from "react";
import * as agCharts from "ag-charts-community";
//import {data} from './data8.js';
import topology from "./topology.js";
import { AgCharts } from "ag-charts-community";
import {
  europeData,
  asiaData,
  africaData,
  northAmericaData,
  southAmericaData,
  oceaniaData,
} from "./data8.js";
import "ag-charts-enterprise";

const Map = () => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const labelOptions = {
      labelKey: "iso2",
      labelName: "Country Code",
      label: {
        fontWeight: "lighter",
      },
    };

    const options = {
      container: document.getElementById("myChart"),
      //data: data(),
      title: {
        text: "World Map",
      },
      topology,
      series: [
        {
          type: "map-shape-background",
          topology,
        },
        {
          type: "map-shape",
          topology,
          data: europeData,
          title: "Europe",
          idKey: "name",
          topologyIdKey: "NAME_ENGL",
          ...labelOptions,
        },
        {
          type: "map-shape",
          topology,
          data: asiaData,
          title: "Asia",
          idKey: "name",
          topologyIdKey: "NAME_ENGL",
          ...labelOptions,
        },
        {
          type: "map-shape",
          topology,
          data: africaData,
          title: "Africa",
          idKey: "name",
          topologyIdKey: "NAME_ENGL",
          ...labelOptions,
        },
        {
          type: "map-shape",
          topology,
          data: northAmericaData,
          title: "North America",
          idKey: "name",
          topologyIdKey: "NAME_ENGL",
          ...labelOptions,
        },
        {
          type: "map-shape",
          topology,
          data: southAmericaData,
          title: "South America",
          idKey: "name",
          topologyIdKey: "NAME_ENGL",
          ...labelOptions,
        },
        {
          type: "map-shape",
          topology,
          data: oceaniaData,
          title: "Oceania",
          idKey: "name",
          topologyIdKey: "NAME_ENGL",
          ...labelOptions,
        },
      ],
      legend: {
        enabled: true,
        item: {
          marker: {
            shape: "circle",
          },
        },
      },
    };

    const chart = agCharts.AgCharts.create(options);
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div
      id="myChart"
      ref={chartContainerRef}
      style={{ width: "100%", height: "600px" }}
    ></div>
  );
};

export default Map;
