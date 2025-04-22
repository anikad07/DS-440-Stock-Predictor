import React, { useState } from 'react';
import { statisticsChartsNews, statisticsChartsSocial, pieCharts } from '@/data';
import { GaugeMeter } from '@/widgets/charts';
import { Tables } from '@/pages/dashboard/tables';
import { Tab } from 'react-tabs';

// Fetch data from an API
export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

const mapToId = (data) => data.map((item) => item.id);

const filterData = (iciData, relationship, type) => 
  iciData.filter((item) => relationship.includes(item.id) && item.type === type);

const sortData = (data) => 
  data.sort((a, b) => new Date(a.attributes.date) - new Date(b.attributes.date));

const mapToAttribute = (data, attribute) => 
  data.map((item) => item.attributes[attribute]);

const mapToFixedAttribute = (data, attribute) => 
  data.map((item) => item.attributes[attribute].toFixed(3));

const mapToTitleAndUrl = (data) => 
  data.map((item) => ({ title: item.attributes.title, url: item.attributes.url }));

const reduceCount = (data, attribute) => 
  data.map((item) => item.attributes[attribute]).reduce((a, b) => a + b, 0);

// Fetch data for charts
export const fetchChartData = async (stock_ticker, start_date, end_date) => {
  const jsonAPI = `${import.meta.env.VITE_REACT_APP_FETCH_URL}/v0/sentiment/stock/${stock_ticker}?time_start=${start_date}&time_end=${end_date}`;

  const data = await fetchData(jsonAPI);
  const chartData = cleanData(data);
  let charts = null;
  if(chartData){
    charts ={
      newsCharts : statisticsChartsNews(chartData),
      socialCharts : statisticsChartsSocial(chartData),
      pieCharts : pieCharts(chartData),
      gaugeChart : [chartData.newsCorrelation, chartData.socialCorrelation],
      topNews : chartData.topNews.slice(0, 5),
      topPosts : chartData.topPosts.slice(0, 5)
    }
  }
  return charts;
}

const cleanData = (data) => {
  const newsRelationship = mapToId(data.data.relationships.news_sentiment.data);
  const topNewsData = mapToId(data.data.relationships.top_contents_news.data);
  const socialRelationship = mapToId(data.data.relationships.social_sentiment.data);
  const topSocialData = mapToId(data.data.relationships.top_contents_social.data);
  const iciData = data.included;
  const topArticles = data.included;

  const newsIciData = filterData(iciData, newsRelationship, 'sentiments');
  const newsData = filterData(iciData,topNewsData, 'top_contents');
  const newsIciDataSorted = sortData(newsIciData);
  const newsIci = mapToFixedAttribute(newsIciDataSorted, 'daily_ici');
  const newsDate = mapToAttribute(newsIciDataSorted, 'date').map(date => new Date(date).toLocaleDateString('en-CA'));
  const topNews = mapToTitleAndUrl(newsData);
  const newsVolume = mapToAttribute(newsIciDataSorted, 'volume');
  const newsPositive = reduceCount(newsIciData, 'positive_count');
  const newsNegative = reduceCount(newsIciData, 'negative_count');
  const newsNeutral = reduceCount(newsIciData, 'neutral_count');

  const socialIciData = filterData(iciData, socialRelationship, 'sentiments');
  const socialData = filterData(iciData, topSocialData, 'top_contents');
  const socialIciDataSorted = sortData(socialIciData);
  const socialIci = mapToFixedAttribute(socialIciDataSorted, 'daily_ici');
  const socialDate = mapToAttribute(socialIciDataSorted, 'date').map(date => new Date(date).toLocaleDateString('en-CA'));
  const topPosts = mapToTitleAndUrl(socialData);
  const socialVolume = mapToAttribute(socialIciDataSorted, 'volume');
  const socialPositive = reduceCount(socialIciData, 'positive_count');
  const socialNegative = reduceCount(socialIciData, 'negative_count');
  const socialNeutral = reduceCount(socialIciData, 'neutral_count');

  return {
    newsIci,
    newsDate,
    socialIci,
    socialDate,
    newsVolume,
    socialVolume,
    newsCorrelation: data.data.attributes.news_correlation,
    socialCorrelation: data.data.attributes.social_correlation,
    newsPositive,
    newsNegative,
    newsNeutral,
    socialPositive,
    socialNegative,
    socialNeutral,
    topNews,
    topPosts
  }
}