import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonItem,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonAlert,
} from "@ionic/react";

import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";
import InputControl from "./components/InputControl";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [result, setResult] = useState<number>();
  const [error, setError] = useState<string>();

  //this is because we are using typescript.
  //with javascript you dont need the <HTML...>after Ref
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBmi = () => {
    //? is a tenary expression to check if the current object
    //exists.(I.e if we have linked the ref to our html)
    //! tells typescript that you are sure everything is fine
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      setError("Please enter a valid (non-negatve) input number");
      return;
    }
    // the + just means that anything that is returned from there is of type number
    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);

    setResult(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  return (
    <>
      {/* !!converts error to a boolean from a string. Alternatively
      we would have assigned two different states to error and message
      Look ath teh documentation for how they did it*/}
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {
            text: "Okay",
            handler: clearError,
          },
        ]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl selectedValue="mkg" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Height</IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Weight</IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBmi} onReset={resetInputs} />
            {result && <BmiResult result={result} />}
          </IonGrid>
        </IonContent>
        <h2>This works</h2>
      </IonApp>
    </>
  );
};
export default App;
