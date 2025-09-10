// src/components/Loader.jsx
import "../styles/loader.css";
import { loaderStyles } from "react-dom";

export default function Loader() {
  return (
    <>
      <style>{loaderStyles}</style>
      <div className="loader-container">
        <div className="loader">
          {/* Gradientes reutilizables */}
          <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
            <defs>
              <linearGradient id="gradient1" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
                <stop stopColor="#973BED" />
                <stop offset="1" stopColor="#007CFF" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0" y1="64" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFC800" />
                <stop offset="1" stopColor="#F0F" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="rotate"
                  values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                  dur="8s"
                  repeatCount="indefinite"
                  keyTimes="0;0.125;0.25;0.375;0.5;0.625;0.75;0.875;1"
                  keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                />
              </linearGradient>
              <linearGradient id="gradient3" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00E0ED" />
                <stop offset="1" stopColor="#00DA72" />
              </linearGradient>
            </defs>
          </svg>

          {/* M */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="48" width="48" className="inline-block">
            <path
              d="M8 56 L8 8 L16 8 L24 32 L32 8 L40 8 L48 32 L56 8 L56 56 L48 56 L48 24 L40 48 L24 48 L16 24 L16 56 Z"
              stroke="url(#gradient1)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="letter-m"
              pathLength="360"
            />
          </svg>

          {/* U */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="48" width="48" className="inline-block">
            <path
              d="M32 32 m0 -20 a20 20 0 0 1 0 40 a20 20 0 0 1 0 -40 M12 12 L12 32 M52 12 L52 32"
              stroke="url(#gradient2)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="letter-u"
              pathLength="360"
            />
          </svg>

          {/* N */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="48" width="48" className="inline-block">
            <path
              d="M12 56 L12 8 L20 8 L44 40 L44 8 L52 8 L52 56 L44 56 L20 24 L20 56 Z"
              stroke="url(#gradient3)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="letter-n"
              pathLength="360"
            />
          </svg>

          {/* D */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="48" width="48" className="inline-block">
            <path
              d="M12 8 L32 8 C48 8 56 16 56 32 C56 48 48 56 32 56 L12 56 Z M12 16 L12 48"
              stroke="url(#gradient1)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="letter-d"
              pathLength="360"
            />
          </svg>

          {/* O */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="48" width="48" className="inline-block">
            <path
              d="M32 32 m0 -20 a20 20 0 1 1 0 40 a20 20 0 1 1 0 -40"
              stroke="url(#gradient2)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="letter-o"
              pathLength="360"
            />
          </svg>

          <div className="w-2"></div>

          {/* R */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="48" width="48" className="inline-block">
            <path
              d="M12 8 L12 56 M12 8 L36 8 C44 8 48 12 48 20 C48 28 44 32 36 32 L12 32 M36 32 L48 56"
              stroke="url(#gradient3)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="letter-r"
              pathLength="360"
            />
          </svg>

          {/* A */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="48" width="48" className="inline-block">
            <path
              d="M20 56 L32 8 L44 56 M26 40 L38 40"
              stroke="url(#gradient1)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="letter-a"
              pathLength="360"
            />
          </svg>

          {/* C */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="48" width="48" className="inline-block">
            <path
              d="M48 20 A20 20 0 0 0 16 32 A20 20 0 0 0 48 44"
              stroke="url(#gradient2)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="letter-c"
              pathLength="360"
            />
          </svg>

          {/* K */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="48" width="48" className="inline-block">
            <path
              d="M12 8 L12 56 M12 32 L48 8 M12 32 L48 56"
              stroke="url(#gradient3)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="letter-k"
              pathLength="360"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
