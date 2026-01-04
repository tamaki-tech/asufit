import type {
	ExerciseType,
	RecommendedMenuItem,
	TrainingSession,
} from "$lib/types/exercise";

/**
 * トレーニング種目のマスターデータ
 */
export const EXERCISE_TYPES: ExerciseType[] = [
	{
		id: "pushup",
		name: "腕立て伏せ",
		category: "strength",
		isRecommended: true,
	},
	{
		id: "situp",
		name: "腹筋",
		category: "strength",
		isRecommended: true,
	},
	{
		id: "squat",
		name: "スクワット",
		category: "strength",
		isRecommended: true,
	},
	{
		id: "plank",
		name: "プランク",
		category: "strength",
		isRecommended: false,
	},
	{
		id: "dumbbell_curl",
		name: "ダンベルカール",
		category: "weighted",
		isRecommended: false,
	},
	{
		id: "bench_press",
		name: "ベンチプレス",
		category: "weighted",
		isRecommended: false,
	},
	{
		id: "jogging",
		name: "ジョギング",
		category: "cardio",
		isRecommended: true,
	},
	{
		id: "cycling",
		name: "バイク",
		category: "cardio",
		isRecommended: false,
	},
];

/**
 * おすすめメニューの理由リスト
 */
export const RECOMMENDATION_REASONS = [
	"先週のトレーニング実績と体重・体脂肪率の変化から、バランスの良い全身トレーニングを提案します。特に上半身と下半身のバランスを重視したメニュー構成になっています。",
	"最近の運動頻度と強度を分析した結果、持久力向上に重点を置いたメニューをおすすめします。有酸素運動と筋力トレーニングを組み合わせることで、効率的な体脂肪燃焼が期待できます。",
	"前回のトレーニングから十分な回復期間が経過しています。今日は筋力アップに最適なタイミングです。基礎的な種目を中心に、適度な負荷で実施しましょう。",
	"体重の推移から、引き続き有酸素運動を取り入れることをおすすめします。筋力トレーニングと組み合わせることで、基礎代謝の向上も期待できます。",
];

/**
 * ランダムなおすすめ理由を取得
 */
export function getRandomRecommendationReason(): string {
	return RECOMMENDATION_REASONS[
		Math.floor(Math.random() * RECOMMENDATION_REASONS.length)
	];
}

/**
 * モックのおすすめメニューを生成
 */
export function generateMockRecommendedMenu(): RecommendedMenuItem[] {
	const recommendedExercises = EXERCISE_TYPES.filter((e) => e.isRecommended);

	return recommendedExercises.map((exerciseType) => {
		let detail;
		if (exerciseType.category === "strength") {
			detail = { category: "strength" as const, reps: 20 };
		} else if (exerciseType.category === "weighted") {
			detail = {
				category: "weighted" as const,
				reps: 10,
				weight: 10,
			};
		} else {
			detail = { category: "cardio" as const, duration: 20 };
		}

		return {
			id: crypto.randomUUID(),
			exerciseType,
			detail,
			isCompleted: false,
		};
	});
}

/**
 * モックのトレーニングセッションデータを生成
 */
export function createMockTrainingSession(date: Date): TrainingSession {
	return {
		id: `session-${date.toISOString().split("T")[0]}`,
		date,
		isStarted: false,
		isCompleted: false,
		records: [],
		isRecommendationGenerated: false,
		recommendedMenu: [],
		recommendationReason: undefined,
	};
}
