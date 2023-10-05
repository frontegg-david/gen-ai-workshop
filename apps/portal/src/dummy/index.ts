import { createContext, useContext } from 'react';

interface DummyData {
  user: {
    roles: string;
    name: string;
    lastLogin: string;
  },
  lastUserFlow: string[]
  recentNotifications: string[]
}

export type Type = 'financials' | 'admin' | 'sales' | 'support'

export const userExamples: Record<Type, DummyData> = {
  financials: {
    user: {
      roles: 'Financial',
      name: 'David Financials',
      lastLogin: 'Sat Sep 25 2023 14:12:27 GMT+0300',
    },
    lastUserFlow: [
      'login',
      'invoices_page',
      'last_month_financials',
      'send_payment_reminder',
      'overview_page',
    ],
    recentNotifications: [
      '10 New payments accepted by vendor',
      '20 new users have signed up today',
      '12 payments rejected by vendor',
      '10 invoices are waiting for approval',
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
      // "DDOS attack detect",
      // "12 security indicators are in red",
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
      'top_installed_countries',
      'campaigns_page',
      'add_new_campaign',
      'overview_page',
    ],
    recentNotifications: [
      'First install from Germany',
      'New application version deployed to AppStore',
      '22 new reviews on AppStore and Google Play',
      'Campaign #213 is over',
      '44 Campaigns are waiting for launch',
    ]
  },
  support: {
    user: {
      roles: 'support',
      name: 'Support User',
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
      '22 tickets are waiting for response',
      'Raz Shlomo has opened a new ticket',
      'New application version deployed to AppStore',
      'Bug #213 is fixed',
    ]
  }
}

const DummyDataContext = createContext<DummyData>({} as DummyData)

export const DummyDataProvider = DummyDataContext.Provider
export const useDummyData = () => {
  return useContext(DummyDataContext)
}
