"use client"

export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Background image with nebulae overlay - from Dashboard */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-24%20at%2014.57.39_28c0e81b.jpg-9gjhuenPx0rmt6RH1DWWbovFZCZVrh.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {/* Gradient overlay with nebulae colors */}
      <div
        className="fixed inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom right, rgba(58, 16, 120, 0.85), rgba(77, 150, 255, 0.75))",
        }}
      />

      {/* Nebulae pattern overlay */}
      <div className="fixed inset-0 z-10 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(249,0,191,0.3)_0,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(45,205,223,0.3)_0,_transparent_50%)]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0,_transparent_40%)]"></div>
      </div>
    </div>
  )
}

