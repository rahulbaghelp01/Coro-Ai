 
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="base" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#b8c7f8" />
            <stop offset="45%" stopColor="#758bc7" />
            <stop offset="100%" stopColor="#151c51" />
          </linearGradient>

          <radialGradient id="light">
            <stop offset="0%" stopColor="#fff9ff" stopOpacity="0.98" />
            <stop offset="38%" stopColor="#e4dafa" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#d6d9ff" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="blue">
            <stop offset="0%" stopColor="#365acb" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#426bd5" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#426bd5" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="violet">
            <stop offset="0%" stopColor="#5554c9" />
            <stop offset="65%" stopColor="#6860d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8d83eb" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="shadow">
            <stop offset="0%" stopColor="#66749b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#18204c" stopOpacity="0" />
          </radialGradient>

          <filter id="soften" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="55" />
          </filter>

          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.12" />
            </feComponentTransfer>
          </filter>
        </defs>

        <rect width="1440" height="900" fill="url(#base)" />

        <g filter="url(#soften)">
          <ellipse
            cx="720" cy="100" rx="570" ry="280"
            fill="url(#light)"
          />
          <ellipse
            cx="120" cy="390" rx="400" ry="430"
            fill="url(#blue)"
          />
          <ellipse
            cx="1200" cy="235" rx="350" ry="260"
            fill="url(#violet)"
          />
          
        </g>
 
      </svg>
    </div>
  );
}
