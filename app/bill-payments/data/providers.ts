export interface DataPlan {
  id: string
  name: string
  amount: number
  validity: string
}

export interface Provider {
  id: string
  name: string
  type: string
  plans?: DataPlan[]
}

export const providers: Provider[] = [
  {
    id: "mtn",
    name: "MTN",
    type: "airtime",
    plans: [
      { id: "mtn-100mb", name: "100MB", amount: 200, validity: "24 hours" },
      { id: "mtn-1gb", name: "1GB", amount: 500, validity: "7 days" },
      { id: "mtn-2gb", name: "2GB", amount: 1000, validity: "30 days" },
      { id: "mtn-5gb", name: "5GB", amount: 2000, validity: "30 days" },
      { id: "mtn-10gb", name: "10GB", amount: 3000, validity: "30 days" },
      { id: "mtn-20gb", name: "20GB", amount: 5000, validity: "30 days" },
    ],
  },
  {
    id: "airtel",
    name: "Airtel",
    type: "airtime",
    plans: [
      { id: "airtel-100mb", name: "100MB", amount: 200, validity: "24 hours" },
      { id: "airtel-1gb", name: "1GB", amount: 500, validity: "7 days" },
      { id: "airtel-2gb", name: "2GB", amount: 1000, validity: "30 days" },
      { id: "airtel-5gb", name: "5GB", amount: 2000, validity: "30 days" },
      { id: "airtel-10gb", name: "10GB", amount: 3000, validity: "30 days" },
      { id: "airtel-20gb", name: "20GB", amount: 5000, validity: "30 days" },
    ],
  },
  {
    id: "glo",
    name: "GLO",
    type: "airtime",
    plans: [
      { id: "glo-100mb", name: "100MB", amount: 200, validity: "24 hours" },
      { id: "glo-1gb", name: "1GB", amount: 500, validity: "7 days" },
      { id: "glo-2gb", name: "2GB", amount: 1000, validity: "30 days" },
      { id: "glo-5gb", name: "5GB", amount: 2000, validity: "30 days" },
      { id: "glo-10gb", name: "10GB", amount: 3000, validity: "30 days" },
      { id: "glo-20gb", name: "20GB", amount: 5000, validity: "30 days" },
    ],
  },
  {
    id: "9mobile",
    name: "9mobile",
    type: "airtime",
    plans: [
      { id: "9mobile-100mb", name: "100MB", amount: 200, validity: "24 hours" },
      { id: "9mobile-1gb", name: "1GB", amount: 500, validity: "7 days" },
      { id: "9mobile-2gb", name: "2GB", amount: 1000, validity: "30 days" },
      { id: "9mobile-5gb", name: "5GB", amount: 2000, validity: "30 days" },
      { id: "9mobile-10gb", name: "10GB", amount: 3000, validity: "30 days" },
      { id: "9mobile-20gb", name: "20GB", amount: 5000, validity: "30 days" },
    ],
  },
]

export const quickAmounts = [100, 200, 500, 1000, 2000, 5000]

