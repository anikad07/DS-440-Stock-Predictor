import React, { useState, useEffect } from "react";
import {
  Typography
} from "@material-tailwind/react";
import { Tables } from "@/pages/dashboard/tables";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { StatisticsChart, GaugeMeter } from "@/widgets/charts";
import { SearchCard } from "@/widgets/layout";
import { ClockIcon } from "@heroicons/react/24/solid";

export function Home() {
  const [chartNewsData, setChartNewsData] = useState(null);
  const [chartSocialData, setChartSocialData] = useState(null);
  const [pieCharts, setPieCharts] = useState(null);
  const [gaugeData, setGaugeData] = useState(null);
  const [topNews, setTopNews] = useState(null);
  const [topPosts, setTopPosts] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  //  Listen for forecast events
  const [stockForecast, setStockForecast] = useState(null);

  useEffect(() => {
    const handleForecast = (event) => {
      setStockForecast(event.detail);
      setTabIndex(0); // auto switch to Synergy tab
    };
    window.addEventListener("stock-forecast", handleForecast);
    return () => window.removeEventListener("stock-forecast", handleForecast);
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-12 flex justify-center items-center gap-x-4">
        <SearchCard
          setNewsData={setChartNewsData}
          setSocialData={setChartSocialData}
          setGaugeData={setGaugeData}
          setPieCharts={setPieCharts}
          setTopNews={setTopNews}
          setTopPosts={setTopPosts}
        />
      </div>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Stock Price Synergy</Tab>
          <Tab>News</Tab>
          <Tab>Social Media</Tab>
        </TabList>

        {/*  STOCK PRICE SYNERGY TAB */}
        <TabPanel>
          {stockForecast && (
            <div className="bg-white shadow-md p-6 rounded mb-6">
              <p><strong>Symbol:</strong> {stockForecast.symbol}</p>
              <p><strong>Latest Close:</strong> ${stockForecast.latestClose}</p>
              <p><strong>Sentiment:</strong> {stockForecast.sentiment}</p>
              <p><strong>Forecasted Price:</strong> ${stockForecast.forecast["1_month"]}</p>
              <p><strong>Recommendation:</strong> {stockForecast.recommendation}</p>
            </div>
          )}

          <GaugeMeter values={gaugeData} />

          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
            {pieCharts && pieCharts.map((props) => (
              <StatisticsChart key={props.title} {...props} />
            ))}
          </div>
        </TabPanel>

        {/*  NEWS TAB */}
        <TabPanel>
          <div className="md:w-100">
            <h1 className="text-3xl font-bold my-4">News</h1>
            <div className="mb-6 grid grid-cols-2 gap-4">
              {chartNewsData && chartNewsData.map((props) => (
                <StatisticsChart
                  key={props.title}
                  {...props}
                  footer={
                    <Typography variant="small" className="flex items-center text-blue-gray-600">
                      <ClockIcon className="h-4 w-4 text-blue-gray-400" />
                      &nbsp;{props.footer}
                    </Typography>
                  }
                />
              ))}
            </div>
            <Tables topData={topNews} tabIndex={tabIndex} />
          </div>
        </TabPanel>

        {/* 👇 SOCIAL MEDIA TAB */}
        <TabPanel>
          <div className="md:w-100">
            <h1 className="text-3xl font-bold my-4">Social Media</h1>
            <div className="mb-6 grid grid-cols-2 gap-4">
              {chartSocialData && chartSocialData.map((props) => (
                <StatisticsChart
                  key={props.title}
                  {...props}
                  footer={
                    <Typography variant="small" className="flex items-center text-blue-gray-600">
                      <ClockIcon className="h-4 w-4 text-blue-gray-400" />
                      &nbsp;{props.footer}
                    </Typography>
                  }
                />
              ))}
            </div>
            <Tables topData={topPosts} tabIndex={tabIndex} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Home;