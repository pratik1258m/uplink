import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GridBackground } from '../components/GridBackground';
import { GlowingSphere } from '../components/GlowingSphere';
import { BouncyButton } from '../components/BouncyButton';
import { getStrings, SupportedLanguage } from '../i18n/strings';

interface KnowYouBetterQuestionsScreenProps {
  language: SupportedLanguage;
  onBack: () => void;
  onNext: () => void;
}

type QuestionId = 'help' | 'goal' | 'heard' | 'tone';

const QUESTION_ORDER: QuestionId[] = ['help', 'goal', 'heard', 'tone'];

const MULTI_SELECT: Record<QuestionId, boolean> = {
  help: true,
  goal: true,
  heard: false,
  tone: false,
};

const HELP_IDS = ['notes', 'reminders', 'goals', 'links'] as const;
const GOAL_IDS = ['studies', 'fitness', 'work', 'learning', 'organized'] as const;
const HEARD_IDS = ['instagram', 'youtube', 'tiktok', 'friends', 'google', 'other'] as const;
const TONE_IDS = ['direct', 'friendly', 'detailed'] as const;

type Answers = Record<QuestionId, string[]>;

const EMPTY_ANSWERS: Answers = { help: [], goal: [], heard: [], tone: [] };

export const KnowYouBetterQuestionsScreen: React.FC<
  KnowYouBetterQuestionsScreenProps
> = ({ language, onBack, onNext }) => {
  const insets = useSafeAreaInsets();
  const strings = getStrings(language);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const fade = useRef(new Animated.Value(1)).current;

  const currentQuestion = QUESTION_ORDER[questionIndex];
  const selectedIds = answers[currentQuestion];
  const isLastQuestion = questionIndex === QUESTION_ORDER.length - 1;
  const canContinue = selectedIds.length > 0;

  const topPadding = Math.max(insets.top, StatusBar.currentHeight || 0, 24) + 18;
  const bottomPadding = Math.max(insets.bottom, 20) + 12;

  const optionsFor = (question: QuestionId): { id: string; label: string }[] => {
    const { onboarding } = strings;
    switch (question) {
      case 'help':
        return HELP_IDS.map((id) => ({ id, label: onboarding.helpOptions[id] }));
      case 'goal':
        return GOAL_IDS.map((id) => ({ id, label: onboarding.goalOptions[id] }));
      case 'heard':
        return HEARD_IDS.map((id) => ({ id, label: onboarding.heardOptions[id] }));
      case 'tone':
        return TONE_IDS.map((id) => ({ id, label: onboarding.toneOptions[id] }));
    }
  };

  const animateTo = (index: number) => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 110,
      useNativeDriver: true,
    }).start(() => {
      setQuestionIndex(index);
      Animated.timing(fade, {
        toValue: 1,
        duration: 190,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      animateTo(questionIndex - 1);
    } else {
      onBack();
    }
  };

  const toggleOption = (optionId: string) => {
    setAnswers((prev) => {
      const current = prev[currentQuestion];
      let next: string[];
      if (MULTI_SELECT[currentQuestion]) {
        next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
      } else {
        next = [optionId];
      }
      return { ...prev, [currentQuestion]: next };
    });
  };

  const handleNext = () => {
    if (!canContinue) return;
    if (isLastQuestion) {
      onNext();
    } else {
      animateTo(questionIndex + 1);
    }
  };

  const contentTranslateY = fade.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  return (
    <View style={[styles.root, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      <StatusBar barStyle="dark-content" />
      <GridBackground />

      {/* Top Header */}
      <View style={styles.header}>
        <BouncyButton
          style={styles.backButton}
          onPress={handleBack}
          activeScale={0.9}>
          <Text style={styles.backArrow}>‹</Text>
        </BouncyButton>

        <Text style={styles.headerTitle}>UppLink AI</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.sphereSection}>
          <GlowingSphere size={168} />
        </View>

        <Animated.View
          style={[
            styles.questionBlock,
            { opacity: fade, transform: [{ translateY: contentTranslateY }] },
          ]}>
          <Text style={styles.questionText}>
            {strings.onboarding.questions[currentQuestion]}
          </Text>

          <View style={styles.optionGrid}>
            {optionsFor(currentQuestion).map((option) => {
              const isSelected = selectedIds.includes(option.id);
              return (
                <BouncyButton
                  key={option.id}
                  style={[
                    styles.optionPill,
                    isSelected && styles.optionPillSelected,
                  ]}
                  activeScale={0.94}
                  onPress={() => toggleOption(option.id)}>
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}>
                    {option.label}
                  </Text>
                </BouncyButton>
              );
            })}
          </View>
        </Animated.View>
      </View>

      {/* Progress + Action */}
      <View style={styles.footer}>
        <View style={styles.progressRow}>
          {QUESTION_ORDER.map((id, index) => (
            <View
              key={id}
              style={[
                styles.progressDot,
                index === questionIndex && styles.progressDotActive,
                index < questionIndex && styles.progressDotDone,
              ]}
            />
          ))}
        </View>

        <BouncyButton
          style={[styles.nextButton, !canContinue && styles.nextButtonDisabled]}
          activeScale={0.96}
          disabled={!canContinue}
          onPress={handleNext}>
          <Text style={styles.nextButtonText}>{strings.next}</Text>
        </BouncyButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  backArrow: {
    fontSize: 26,
    color: '#111111',
    lineHeight: 28,
    marginTop: -2,
    fontWeight: '300',
  },
  headerTitle: {
    fontFamily: Platform.select({
      ios: 'Audiowide',
      android: 'Audiowide-Regular',
      default: 'sans-serif',
    }),
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.3,
  },
  headerPlaceholder: {
    width: 38,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sphereSection: {
    marginBottom: 14,
  },
  questionBlock: {
    alignItems: 'center',
    width: '100%',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: -0.4,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    maxWidth: 340,
  },
  optionPill: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  optionPillSelected: {
    backgroundColor: 'rgba(2, 209, 254, 0.12)',
    borderColor: '#02D1FE',
    borderWidth: 1.5,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    letterSpacing: -0.2,
  },
  optionTextSelected: {
    color: '#0288D1',
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E3E3E3',
  },
  progressDotActive: {
    width: 20,
    backgroundColor: '#02B8FE',
  },
  progressDotDone: {
    backgroundColor: 'rgba(2, 184, 254, 0.45)',
  },
  nextButton: {
    width: 214,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#02B8FE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#02D1FE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 5,
  },
  nextButtonDisabled: {
    opacity: 0.35,
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
