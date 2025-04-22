import stocks from '../data/stocks'


export function fetchSuggestions(query) {
    return new Promise((resolve) => {
      const suggestions = stocks.filter(stock =>
        (stock.Symbol.toLowerCase().includes(query.toLowerCase())) || (stock.Security.toLowerCase().includes(query.toLowerCase()))
      );
      
      resolve(suggestions);
    });
  }
