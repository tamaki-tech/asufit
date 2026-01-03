<script lang="ts">
import { addDays, format, subDays } from "date-fns";
import Button from "$lib/components/atoms/Button.svelte";
import DateNavigator from "$lib/components/molecules/DateNavigator.svelte";
import RecommendedMenuCard from "$lib/components/molecules/RecommendedMenuCard.svelte";
import AddExerciseForm from "$lib/components/organisms/AddExerciseForm.svelte";
import ExerciseRecordList from "$lib/components/organisms/ExerciseRecordList.svelte";
import StartTrainingModal from "$lib/components/organisms/StartTrainingModal.svelte";
import {
	createMockTrainingSession,
	EXERCISE_TYPES,
} from "$lib/mocks/exerciseData";
import type { ExerciseRecord, TrainingSession } from "$lib/types/exercise";
import type { PageData } from "./$types";

const { data }: { data: PageData } = $props();

let currentDate = $state(new Date());
let isModalOpen = $state(false);
const sessionsByDate = $state<Map<string, TrainingSession>>(new Map());
let trainingSession = $state<TrainingSession>(
	createMockTrainingSession(new Date()),
);

/**
 * 日付が変更された時、該当日のセッションを取得または新規作成
 */
$effect(() => {
	const dateKey = format(currentDate, "yyyy-MM-dd");
	if (!sessionsByDate.has(dateKey)) {
		sessionsByDate.set(dateKey, createMockTrainingSession(currentDate));
	}
	trainingSession = sessionsByDate.get(dateKey)!;
});

/**
 * おすすめメニューのリスト
 */
const recommendedExercises = $derived(
	EXERCISE_TYPES.filter((e) => e.isRecommended),
);

/**
 * 前日に移動
 */
function handlePreviousDay() {
	currentDate = subDays(currentDate, 1);
}

/**
 * 翌日に移動
 */
function handleNextDay() {
	currentDate = addDays(currentDate, 1);
}

/**
 * トレーニング開始ボタンのクリック
 */
function handleStartTrainingClick() {
	isModalOpen = true;
}

/**
 * モーダルを閉じる
 */
function handleCloseModal() {
	isModalOpen = false;
}

/**
 * トレーニングを開始
 */
function handleStartTraining() {
	trainingSession.isStarted = true;
	isModalOpen = false;

	const dateKey = format(currentDate, "yyyy-MM-dd");
	sessionsByDate.set(dateKey, trainingSession);
}

/**
 * トレーニング記録を追加
 */
function handleAddRecord(
	exerciseTypeId: string,
	detail: {
		reps?: number;
		weight?: number;
		duration?: number;
		distance?: number;
	},
) {
	const exerciseType = EXERCISE_TYPES.find((e) => e.id === exerciseTypeId);
	if (!exerciseType) return;

	const newRecord: ExerciseRecord = {
		id: `record-${Date.now()}`,
		exerciseType,
		detail: {
			category: exerciseType.category,
			...detail,
		} as ExerciseRecord["detail"],
		recordedAt: new Date(),
	};

	trainingSession.records = [...trainingSession.records, newRecord];

	const dateKey = format(currentDate, "yyyy-MM-dd");
	sessionsByDate.set(dateKey, trainingSession);
}
</script>

<div class="container mx-auto px-4 py-6 max-w-4xl space-y-6">
  <DateNavigator
    {currentDate}
    onPreviousDay={handlePreviousDay}
    onNextDay={handleNextDay}
  />

  {#if !trainingSession.isStarted}
    <div class="space-y-6">
      <div class="flex flex-col items-center justify-center py-12">
        <RecommendedMenuCard {recommendedExercises} />
      </div>

      <div class="flex justify-center">
        <Button variant="primary" onclick={handleStartTrainingClick}>
          トレーニング開始
        </Button>
      </div>
    </div>

    <StartTrainingModal
      isOpen={isModalOpen}
      motivationMessage={trainingSession.motivationMessage || ""}
      onClose={handleCloseModal}
      onStartTraining={handleStartTraining}
    />
  {:else}
    <div class="space-y-6">
      <ExerciseRecordList records={trainingSession.records} />
      <AddExerciseForm exerciseTypes={EXERCISE_TYPES} onAddRecord={handleAddRecord} />
    </div>
  {/if}
</div>
