export default function SealShape() {
  const bumps = Array.from({ length: 16 });

  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28">
      {bumps.map((_, i) => {
        const angle = (360 / bumps.length) * i;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-[4%] w-[24%] h-[24%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #a33853, #6e1b2e 70%, #3d0f1a 100%)",
              }}
            />
          </div>
        );
      })}
      <div
        className="absolute inset-[10%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #b33f5c, #6e1b2e 65%, #3d0f1a 100%)",
          boxShadow:
            "inset 0 2px 5px rgba(255,255,255,0.18), inset 0 -6px 12px rgba(0,0,0,0.45), 0 10px 22px rgba(61,15,26,0.5)",
        }}
      />
    </div>
  );
}