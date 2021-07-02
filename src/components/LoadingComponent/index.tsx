import React from "react";
import { IonContent, IonLoading } from "@ionic/react";
import "./loading.scss";

const Loading: React.FC = () => (
  <IonContent>
    <IonLoading
      cssClass="loading"
      isOpen={true}
      message={"Подождите..."}
      mode="ios"
    ></IonLoading>
  </IonContent>
);

export default Loading;
