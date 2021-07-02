import {
  IonSlides,
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import "./psychologistSlider.scss";
import { setSelectedPsychologistIndex } from "store/slices/recordSlice";

// интерфейс пропсов
import { Psychologist } from "store/slices/psychologistsSlice";

import React from "react";
import { useDispatch } from "react-redux";
interface Props {
  psychologists: Psychologist[];
  _index: number;
}

const PsychologistsSlider: React.FC<Props> = ({ psychologists, _index }) => {
  const dispatch = useDispatch();
  // конфиг слайдеров
  const psychologistSliderOptions = {
    // ставим слайд сохраненного психолога
    initialSlide: _index,

    centeredSlides: true,
    slidesPerView: 1.1,
    spaceBetween: 1,
  };

  function getActiveSlider(e: CustomEvent<void>) {
    const target = e.target as HTMLIonSlidesElement;
    return target.getActiveIndex().then((index: number) => {
      if (index !== _index) dispatch(setSelectedPsychologistIndex(index));
    });
  }

  return (
    <IonSlides
      options={psychologistSliderOptions}
      className="psychologist-slider"
      //   вотчер на смену психолога слайдом
      onIonSlideDidChange={(e) => getActiveSlider(e)}
    >
      {psychologists.map((psychologist: Psychologist) => (
        <IonSlide key={psychologist._id}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="psychologist-card-title">
                {psychologist.name}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <img
                      src={psychologist.profilePicUrl}
                      alt="profile"
                      className="profile-pic"
                    />
                  </IonCol>
                  <IonCol className="consultation-duration">
                    <div>
                      <span>Длительность консультации</span> <br />
                      <span>{psychologist.consultationDuration}</span>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonSlide>
      ))}
    </IonSlides>
  );
};

export default PsychologistsSlider;
