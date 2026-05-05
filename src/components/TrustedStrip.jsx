export default function TrustedStrip() {
  const logos = [
    "Nimbus",
    "Prysma",
    "Cirrus",
    "Kynder",
    "Halcyn",
    "Vortex",
  ];

  const items = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-14 border-t border-white/10 mt-20">

      <p className="text-center text-gray-500 text-xs tracking-[0.35em] mb-8">
        TRUSTED BY FORWARD-THINKING TEAMS
      </p>

      <div className="relative w-full overflow-hidden marquee-mask">

        <div className="flex animate-marquee hover:paused">

          {items.map((logo, i) => (
            <div
              key={i}
              className="mx-3 px-7 py-3 rounded-full 
              border border-white/10 
              bg-white/5 backdrop-blur-xl 
              text-gray-300 whitespace-nowrap
              transition-all duration-300
              hover:border-purple-400 hover:text-white
              hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
              hover:bg-white/10"
            >
              {logo}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}