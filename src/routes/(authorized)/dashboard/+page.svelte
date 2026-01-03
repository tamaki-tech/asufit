<script lang="ts">
  import { addDays, format, subDays } from "date-fns";
  import Button from "$lib/components/atoms/Button.svelte";
  import DateNavigator from "$lib/components/molecules/DateNavigator.svelte";
  import AdditionalExerciseList from "$lib/components/organisms/AdditionalExerciseList.svelte";
  import RecommendedMenuChecklist from "$lib/components/organisms/RecommendedMenuChecklist.svelte";
  import StartTrainingModal from "$lib/components/organisms/StartTrainingModal.svelte";
  import {
    createMockTrainingSession,
    EXERCISE_TYPES,
    generateMockRecommendedMenu,
    getRandomRecommendationReason,
  } from "$lib/mocks/exerciseData";
  import type {
    ExerciseRecord,
    RecommendedMenuItem,
    TrainingSession,
  } from "$lib/types/exercise";
  import type { PageData } from "./$types";

  const { data }: { data: PageData } = $props();

  let currentDate = $state(new Date());
  let isModalOpen = $state(false);
  let isAdditionalFormVisible = $state(false);
  const sessionsByDate = $state<Map<string, TrainingSession>>(new Map());
  let trainingSession = $state<TrainingSession>(
    createMockTrainingSession(new Date())
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
    isAdditionalFormVisible = false;
  });

  /**
   * 追加メニューのリスト
   */
  let additionalMenu = $state<RecommendedMenuItem[]>([]);

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
   * おすすめメニュー生成ボタンのクリック
   */
  function handleGenerateRecommendation() {
    trainingSession.isRecommendationGenerated = true;
    trainingSession.recommendedMenu = generateMockRecommendedMenu();
    trainingSession.recommendationReason = getRandomRecommendationReason();
    isModalOpen = true;

    const dateKey = format(currentDate, "yyyy-MM-dd");
    sessionsByDate.set(dateKey, trainingSession);
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
    additionalMenu = [];

    const dateKey = format(currentDate, "yyyy-MM-dd");
    sessionsByDate.set(dateKey, trainingSession);
  }

  /**
   * おすすめメニューのチェック状態を切り替え
   */
  function handleToggleRecommendedComplete(itemId: string) {
    const item = trainingSession.recommendedMenu.find((m) => m.id === itemId);
    if (item) {
      item.isCompleted = !item.isCompleted;
      trainingSession.recommendedMenu = [...trainingSession.recommendedMenu];

      const dateKey = format(currentDate, "yyyy-MM-dd");
      sessionsByDate.set(dateKey, trainingSession);
    }
  }

  /**
   * 追加メニューのチェック状態を切り替え
   */
  function handleToggleAdditionalComplete(itemId: string) {
    const item = additionalMenu.find((m) => m.id === itemId);
    if (item) {
      item.isCompleted = !item.isCompleted;
      additionalMenu = [...additionalMenu];
    }
  }

  /**
   * 追加メニューフォームの表示切り替え
   */
  function handleToggleAdditionalForm() {
    isAdditionalFormVisible = !isAdditionalFormVisible;
  }

  /**
   * 追加メニューを追加
   */
  function handleAddMenuItem(
    exerciseTypeId: string,
    detail: {
      reps?: number;
      weight?: number;
      duration?: number;
      distance?: number;
    }
  ) {
    const exerciseType = EXERCISE_TYPES.find((e) => e.id === exerciseTypeId);
    if (!exerciseType) return;

    let exerciseDetail: RecommendedMenuItem["detail"];

    if (exerciseType.category === "strength" && detail.reps) {
      exerciseDetail = { category: "strength", reps: detail.reps };
    } else if (
      exerciseType.category === "weighted" &&
      detail.reps &&
      detail.weight
    ) {
      exerciseDetail = {
        category: "weighted",
        reps: detail.reps,
        weight: detail.weight,
      };
    } else if (exerciseType.category === "cardio") {
      exerciseDetail = {
        category: "cardio",
        duration: detail.duration,
        distance: detail.distance,
      };
    } else {
      return;
    }

    const newItem: RecommendedMenuItem = {
      id: crypto.randomUUID(),
      exerciseType,
      detail: exerciseDetail,
      isCompleted: false,
    };

    additionalMenu = [...additionalMenu, newItem];
  }

  /**
   * トレーニング完了（最終的にチェックされたメニューを記録として保存）
   */
  function handleCompleteTraining() {
    const completedItems = [
      ...trainingSession.recommendedMenu.filter((m) => m.isCompleted),
      ...additionalMenu.filter((m) => m.isCompleted),
    ];

    const records: ExerciseRecord[] = completedItems.map((item) => ({
      id: crypto.randomUUID(),
      exerciseType: item.exerciseType,
      detail: item.detail,
      recordedAt: new Date(),
    }));

    trainingSession.records = records;
    trainingSession.isStarted = false;
    trainingSession.isRecommendationGenerated = false;
    trainingSession.recommendedMenu = [];
    trainingSession.recommendationReason = undefined;
    additionalMenu = [];

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

  {#if !trainingSession.isRecommendationGenerated}
    <div class="flex flex-col items-center justify-center py-12 space-y-6">
      <div class="text-center space-y-4">
        <h2 class="text-2xl font-bold text-gray-900">今日のトレーニング</h2>
        <p class="text-gray-600">
          おすすめメニューを生成してトレーニングを始めましょう
        </p>
      </div>
      <Button variant="primary" onclick={handleGenerateRecommendation}>
        おすすめメニュー生成
      </Button>
    </div>
  {:else if !trainingSession.isStarted}
    <div class="flex flex-col items-center justify-center py-12 space-y-6">
      <div class="text-center space-y-4">
        <h2 class="text-2xl font-bold text-gray-900">
          おすすめメニューが生成されました
        </h2>
        <p class="text-gray-600">
          内容を確認してトレーニングを開始してください
        </p>
      </div>
      <Button variant="primary" onclick={() => (isModalOpen = true)}>
        メニューを確認
      </Button>
    </div>

    <StartTrainingModal
      isOpen={isModalOpen}
      recommendedMenu={trainingSession.recommendedMenu}
      recommendationReason={trainingSession.recommendationReason || ""}
      onClose={handleCloseModal}
      onStartTraining={handleStartTraining}
    />
  {:else}
    <div class="space-y-6">
      <RecommendedMenuChecklist
        recommendedMenu={trainingSession.recommendedMenu}
        onToggleComplete={handleToggleRecommendedComplete}
      />

      <AdditionalExerciseList
        {additionalMenu}
        exerciseTypes={EXERCISE_TYPES}
        isFormVisible={isAdditionalFormVisible}
        onToggleForm={handleToggleAdditionalForm}
        onToggleComplete={handleToggleAdditionalComplete}
        onAddMenuItem={handleAddMenuItem}
      />

      <div class="flex justify-center pt-4">
        <Button variant="primary" onclick={handleCompleteTraining}>
          トレーニング完了
        </Button>
      </div>
    </div>
  {/if}
</div>
