import {
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonSlides,
  IonSlide,
  IonButton,
} from "@ionic/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedTimeIndex } from "store/slices/recordSlice";
import "./timeSlider.scss";

interface Props {
  availableTime: string[];
  selectedTimeIndex: number;
}

const TimeSlider: React.FC<Props> = ({ availableTime, selectedTimeIndex }) => {
  const dispatch = useDispatch();
  const timeSliderOptions = {
    slidesPerView: 3.5,
  };

  //
  // Повтор как и с DateSlider
  //

  useEffect(() => {
    const timeCardsArray = Array.from(
      document.getElementsByClassName("time-card")
    );
    timeCardsArray.forEach(
      (card: Element) =>
        (card.className = card.className.replace(" active", ""))
    );
    timeCardsArray[selectedTimeIndex].className += " active";
  }, [availableTime, selectedTimeIndex]);

  // обработка инпута юзера - выбора времени
  function proceedTimeChoice(time: string): void {
    // работаем с стором
    const index = availableTime.findIndex((_time) => _time === time);
    if (index !== selectedTimeIndex) dispatch(setSelectedTimeIndex(index));
    return;
  }

  return (
    <>
      <IonItem lines="none">
        <IonGrid>
          <IonRow>
            <IonCol>
              <span className="time-section-title">Свободное время</span>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem lines="none" className="time-slider">
        {/* надо и тут менять ключ из-за бага с removeChild (баг ионика) */}
        <IonSlides options={timeSliderOptions} key={availableTime.join("_")}>
          {availableTime.map((time: string) => (
            <IonSlide key={time} className="time-slide">
              <IonButton
                className="time-card"
                onClick={(): void => {
                  proceedTimeChoice(time);
                }}
              >
                <span className="time-span">{time}</span>
              </IonButton>
            </IonSlide>
          ))}
        </IonSlides>
      </IonItem>
    </>
  );
};

export default TimeSlider;
