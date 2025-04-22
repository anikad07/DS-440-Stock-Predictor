import { chartsConfig } from "@/configs";

export const chatterVolumeChart = (newsData) =>({
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: newsData.newsVolume,
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
      categories: newsData.newsDate,
    },
  },
});

export const iciChart = (newsData) => ({
  type: "line",
  height: 220,
  series: [
    {
      name: "ICI",
      data:  newsData.newsIci,
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
      categories: newsData.newsDate,
    },
  },
});

// pie chart for sentiment
export const sentimentDistributionChart = (newsData) =>({
  type: "pie",
  height: 220,
  series: [newsData.newsPositive, newsData.newsNegative, newsData.newsNeutral],
  options: {
    ...chartsConfig,
    labels: ["Bullish", "Bearish", "Neutral"],
    colors: ["#388e3c", "#f44336", "#ffeb3b"],
  },
});

export const statisticsChartsNews = (newsData) => {
  if(!newsData){
    return null;
  }

  return [
  {
    color: "white",
    title: "Chatter Volume",
    description: "Number of posts per day",
    footer: "updated 4 min ago",
    chart: chatterVolumeChart(newsData),
  },
  {
    color: "white",
    title: "Daily Sentiment Synergy",
    description: "ICI Indicates the sentiment of the stock",
    footer: "updated 4 min ago",
    chart: iciChart(newsData),
  },
  
]};

export default statisticsChartsNews;
