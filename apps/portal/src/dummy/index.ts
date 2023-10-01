import { createContext, useContext } from 'react';

export const dummyData = {
  financials: {
    user: {
      roles: 'Financial',
      name: 'David Antoon',
      lastLogin: 'Sat Sep 25 2023 14:12:27 GMT+0300',
    },
    lastUserFlow: [
      'login',
      'invoices_page',
      'sort_by_income',
      'overview_page',
    ],
    recentNotifications: [
      '10 New payments accepted by vendor',
      '20 new users have signed up today',
      'New application version deployed to AppStore',
      '2 users blocked due to login attempts',
    ]
  },
  admin: {
    user: {
      roles: 'SystemAdmin',
      name: 'Aviad Mizrachi',
      lastLogin: 'Sat Sep 27 2023 14:12:27 GMT+0300',
    },
    lastUserFlow: [
      'login',
      'users_page',
      'account_settings_page',
      'website_analytics_page',
      'overview_page',
    ],
    recentNotifications: [
      '10 new users have signed up today',
      'New application version deployed to AppStore',
      '2 users blocked due to login attempts',
      '3 new reviews on AppStore',
      'application is down',
      'application is up',
    ]
  },
  sales: {
    user: {
      roles: 'Sales',
      name: 'Sales User',
      lastLogin: 'Sat Sep 26 2023 14:12:27 GMT+0300',
    },
    lastUserFlow: [
      'login',
      'active_customers_page',
      'download_per_platform',
      'top_installed_countries',
      'overview_page',
    ],
    recentNotifications: [
      'First install from Germany',
      'New application version deployed to AppStore',
      '3 new reviews on AppStore',
      '12 new demo request',
    ]
  },
  devSuccess: {
    user: {
      roles: 'Sales',
      name: 'Sales User',
      lastLogin: 'Sat Sep 26 2023 14:12:27 GMT+0300',
    },
    lastUserFlow: [
      'login',
      'active_customers_page',
      'download_per_platform',
      'top_installed_countries',
      'overview_page',
    ],
    recentNotifications: [
      'First install from Germany',
      'New application version deployed to AppStore',
      '3 new reviews on AppStore',
      '12 new demo request',
    ]
  }
}


const DummyData = createContext<any>({})

export const DummyDataProvider = DummyData.Provider
export const useDummyData = ()=>{
  return useContext(DummyData)
}
