export interface ElectricityProvider {
  id: string
  name: string
  shortName: string
  logo: string
}

export const electricityProviders: ElectricityProvider[] = [
  {
    id: "aedc",
    name: "Abuja Electricity",
    shortName: "AEDC",
    logo: "/logos/aedc.png",
  },
  {
    id: "bedc",
    name: "Benin Electricity",
    shortName: "BEDC",
    logo: "/logos/bedc.png",
  },
  {
    id: "ekedc",
    name: "Eko Electricity",
    shortName: "EKEDC",
    logo: "/logos/ekedc.png",
  },
  {
    id: "eedc",
    name: "Enugu Electricity",
    shortName: "EEDC",
    logo: "/logos/eedc.png",
  },
  {
    id: "ibedc",
    name: "Ibadan Electricity",
    shortName: "IBEDC",
    logo: "/logos/ibedc.png",
  },
  {
    id: "ikedc",
    name: "Ikeja Electricity",
    shortName: "IKEDC",
    logo: "/logos/ikedc.png",
  },
  {
    id: "jed",
    name: "Jos Electricity",
    shortName: "JED",
    logo: "/logos/jed.png",
  },
  {
    id: "kaedco",
    name: "Kaduna Electricity",
    shortName: "KAEDCO",
    logo: "/logos/kaedco.png",
  },
  {
    id: "kedco",
    name: "Kano Electricity",
    shortName: "KEDCO",
    logo: "/logos/kedco.png",
  },
  {
    id: "phed",
    name: "Port Harcourt Electricity",
    shortName: "PHED",
    logo: "/logos/phed.png",
  },
]

