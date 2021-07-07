import {
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonSlides,
  IonSlide,
  IonButton,
} from "@ionic/react";
import { ConsultationDate } from "store/slices/psychologistsSlice";
import { albumsOutline, calendarOutline } from "ionicons/icons";
import "./dateSlider.scss";

import moment from "moment";
import "moment/locale/ru";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedDateIndex } from "store/slices/recordSlice";

interface Props {
  availableDates: ConsultationDate[];
  selectedDateIndex: number;
}

const DateSlider: React.FC<Props> = ({ availableDates, selectedDateIndex }) => {
  const dispatch = useDispatch();

  const dateSliderOptions = {
    slidesPerView: 3.5,
  };

  // делаем активным выбранную юзером дату на лоаде страницы / после смены
  useEffect(() => {
    const dateCardsArray = Array.from(
      document.getElementsByClassName("date-card")
    );
    dateCardsArray.forEach(
      (card: Element) =>
        (card.className = card.className.replace(" active", ""))
    );
    dateCardsArray[selectedDateIndex].className += " active";
  }, [availableDates, selectedDateIndex]);

  // обработка инпута юзера - выбора даты
  function proceedDateChoice(date: string): void {
    // работаем с стором
    // ищем индекс слайда (так как у нас несколько слайдов на скрине, нельзя полагаться на getActiveIndex())
    const index = availableDates.findIndex((_date) => _date.date === date);
    if (index !== selectedDateIndex) dispatch(setSelectedDateIndex(index));
    return;
  }

  // узнаем день недели
  function getDayFromDate(date: string): string {
    //   узнаем сегодня ли это
    const today = moment();
    if (moment(date).isSame(today, "day")) return "Сегодня";
    // если не сегодня, возращаем день недели
    const day = moment(date).locale("ru").format("ddd");
    return day;
  }

  return (
    <div>
      <IonItem lines="none" className="date-slider-header">
        <IonGrid>
          <IonRow>
            <IonCol>
              <span className="section-title">Возможная дата</span>
            </IonCol>
            <IonCol>
              <IonRow className="ion-justify-content-end">
                <button
                  ion-button="true"
                  icon-start="true"
                  className="date-btn active"
                >
                  <IonIcon icon={albumsOutline} />
                </button>
                <button
                  ion-button="true"
                  icon-start="true"
                  className="date-btn"
                >
                  <IonIcon icon={calendarOutline} />
                </button>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem lines="none" className="date-slider">
        {/* надо и тут менять ключ из-за бага с removeChild (баг ионика) */}
        <IonSlides
          options={dateSliderOptions}
          key={availableDates.map((date) => date.date).join("_")}
        >
          {availableDates.map((availableDate: ConsultationDate) => (
            <IonSlide key={availableDate.date} className="date-slide">
              <IonButton
                className="date-card"
                onClick={(): void => {
                  proceedDateChoice(availableDate.date);
                }}
              >
                <IonGrid>
                  <IonRow className="ion-justify-content-center">
                    <span className="date-card-title">
                      {getDayFromDate(availableDate.date)}
                    </span>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                    <span className="date-card-content">
                      {new Date(availableDate.date).getDate()}
                    </span>
                  </IonRow>
                </IonGrid>
              </IonButton>
            </IonSlide>
          ))}
        </IonSlides>
      </IonItem>
    </div>
  );
};

export default DateSlider;
