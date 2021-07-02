import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";

import { useEffect, useState } from "react";

import {
  fetchPsychologists,
  psychologistsSelector,
} from "store/slices/psychologistsSlice";

import PsychologistsSlider from "components/PsychologistSlider";
import DateSlider from "components/DateSlider";
import TimeSlider from "components/TimeSlider";
import BottomSection from "components/BottomSection";
import Loading from "components/LoadingComponent";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  fetchSavedInfo,
  selectedPsychologistIndexSelector,
  setSelectedPsychologistIndex,
} from "store/slices/recordSlice";

interface Props {
  selectedPsychologistIndex: number;
  selectedDateIndex: number;
  selectedTimeIndex: number;
}

const Home: React.FC<Props> = ({
  selectedPsychologistIndex,
  selectedDateIndex,
  selectedTimeIndex,
}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const psychologists = useSelector(psychologistsSelector);

  // колл фетча психологов
  useEffect(() => {
    dispatch(fetchPsychologists());
    dispatch(fetchSavedInfo());
  }, []);

  // хук для остановки лоадинга
  useEffect(() => {
    if (psychologists.length > 0 && selectedPsychologistIndex !== -1) {
      setLoading(false);
    }
  }, [psychologists, selectedPsychologistIndex]);

  // лоадинг / контент;
  return loading ? (
    <Loading />
  ) : (
    <IonPage>
      <IonContent className="ion-padding-top">
        <PsychologistsSlider
          psychologists={psychologists}
          _index={selectedPsychologistIndex}
        />
        <DateSlider
          availableDates={psychologists[selectedPsychologistIndex].dates}
          selectedDateIndex={selectedDateIndex}
        />
        <TimeSlider
          availableTime={
            psychologists[selectedPsychologistIndex].dates[selectedDateIndex]
              .time
          }
          selectedTimeIndex={selectedTimeIndex}
        />
        <BottomSection
          psychologistId={psychologists[selectedPsychologistIndex]._id}
          time={
            psychologists[selectedPsychologistIndex].dates[selectedDateIndex]
              .time[selectedTimeIndex]
          }
          date={
            psychologists[selectedPsychologistIndex].dates[selectedDateIndex]
              .date
          }
          psychologistIndex={selectedPsychologistIndex}
          timeIndex={selectedTimeIndex}
          dateIndex={selectedDateIndex}
        />
      </IonContent>
    </IonPage>
  );
};

function mapStateToProps(state: any) {
  const { selectedPsychologistIndex, selectedDateIndex, selectedTimeIndex } =
    state.localData;
  return { selectedPsychologistIndex, selectedDateIndex, selectedTimeIndex };
}

export default connect(mapStateToProps)(Home);
