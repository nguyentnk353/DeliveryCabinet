import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Box, Grid, Paper, Typography } from '@mui/material';
import EarningCard from './components/EarningCard';
import ReactApexChart from 'react-apexcharts';
import IncomeCard from './components/IncomeCard';
import ProfitCard from './components/ProfitCard';
import getOrderIncome from '../../../services/getOrderIncome';
import getOrderList from '../../../services/getOrderList';
import { currencyTail } from '../../../constant/constant';

const index = () => {
  const gridSpacing = 3;
  const [table, setTable] = useState([]);
  const [totalIncome, setTotalIncome] = useState([]);
  const [profit, setProfit] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const initialValue = 0;
  const sumTotalIncome = totalIncome.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  const startYear = moment().startOf('year');
  const startYearClone = startYear.clone();
  const startYearEnd = moment().startOf('year');
  const startYearEndClone = startYearEnd.endOf('months');
  const m = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const betweenMonths = m.map((e, i) => {
    return {
      startMonth: moment(startYearClone)
        .add(i, 'months')
        .format('YYYY-MM-DDTHH:mm[Z]'),
      endMonth: moment(startYearEndClone)
        .add(i, 'months')
        .format('YYYY-MM-DDTHH:mm[Z]'),
    };
  });

  useMount(() => {
    const payload = {};
    getOrderList(payload)
      .then((res) => {
        setTotalOrder(res.totalRecord);
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
    if (betweenMonths.length == 12) {
      for (const e of betweenMonths) {
        const payload = {
          startdate: e.startMonth,
          enddate: e.endMonth,
        };
        getOrderIncome(payload)
          .then((res) => {
            const newElement = {
              month: moment(payload.startdate).utc().format('MM'),
              income: res.totalIncome,
              order: res.items,
            };
            setTable((oldArray) => [...oldArray, newElement]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
  useEffect(() => {
    const sortDate = table.sort((a, b) => a.month - b.month);
    if (sortDate.length > 11) {
      setTable(sortDate);
    }
    if (table.length > 11) {
      const income = table.map((e) => e.income);
      setTotalIncome(income);
    }
  }, [table]);

  const newChartData = {
    series: [
      {
        name: 'Income',
        data: totalIncome,
      },
      {
        name: 'Profit',
        data: totalIncome.map((e) => e - (e * 8) / 10),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        title: {
          text: 'VND',
        },
        labels: {
          formatter: function (val) {
            return new Intl.NumberFormat('vi-VN').format(val);
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return new Intl.NumberFormat('vi-VN').format(val) + currencyTail;
          },
        },
      },
    },
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <IncomeCard sum={sumTotalIncome} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ProfitCard sum={sumTotalIncome} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <EarningCard sum={totalOrder} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <Paper
              elevation={0}
              sx={{ padding: '2rem 3rem 2rem 2rem', borderRadius: '8px' }}
            >
              <Typography
                variant='h6'
                sx={{ fontWeight: '700', marginBottom: '1rem' }}
              >
                Earning chart
              </Typography>
              <ReactApexChart
                options={newChartData.options}
                series={newChartData.series}
                type='bar'
                height={350}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default index;
