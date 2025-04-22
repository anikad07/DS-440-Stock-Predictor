import { chartsConfig } from "@/configs";

// pie chart for sentiment
const sentimentDistributionChartNews = (data) =>({
    type: "pie",
    height: 220,
    series: [data.newsPositive, data.newsNegative, data.newsNeutral],
    options: {
      ...chartsConfig,
      labels: ["Bullish", "Bearish", "Neutral"],
      colors: ["#388e3c", "#f44336", "#ffeb3b"],
    },
  });

const sentimentDistributionChartSocial = (data) =>({
    type: "pie",
    height: 220,
    series: [data.socialPositive, data.socialNegative, data.socialNeutral],
    options: {
      ...chartsConfig,
      labels: ["Bullish", "Bearish", "Neutral"],
      colors: ["#388e3c", "#f44336", "#ffeb3b"],
    },
  });


  export const pieCharts = (data) => {
    if (!data) {
      return null;
    }
   return [
    {
      color: "white",
      title: "News Sentiment Distribution",
  
      chart: sentimentDistributionChartNews(data),
    },
    {
        color: "white",
        title: "Social Sentiment Distribution",
      
        chart: sentimentDistributionChartSocial(data),
      },
  ]};
  
  export default pieCharts;