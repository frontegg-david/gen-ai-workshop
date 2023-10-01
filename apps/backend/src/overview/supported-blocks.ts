import { faker } from '@faker-js/faker';

export const overviewSections = () => [
  {
    id: 'welcome_section',
    description: 'Static Welcome Section along with Recent Notifications',
    items: [ {
      id: 'welcome_message',
      title: 'Welcome Message',
      type: 'WelcomeMessage',
      cols: 8
    }, {
      id: 'recent_notifications',
      title: 'Recent Notifications',
      type: 'ResentNotifications',
      cols: 4
    } ]
  },
  {
    id: 'users-stats-section',
    description: 'Users Stats Section (New Users, Active Users, Abandoned Users)',
    items: [
      {
        id: 'total_new_users',
        title: 'Total New Users',
        type: 'StatsCard',
        cols: 4,
        startColor: '#ff8f66',
        endColor: '#ff7300',
        value: faker.number.int({ min: 300, max: 1000 }),
        chartData: Array(10).fill(0).map(() => faker.number.int({ min: 2, max: 20 })),
        percentage: faker.number.float({ min: -1, max: +1, precision: 0.01 }),
      },
      {
        id: 'total_active_users',
        title: 'Total Active Users',
        type: 'StatsCard',
        cols: 4,
        startColor: '#61F3F3',
        endColor: '#00B8D9',
        value: faker.number.int({ min: 1000, max: 3000 }),
        chartData: Array(10).fill(0).map(() => faker.number.int({ min: 20, max: 100 })),
        percentage: faker.number.float({ min: -5, max: +5, precision: 0.01 }),
      },
      {
        id: 'total_abandoned_users',
        title: 'Total Abandoned Users',
        type: 'StatsCard',
        cols: 4,
        startColor: '#ff667d',
        endColor: '#ff002f',
        value: faker.number.int({ min: 100, max: 500 }),
        chartData: Array(10).fill(0).map(() => faker.number.int({ min: 2, max: 5 })),
        percentage: faker.number.float({ min: -1, max: +1, precision: 0.01 }),
      },
    ]
  },
  {
    id: 'app_stats_section',
    description: 'App Stats Section (App Installs, Uninstalls)',
    items: [
      {
        id: 'total_app_installs',
        title: 'Total App Installs',
        type: 'StatsCard',
        cols: 6,
        startColor: '#FFD666',
        endColor: '#FFAB00',
        value: faker.number.int({ min: 8000, max: 15000 }),
        chartData: Array(10).fill(0).map(() => faker.number.int({ min: 20, max: 100 })),
        percentage: faker.number.float({ min: -3, max: +3, precision: 0.01 }),
      },
      {
        id: 'total_app_uninstalls',
        title: 'Total App Uninstalls',
        type: 'StatsCard',
        cols: 6,
        startColor: '#ff668a',
        endColor: '#ff002f',
        value: faker.number.int({ min: 200, max: 800 }),
        chartData: Array(10).fill(0).map(() => faker.number.int({ min: 5, max: 30 })),
        percentage: faker.number.float({ min: -3, max: +3, precision: 0.01 }),
      }
    ]
  },
  {
    id: 'app_downloads_section',
    description: 'App Downloads Section (Downloads Per Platform, Top Downloads Countries)',
    items: [
      {
        id: 'app_downloads_per_platform',
        title: 'Downloads Per Platform',
        type: 'PieChartCard',
        cols: 4,
        values: Array(4).fill(0).map(() => faker.number.int({ min: 5000, max: 20000 })),
        labels: [ 'Android', 'iOS', 'Windows', 'Mac' ],
      },
      {
        id: 'top_app_download_countries',
        title: 'Area Downloads',
        type: 'AxesChartCard',
        cols: 8,
        values: Array(5).fill(0).map((x, index) => ({
          name: faker.location.country(),
          data: Array(10).fill(0).map((x, index2) => faker.number.int({
            min: index2 * 20 + index * 50 + 30,
            max: 100 + (index * 100) + (index2 * 20)
          }))
        }))
      },
    ]
  },
  {
    id: 'financial_stats_section',
    description: 'Financial Stats Section (Total Revenue, Total Profit, Total Loss)',
    items: [ {
      id: 'financial_income',
      title: 'Income',
      type: 'BgStatsCard',
      cols: 4,
      bgColor: '#daf1e5',
      lineColor: '#007868',
      value: faker.number.int({ min: 10000, max: 20000 }),
      chartData: Array(14).fill(0).map((x, i) => faker.number.int({ min: 200 + i * 10, max: 500 + i * 10 })),
    }, {
      id: 'financial_expenses',
      title: 'Expenses',
      type: 'BgStatsCard',
      cols: 4,
      prefix: '$',
      bgColor: '#fff3dc',
      lineColor: '#b76e00',
      value: faker.number.int({ min: 4000, max: 7000 }),
      chartData: Array(14).fill(0).map((x, i) => faker.number.int({ min: 50 + i * 2, max: 150 + i * 2 })),
    }, {
      id: 'financial_current_balance',
      title: 'Current Balance',
      type: 'BgStatsCard',
      cols: 4,
      prefix: '$',
      bgColor: '#f4f4f4',
      lineColor: '#3d444a',
      value: faker.number.int({ min: 6000, max: 12000 }),
      chartData: Array(14).fill(0).map((x, i) => faker.number.int({ min: 100 + i * 5, max: 300 + i * 5 })),
    } ],
  }, {
    id: 'financial_balance_history_section',
    description: 'Financial Balance History Section (Balance Statistics, Recent Transitions)',
    items: [ {
      id: 'balance_statistics',
      title: 'Balance Statistics',
      type: 'BarChartCard',
      cols: 8
    }, {
      id: 'recent_transitions',
      title: 'Recent Transitions',
      type: 'ListCard',
      cols: 4
    } ],
  }, {
    id: 'product_stats_section',
    description: 'Product Stats Section (Product News, Product Sold, Customer Conversion Rates)',
    items: [
      {
        id: 'product_news',
        title: 'Product News',
        type: 'ListCard',
        cols: 4
      },
      {
        id: 'product_sold',
        title: 'Product Sold',
        type: 'StatsCard',
        cols: 4,
        startColor: '#a366ff',
        endColor: '#8400ff'
      },
      {
        id: 'customer_conversion_rates',
        title: 'Customer Conversion Rates',
        type: 'ListCard',
        cols: 4
      },
    ]
  }, {
    id: 'support_stats_section',
    description: 'Support Stats Section (Tickets By type, Total Opened/Resolved Tickets)',
    items: [
      {
        id: 'tickets_by_type',
        title: 'Tickets By Type',
        type: 'PieChartCard',
        cols: 4,
        values: Array(4).fill(0).map((x,i) => faker.number.int({ min: 2, max: 5 + i*4 })),
        colors: [ '#FF5630','#FFAB00','#00A76F', '#d5d5d5'],
        labels: [ 'Bug', 'Support', 'Feature Request', 'Others' ],
      },
      {
        id: 'total_opened_support_tickets',
        title: 'Total Active/Resolved Tickets',
        type: 'AxesChartCard',
        cols: 8,
        values: [{
          name: "Resolved",
          color: "#9aff9a",
          data: Array(14).fill(0).map(() => faker.number.int({
            min: 5,
            max: 10
          }))
        },{
          name: "Active",
          color: "#ee1770",
          data: Array(14).fill(0).map(() => faker.number.int({
            min: 4,
            max: 7
          }))
        }]
      },

    ]
  }
]

export const overviewBlocks = [

  {
    id: 'total_website_visits',
    title: 'Top Installed Countries',
    type: 'list',
    cols: 4,
  },
  {
    id: 'total_search_hits',
    title: 'Total Search Hits',
    type: 'list',
    cols: 4,
  },

  {
    id: 'customer_reviews',
    title: 'Customer Reviews',
    type: 'ListCard',
    cols: 4
  },

  {
    id: 'sales_profit',
    title: 'Sales Profit',
    type: 'StatsCard',
    cols: 4,
    startColor: '#666eff',
    endColor: '#2200ff'
  },
  {
    id: 'sale_by_gender',
    title: 'Sale By Gender',
    type: 'PieChartCard',
    cols: 4
  },

  {
    id: 'total_security_incidents',
    title: 'Total Security Incidents',
    type: 'box-chart',
    cols: 4
  },
  {
    id: 'security_incidents_by_type',
    title: 'Security Incidents By Type',
    type: 'PieChartCard',
    cols: 4
  },
]
