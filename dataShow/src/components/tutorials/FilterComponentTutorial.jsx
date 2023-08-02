import React, { useState ,useLayoutEffect  } from "react";
import { Steps, Hints } from "intro.js-react";

import "intro.js/introjs.css";

const FilterComponentTutorial = ({onStepsEnabled,onStepsExit}) => {

    const [steps, setSteps] = useState([
      {
        element: "#step1",
        intro: "1 step",
      },
      {
        element: "#step2",
        intro: "2 step",
      },
      {
        element: "#step3",
        intro: "3 step",
      },
      {
        element: "#step4",
        intro: "4 step",
      },
      {
        element: "#step5",
        intro: "5 step",
      },
      {
        element: "#step6",
        intro: "6 step",
      },
    ]);
  
    const [initialStep, setInitialStep] = useState(0);
  
    return (
      <div>
        <Steps
          enabled={onStepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={onStepsExit}
        />
  
      </div>
    );
};

export default FilterComponentTutorial;
