import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import "./bottomSection.scss";

import moment from "moment";
import "moment/locale/ru";
import { setRecord } from "services/firebase";

interface Props {
  psychologistId: string;
  psychologistIndex: number;
  time: string;
  timeIndex: number;
  date: string;
  dateIndex: number;
}

const BottomSection: React.FC<Props> = ({
  psychologistId,
  psychologistIndex,
  time,
  timeIndex,
  date,
  dateIndex,
}) => {
  function proceedRecordSubmit() {
    setRecord(
      psychologistId,
      psychologistIndex,
      time,
      timeIndex,
      date,
      dateIndex
    );
  }
  return (
    <IonCard>
      <IonCardHeader>
        <IonGrid>
          <IonRow>
            <IonCol className="flex">
              <span>Дата</span>
              <span>{moment(date).locale("ru").format("D MMM")}</span>
            </IonCol>
            <IonCol className="flex time-col">
              <span>Время</span>
              <span>{time}</span>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardHeader>
      <IonCardContent className="flex">
        <IonButton
          className="process-btn"
          onClick={() => proceedRecordSubmit()}
        >
          Записаться на бесплатную встречу
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default BottomSection;
