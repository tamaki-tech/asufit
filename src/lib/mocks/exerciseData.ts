import type { ExerciseType, TrainingSession } from "$lib/types/exercise";

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
 * モチベーションメッセージのリスト
 */
export const MOTIVATION_MESSAGES = [
	"今日も頑張りましょう！継続は力なり！",
	"素晴らしい1日の始まりです。トレーニングで体を目覚めさせましょう！",
	"あなたならできる！今日のメニューをこなしましょう！",
	"昨日の自分を超えていきましょう！",
	"小さな一歩が大きな変化を生み出します。さあ、始めましょう！",
];

/**
 * ランダムなモチベーションメッセージを取得
 */
export function getRandomMotivationMessage(): string {
	return MOTIVATION_MESSAGES[
		Math.floor(Math.random() * MOTIVATION_MESSAGES.length)
	];
}

/**
 * モックのトレーニングセッションデータを生成
 */
export function createMockTrainingSession(date: Date): TrainingSession {
	return {
		id: `session-${date.toISOString().split("T")[0]}`,
		date,
		isStarted: false,
		records: [],
		motivationMessage: getRandomMotivationMessage(),
	};
}
