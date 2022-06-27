import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import anychart from 'anychart';
import { useSelector } from 'react-redux';

const Diagram = () => {
  const { ticker } = useParams();

  const stockData = useSelector((state) => {
    const shares = state.finances.finance[ticker];

    if (shares) {
      return shares.map(({ last_trade_time, price }) => {
        const time = new Date(last_trade_time);

        return [`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`, price];
      });
    }

    return [];
  });
  const currentStockData = useMemo(() => stockData[stockData.length - 1], [stockData]);

  const chartLine = useRef(null);

  useEffect(() => {
    if (chartLine.current) {
      chartLine.current.append(currentStockData);
    }
  }, [currentStockData]);
  useEffect(() => {
    anychart.onDocumentReady(function () {
      var dataSet = anychart.data.set(stockData);

      var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

      var chart = anychart.line();

      // adding dollar symbols to yAxis labels

      chart.yAxis().labels().format('${%Value}');

      // turn on chart animation
      chart.animation(true);

      // turn on the crosshair
      chart
        .crosshair()
        .enabled(true)
        .yLabel({ enabled: false })
        .yStroke(null)
        .xStroke('#cecece')
        .zIndex(99);

      chart
        .yAxis()
        .title(`The Share Price ${ticker}`)
        .labels({ padding: [5, 5, 0, 5] });
      chart.xAxis().title('5 seconds');

      // set chart title text settings
      chart.title(`The cost of the ${ticker} promotion during the month`);

      // create first series with mapped data
      var firstSeries = chart.spline(firstSeriesData);
      firstSeries.name('Price');
      firstSeries.markers().zIndex(100);
      firstSeries.hovered().markers().enabled(true).type('circle').size(4);

      // turn the legend on
      chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0]);

      // set container id for the chart
      chart.container('container');

      // initiate chart drawing
      chart.draw();
      chartLine.current = dataSet;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="container" style={{ height: '500px', width: '800px' }}></div>;
};

export default Diagram;
