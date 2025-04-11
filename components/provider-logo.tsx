interface ProviderLogoProps {
  name: string
  size?: number
}

export function ProviderLogo({ name, size = 32 }: ProviderLogoProps) {
  const normalizedName = name.toLowerCase()

  // Network providers
  if (normalizedName.includes("mtn")) {
    return (
      <div
        className="bg-yellow-400 rounded-full flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="font-bold text-xs text-black">MTN</span>
      </div>
    )
  }

  if (normalizedName.includes("airtel")) {
    return (
      <div className="bg-red-600 rounded-full flex items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-bold text-xs text-white">Airtel</span>
      </div>
    )
  }

  if (normalizedName.includes("glo")) {
    return (
      <div className="bg-green-600 rounded-full flex items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-bold text-xs text-white">GLO</span>
      </div>
    )
  }

  if (normalizedName.includes("9mobile") || normalizedName.includes("9m")) {
    return (
      <div className="bg-green-500 rounded-full flex items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-bold text-xs text-white">9M</span>
      </div>
    )
  }

  // Cable TV providers
  if (normalizedName.includes("dstv")) {
    return (
      <div className="bg-blue-600 rounded-full flex items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-bold text-xs text-white">DSTV</span>
      </div>
    )
  }

  if (normalizedName.includes("gotv")) {
    return (
      <div className="bg-green-600 rounded-full flex items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-bold text-xs text-white">GOTV</span>
      </div>
    )
  }

  if (normalizedName.includes("showmax")) {
    return (
      <div className="bg-black rounded-full flex items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-bold text-xs text-white">SM</span>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="bg-gray-300 rounded-full flex items-center justify-center" style={{ width: size, height: size }}>
      <span className="font-bold text-xs text-gray-600">{name.substring(0, 2).toUpperCase()}</span>
    </div>
  )
}

