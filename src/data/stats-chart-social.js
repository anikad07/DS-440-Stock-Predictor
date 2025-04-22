import { chartsConfig } from "@/configs";

export const chatterVolumeChart = (data) =>({
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: data.socialVolume,
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "15%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: data.socialDate,
    },
  },
});

export const iciChart = (data) => ({
  type: "line",
  height: 220,
  series: [
    {
      name: "ICI",
      data: data.socialIci,
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: data.socialDate,
    },
  },
});

// pie chart for sentiment
export const sentimentDistributionChart = (data) =>({
  type: "pie",
  height: 220,
  series: [data.socialPositive, data.socialNegative, data.socialNeutral],
  options: {
    ...chartsConfig,
    labels: ["Bullish", "Bearish", "Neutral"],
    colors: ["#388e3c", "#f44336", "#ffeb3b"],
  },
});

export const statisticsChartsSocial = (data) => {
  if (!data) {
    return null;
  }
 return [
  {
    color: "white",
    title: "Chatter Volume",
    description: "Number of posts per day",
    footer: "updated 4 min ago",
    chart: chatterVolumeChart(data),
  },
  {
    color: "white",
    title: "Daily Sentiment Synergy",
    description: "ICI Indicates the sentiment of the stock",
    footer: "updated 4 min ago",
    chart: iciChart(data),
  },
 
]};

export default statisticsChartsSocial;
