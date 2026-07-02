import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type Resolver,
} from "react-hook-form";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { ScreenContainer } from "../../components/common/ScreenContainer";
import { StepIndicator } from "../../components/trainer/StepIndicator";
import { TrainerCard } from "../../components/trainer/TrainerCard";
import { TrainerStepOne } from "../../components/trainer/TrainerStepOne";
import { TrainerStepTwo } from "../../components/trainer/TrainerStepTwo";
import { trainerSchema } from "../../schemas/trainer.schema";
import { useTrainerStore } from "../../store/trainer.store";
import { Trainer } from "../../types/trainer";

enum TrainerStep {
  PersonalData = 1,
  Preferences = 2,
}

const TOTAL_STEPS = 2;

const DEFAULT_TRAINER_VALUES: DefaultValues<Trainer> = {
  fullName: "",
  age: null,
  email: "",
  district: "",
  favoriteType: "",
};

export function TrainerScreen() {
  const [step, setStep] = useState(TrainerStep.PersonalData);
  const trainer = useTrainerStore((state) => state.trainer);
  const progressLabel = `Paso ${step} de ${TOTAL_STEPS}`;

  const methods = useForm<Trainer>({
    resolver: yupResolver(trainerSchema) as Resolver<Trainer>,
    defaultValues: DEFAULT_TRAINER_VALUES,
    mode: "onTouched",
  });

  function changeStep(nextStep: TrainerStep) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep(nextStep);
  }

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    if (!trainer) {
      methods.reset(DEFAULT_TRAINER_VALUES);
      setStep(TrainerStep.PersonalData);
    }
  }, [methods, trainer]);

  if (trainer) {
    return (
      <ScreenContainer>
        <TrainerCard />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <FormProvider {...methods}>
        <View style={styles.container}>
          <View style={styles.progressHeader}>
            <View style={styles.stepIndicatorContainer}>
              <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
            </View>
            <Text style={styles.title}>{progressLabel}</Text>
          </View>
          {step === TrainerStep.PersonalData ? (
            <TrainerStepOne
              onNext={() => changeStep(TrainerStep.Preferences)}
            />
          ) : (
            <TrainerStepTwo
              onBack={() => changeStep(TrainerStep.PersonalData)}
              onFinish={() => {
                changeStep(TrainerStep.PersonalData);
              }}
            />
          )}
        </View>
      </FormProvider>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  stepIndicatorContainer: {
    flex: 1,
    marginRight: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E3350D",
  },
});
