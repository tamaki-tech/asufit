/**
 * トレーニングの種別
 */
export type ExerciseCategory = "strength" | "weighted" | "cardio";

/**
 * トレーニング種目の定義
 */
export interface ExerciseType {
	/**
	 * 種目のID
	 */
	id: string;
	/**
	 * 種目名
	 */
	name: string;
	/**
	 * トレーニングの種別
	 */
	category: ExerciseCategory;
	/**
	 * おすすめメニューかどうか
	 */
	isRecommended?: boolean;
}

/**
 * おすすめメニューアイテム（回数・重量などの詳細を含む）
 */
export interface RecommendedMenuItem {
	/**
	 * メニューアイテムのID
	 */
	id: string;
	/**
	 * トレーニング種目
	 */
	exerciseType: ExerciseType;
	/**
	 * 推奨される回数・重量などの詳細
	 */
	detail: ExerciseRecordDetail;
	/**
	 * 完了済みかどうか
	 */
	isCompleted: boolean;
}

/**
 * 筋トレ記録（回数のみ）
 */
export interface StrengthRecord {
	category: "strength";
	/**
	 * 回数
	 */
	reps: number;
}

/**
 * 重量トレーニング記録（回数+重量）
 */
export interface WeightedRecord {
	category: "weighted";
	/**
	 * 回数
	 */
	reps: number;
	/**
	 * 重量（kg）
	 */
	weight: number;
}

/**
 * 有酸素運動記録（時間または距離）
 */
export interface CardioRecord {
	category: "cardio";
	/**
	 * 時間（分）
	 */
	duration?: number;
	/**
	 * 距離（km）
	 */
	distance?: number;
}

/**
 * トレーニング記録の詳細（種別ごとの union type）
 */
export type ExerciseRecordDetail =
	| StrengthRecord
	| WeightedRecord
	| CardioRecord;

/**
 * トレーニング記録
 */
export interface ExerciseRecord {
	/**
	 * 記録のID
	 */
	id: string;
	/**
	 * トレーニング種目
	 */
	exerciseType: ExerciseType;
	/**
	 * 記録の詳細
	 */
	detail: ExerciseRecordDetail;
	/**
	 * 記録日時
	 */
	recordedAt: Date;
}

/**
 * 1日のトレーニングセッション
 */
export interface TrainingSession {
	/**
	 * セッションのID
	 */
	id: string;
	/**
	 * トレーニング日
	 */
	date: Date;
	/**
	 * トレーニング開始済みかどうか
	 */
	isStarted: boolean;
	/**
	 * トレーニング記録のリスト
	 */
	records: ExerciseRecord[];
	/**
	 * おすすめメニューが生成済みかどうか
	 */
	isRecommendationGenerated: boolean;
	/**
	 * おすすめメニューのリスト
	 */
	recommendedMenu: RecommendedMenuItem[];
	/**
	 * おすすめメニューの理由
	 */
	recommendationReason?: string;
}
