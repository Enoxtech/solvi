export interface CablePackage {
  id: string
  name: string
  description: string
  price: number
  duration: string
}

export interface CableProvider {
  id: string
  name: string
  logo: string
  idLabel: string
  packages: CablePackage[]
}

export const cableProviders: CableProvider[] = [
  {
    id: "dstv",
    name: "DSTV",
    logo: "/logos/dstv.png",
    idLabel: "Smartcard Number",
    packages: [
      {
        id: "dstv-premium",
        name: "Premium",
        description: "All channels + HD + Sports",
        price: 24500,
        duration: "month",
      },
      {
        id: "dstv-compact-plus",
        name: "Compact Plus",
        description: "130+ channels + HD",
        price: 16600,
        duration: "month",
      },
      {
        id: "dstv-compact",
        name: "Compact",
        description: "95+ channels + select HD",
        price: 10500,
        duration: "month",
      },
      {
        id: "dstv-family",
        name: "Family",
        description: "85+ channels",
        price: 6800,
        duration: "month",
      },
      {
        id: "dstv-access",
        name: "Access",
        description: "70+ channels",
        price: 2950,
        duration: "month",
      },
    ],
  },
  {
    id: "gotv",
    name: "GOTV",
    logo: "/logos/gotv.png",
    idLabel: "IUC Number",
    packages: [
      {
        id: "gotv-max",
        name: "GOtv Max",
        description: "75+ channels + Sports",
        price: 4850,
        duration: "month",
      },
      {
        id: "gotv-jolli",
        name: "GOtv Jolli",
        description: "68+ channels",
        price: 3300,
        duration: "month",
      },
      {
        id: "gotv-jinja",
        name: "GOtv Jinja",
        description: "58+ channels",
        price: 2250,
        duration: "month",
      },
      {
        id: "gotv-lite",
        name: "GOtv Lite",
        description: "48+ channels",
        price: 1100,
        duration: "month",
      },
    ],
  },
  {
    id: "showmax",
    name: "SHOWMAX",
    logo: "/logos/showmax.png",
    idLabel: "IUC Number",
    packages: [
      {
        id: "showmax-entertainment",
        name: "Entertainment",
        description: "Movies & Series",
        price: 2900,
        duration: "month",
      },
      {
        id: "showmax-mobile",
        name: "Mobile",
        description: "Mobile only access",
        price: 1450,
        duration: "month",
      },
      {
        id: "showmax-pro",
        name: "Pro",
        description: "Entertainment + Sports",
        price: 6300,
        duration: "month",
      },
      {
        id: "showmax-pro-mobile",
        name: "Pro Mobile",
        description: "Mobile only with Sports",
        price: 3200,
        duration: "month",
      },
    ],
  },
  {
    id: "startimes",
    name: "StarTimes",
    logo: "/logos/startimes.png",
    idLabel: "Smart Card Number",
    packages: [
      {
        id: "startimes-nova",
        name: "Nova",
        description: "Basic channels",
        price: 1200,
        duration: "month",
      },
      {
        id: "startimes-basic",
        name: "Basic",
        description: "40+ channels",
        price: 1900,
        duration: "month",
      },
      {
        id: "startimes-smart",
        name: "Smart",
        description: "60+ channels",
        price: 2600,
        duration: "month",
      },
      {
        id: "startimes-super",
        name: "Super",
        description: "80+ channels",
        price: 4200,
        duration: "month",
      },
    ],
  },
]

