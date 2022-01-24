// @ts-nocheck
// @ts-ignore
import React, { useEffect, useState } from 'react';
import OLTPService from '../../service/OLTPService';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';
import HashLoader from 'react-spinners/HashLoader';
import { css } from '@emotion/react';
const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;

export const Reports = () => {
  const reports = [
    'Valoarea totala a vanzarilor fiecarui produs pe ultimii 10 ani defalcat in functie de tipul de vanzare: in-house sau delivery',
    'Valoarea toala a produselor vandute din fiecare meniu, precum si numarul total de produse vandute din fiecare meniu, alaturi de totalul vanzarilot si numarul total de produse vandute.',
    'Suma totala a vanzarilor pe produse de anul trecut fata de acum 2 ani (pentru a mima o comparatie a anului curent cu anul trecut), precum si procent din total.',
    'Timpul mediu de livrare per judete si quarter.',
    'Evolutia vanzarilor pentru produsele care necesita gatire pe ficare luna a anului trecut, comparativ cu luna ianuarie (valoare totala si procent)',
  ];
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const [products, setProducts] = useState([]);
  const [salesData, setAllSalesData] = useState([]);
  const [salesTotal10Years, setSalesTotal10Years] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('Apa');

  const [itemSales, setItemSales] = useState([]);

  const [itemSalesComparison, setItemSalesComparison] = useState([]);

  const [avgDeliveryData, setAvgDeliveryData] = useState([]);

  const [itemsRequireCookingData, setItemsRequireCookingData] = useState([]);
  const [months, setMonths] = useState([]);

  const initReport1 = async () => {
    setLoading(true);
    const { data } = await OLTPService.getSalesTotalValueFor10Years();

    const products = data.map((_el) => _el.TITLE);
    setProducts(_.uniq(products));
    setAllSalesData(data);
  };

  const initReport2 = async () => {
    setLoading(true);
    const { data: itemSalesData } = await OLTPService.getItemSales();
    const parsedData = itemSalesData
      .filter((_item) => _item.ITEM !== 'Grand Total')
      .map((_item) => ({
        name: _item.ITEM,
        total: _item.TOTAL / 10,
        numberOfItems: _item.NOOFITEMS,
      }));
    setItemSales(parsedData);
    setLoading(false);
  };

  const initReport3 = async () => {
    setLoading(true);
    const itemSalesComparisonResponse =
      await OLTPService.getItemSalesComparison();
    const itemSalesComparisonParsed = [];
    itemSalesComparisonResponse.data.forEach((_el) => {
      itemSalesComparisonParsed.push({
        name: _el.ITEM,
        value2020: _el.TOTAL2020,
        value2021: _el.TOTAL2021,
      });
    });

    setItemSalesComparison(itemSalesComparisonParsed);
    setLoading(false);
  };

  const initReport4 = async () => {
    setLoading(true);
    const { data: avgDeliveryData } =
      await OLTPService.getAverageDeliveryTime();
    const counties = _.uniq(avgDeliveryData.map((_el) => _el.COUNTY));
    const parsedAvgDeliveryData = counties.map((county) => ({
      name: county,
      year2019: {
        q1: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2019
        ).Q1,
        q2: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2019
        ).Q2,
        q3: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2019
        ).Q3,
        q4: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2019
        ).Q4,
      },
      year2020: {
        q1: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2020
        ).Q1,
        q2: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2020
        ).Q2,
        q3: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2020
        ).Q3,
        q4: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2020
        ).Q4,
      },
      year2021: {
        q1: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2021
        ).Q1,
        q2: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2021
        ).Q2,
        q3: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2021
        ).Q3,
        q4: avgDeliveryData.find(
          (_el) => _el.COUNTY === county && _el.YEARID === 2021
        ).Q4,
      },
    }));
    setAvgDeliveryData(parsedAvgDeliveryData);
    setLoading(false);
  };

  const initReport5 = async () => {
    setLoading(true);
    const { data: salesItemsRequireCookingData } =
      await OLTPService.getSalesForItemsThatRequireCooking();

    const products = _.uniq(
      salesItemsRequireCookingData.map((_el) => _el.TITLE)
    );
    const months = _.uniq(
      salesItemsRequireCookingData.map((_el) => _el.MONTH_NAME)
    );
    const parsedSalesCookingData = products.map((product) => ({
      name: product,
    }));
    months.forEach((month) => {
      products.forEach((product, idx) => {
        parsedSalesCookingData[idx][month.trim()] =
          salesItemsRequireCookingData.find(
            (_el) => _el.TITLE === product && _el.MONTH_NAME === month
          ).TOTAL;
      });
    });
    setMonths(months.map((month) => month.trim()));
    setItemsRequireCookingData(parsedSalesCookingData);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedReport === 0) initReport1();
    if (selectedReport === 1) initReport2();
    if (selectedReport === 2) initReport3();
    if (selectedReport === 3) initReport4();
    if (selectedReport === 4) initReport5();
  }, [selectedReport]);

  useEffect(() => {
    if (salesData.length > 0) {
      setLoading(true);
      const filteredData = salesData.filter(
        (_el) => _el.TITLE === selectedProduct
      );
      const parsedData = Object.keys(filteredData[0])
        .filter((key) => key !== 'SALETYPE' && key !== 'TITLE')
        .map((key) => ({
          name: key,
          delivery: filteredData.find((_el) => _el.SALETYPE === 'DELIVERY')[
            key
          ],
          inHouse: filteredData.find((_el) => _el.SALETYPE === 'IN-HOUSE')[key],
        }));
      setSalesTotal10Years(parsedData);
      setLoading(false);
    }
  }, [salesData, selectedProduct]);

  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50, -50%)',
          margin: 'auto',
        }}
      >
        <HashLoader css={override} color="#1976d2" />
      </div>
    );
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label-1">Report</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-1"
          value={selectedReport}
          label="Report"
          onChange={(e) => setSelectedReport(e.target.value)}
        >
          {reports.map((report, idx) => (
            <MenuItem key={idx} value={idx}>
              {report}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedReport === 0 && (
        <div style={{ marginTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-2">Produs</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-2"
              value={selectedProduct}
              label="Produs"
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {products.map((product, idx) => (
                <MenuItem key={idx} value={product}>
                  {product}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ReactEcharts
            option={{
              legend: {},
              tooltip: {},
              dataset: {
                source: [
                  ['year', 'Delivery', 'In House'],
                  ...salesTotal10Years.map((_el) => [
                    _el.name,
                    _el.delivery,
                    _el.inHouse,
                  ]),
                ],
              },
              xAxis: { type: 'category' },
              yAxis: {},
              series: [{ type: 'bar' }, { type: 'bar' }],
            }}
          />
        </div>
      )}
      {selectedReport === 1 && (
        <ReactEcharts
          option={{
            legend: {},
            tooltip: {},
            dataset: {
              source: [
                ['product', 'Sold items', 'Total'],
                ...itemSales.map((_el) => [
                  _el.name,
                  _el.numberOfItems,
                  _el.total,
                ]),
              ],
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [{ type: 'bar' }, { type: 'bar' }],
          }}
        />
      )}
      {selectedReport === 2 && (
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ width: '50%' }}>
            <ReactEcharts
              option={{
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                series: [
                  {
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: itemSalesComparison.map((item) => ({
                      name: item.name,
                      value: item.value2020,
                    })),
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                      },
                    },
                  },
                ],
              }}
            />
          </div>
          <div style={{ width: '50%' }}>
            <ReactEcharts
              option={{
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                series: [
                  {
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: itemSalesComparison.map((item) => ({
                      name: item.name,
                      value: item.value2021,
                    })),
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                      },
                    },
                  },
                ],
              }}
            />
          </div>
        </div>
      )}
      {selectedReport === 3 && (
        <ReactEcharts
          option={{
            legend: {},
            tooltip: {},
            dataset: {
              source: [
                ['quarter', ...avgDeliveryData.map((_el) => _el.name)],
                ['Q1 2019', ...avgDeliveryData.map((_el) => _el.year2019.q1)],
                ['Q2 2019', ...avgDeliveryData.map((_el) => _el.year2019.q2)],
                ['Q3 2019', ...avgDeliveryData.map((_el) => _el.year2019.q3)],
                ['Q4 2019', ...avgDeliveryData.map((_el) => _el.year2019.q4)],
                ['Q1 2020', ...avgDeliveryData.map((_el) => _el.year2020.q1)],
                ['Q2 2020', ...avgDeliveryData.map((_el) => _el.year2020.q2)],
                ['Q3 2020', ...avgDeliveryData.map((_el) => _el.year2020.q3)],
                ['Q4 2020', ...avgDeliveryData.map((_el) => _el.year2020.q4)],
                ['Q1 2021', ...avgDeliveryData.map((_el) => _el.year2021.q1)],
                ['Q2 2021', ...avgDeliveryData.map((_el) => _el.year2021.q2)],
                ['Q3 2021', ...avgDeliveryData.map((_el) => _el.year2021.q3)],
                ['Q4 2021', ...avgDeliveryData.map((_el) => _el.year2021.q4)],
              ],
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
            ],
          }}
        />
      )}
      {selectedReport === 4 && (
        <ReactEcharts
          option={{
            legend: {},
            tooltip: {},
            dataset: {
              source: [
                ['product', ...months.map((_el) => _el)],
                ...itemsRequireCookingData.map((_el) => [
                  _el.name,
                  _el.JANUARY,
                  _el.FEBRUARY,
                  _el.MARCH,
                  _el.APRIL,
                  _el.MAY,
                  _el.JUNE,
                  _el.JULY,
                  _el.AUGUST,
                  _el.SEPTEMBER,
                  _el.OCTOBER,
                  _el.NOVEMBER,
                  _el.DECEMBER,
                ]),
              ],
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
              { type: 'bar' },
            ],
          }}
        />
      )}
    </>
  );
};
