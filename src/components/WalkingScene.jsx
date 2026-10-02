import './WalkingScene.css';

export default function WalkingScene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene__sky" />
      <div className="scene__stars" />
      <div className="scene__light-halo" />
      <div className="scene__light-core" />

      <svg className="scene__hills" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <path d="M0,220 C220,160 380,240 620,190 C860,140 1040,230 1440,170 L1440,300 L0,300 Z" className="scene__hill scene__hill--far" />
        <path d="M0,260 C260,210 460,270 720,230 C980,190 1180,260 1440,220 L1440,300 L0,300 Z" className="scene__hill scene__hill--near" />
      </svg>

      <div className="scene__fog scene__fog--back" />

      <svg className="scene__figure" viewBox="0 0 160 300" preserveAspectRatio="xMidYMax meet">
        <g className="figure__body">
          <path
            className="figure__bag"
            d="M96,108 C118,104 128,122 122,144 C118,160 100,164 90,152 C82,142 84,114 96,108 Z"
          />
          <path
            className="figure__strap"
            d="M78,96 L104,150"
          />
          <path
            className="figure__torso"
            d="M62,92 C58,80 70,70 82,70 C94,70 106,80 102,92 L108,158 C108,168 96,174 82,174 C68,174 56,168 56,158 Z"
          />
          <circle className="figure__head" cx="82" cy="54" r="19" />
          <path
            className="figure__arm figure__arm--right"
            d="M100,100 C110,112 112,128 106,144"
          />
          <path
            className="figure__arm figure__arm--left"
            d="M66,100 C58,114 56,130 60,146"
          />
          <path
            className="figure__leg figure__leg--right"
            d="M90,168 C92,190 94,212 90,232"
          />
          <path
            className="figure__leg figure__leg--left"
            d="M74,168 C72,190 70,212 74,232"
          />
        </g>
      </svg>

      <svg className="scene__ground" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0,120 C300,90 480,140 760,110 C1040,80 1220,130 1440,100 L1440,200 L0,200 Z" />
      </svg>

      <div className="scene__fog scene__fog--front" />
      <div className="scene__grain" />
      <div className="scene__scrim" />
    </div>
  );
}
