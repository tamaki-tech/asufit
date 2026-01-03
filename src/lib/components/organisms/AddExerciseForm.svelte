<script lang="ts">
import Button from "$lib/components/atoms/Button.svelte";
import Input from "$lib/components/atoms/Input.svelte";
import type { SelectOption } from "$lib/components/atoms/Select.svelte";
import Select from "$lib/components/atoms/Select.svelte";
import type { ExerciseCategory, ExerciseType } from "$lib/types/exercise";

/**
 * トレーニング追加フォームコンポーネントのprops
 */
interface AddExerciseFormProps {
	/**
	 * 利用可能なトレーニング種目のリスト
	 */
	exerciseTypes: ExerciseType[];
	/**
	 * トレーニング記録を追加するハンドラー
	 */
	onAddRecord: (exerciseTypeId: string, detail: FormDetail) => void;
}

/**
 * フォームの入力値
 */
interface FormDetail {
	reps?: number;
	weight?: number;
	duration?: number;
	distance?: number;
}

const { exerciseTypes, onAddRecord }: AddExerciseFormProps = $props();

let selectedExerciseId = $state("");
let reps = $state("");
let weight = $state("");
let duration = $state("");
let distance = $state("");

/**
 * 選択されたトレーニング種目
 */
const selectedExercise = $derived(
	exerciseTypes.find((e) => e.id === selectedExerciseId),
);

/**
 * トレーニング種目の選択肢
 */
const exerciseOptions = $derived.by(() => {
	const recommended = exerciseTypes
		.filter((e) => e.isRecommended)
		.map((e) => ({ value: e.id, label: `${e.name} (おすすめ)` }));
	const others = exerciseTypes
		.filter((e) => !e.isRecommended)
		.map((e) => ({ value: e.id, label: e.name }));
	return [...recommended, ...others];
});

/**
 * フォーム送信ハンドラー
 */
function handleSubmit(event: Event) {
	event.preventDefault();

	if (!selectedExercise) return;

	const detail: FormDetail = {};

	if (selectedExercise.category === "strength") {
		if (!reps) return;
		detail.reps = parseInt(reps, 10);
	} else if (selectedExercise.category === "weighted") {
		if (!reps || !weight) return;
		detail.reps = parseInt(reps, 10);
		detail.weight = parseFloat(weight);
	} else if (selectedExercise.category === "cardio") {
		const parsedDuration = duration ? parseInt(duration, 10) : undefined;
		const parsedDistance = distance ? parseFloat(distance) : undefined;

		if (
			parsedDuration !== undefined &&
			!isNaN(parsedDuration) &&
			parsedDuration > 0
		) {
			detail.duration = parsedDuration;
		}
		if (
			parsedDistance !== undefined &&
			!isNaN(parsedDistance) &&
			parsedDistance > 0
		) {
			detail.distance = parsedDistance;
		}
		if (!detail.duration && !detail.distance) return;
	}

	onAddRecord(selectedExerciseId, detail);

	selectedExerciseId = "";
	reps = "";
	weight = "";
	duration = "";
	distance = "";
}

/**
 * 種目選択時のハンドラー
 */
function handleExerciseChange(value: string) {
	selectedExerciseId = value;
	reps = "";
	weight = "";
	duration = "";
	distance = "";
}
</script>

<form onsubmit={handleSubmit} class="bg-white rounded-lg shadow-md p-6 space-y-4">
  <h3 class="text-lg font-bold text-gray-900">トレーニングを追加</h3>

  <div>
    <label for="exercise-type" class="block text-sm font-semibold text-gray-700 mb-2">
      種目を選択
    </label>
    <Select
      options={exerciseOptions}
      value={selectedExerciseId}
      placeholder="トレーニング種目を選択してください"
      onchange={handleExerciseChange}
    />
  </div>

  {#if selectedExercise}
    {#if selectedExercise.category === "strength"}
      <div>
        <label for="reps" class="block text-sm font-semibold text-gray-700 mb-2">
          回数
        </label>
        <Input
          id="reps"
          type="number"
          bind:value={reps}
          placeholder="例: 20"
          required
        />
      </div>
    {:else if selectedExercise.category === "weighted"}
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="reps-weighted" class="block text-sm font-semibold text-gray-700 mb-2">
            回数
          </label>
          <Input
            id="reps-weighted"
            type="number"
            bind:value={reps}
            placeholder="例: 10"
            required
          />
        </div>
        <div>
          <label for="weight" class="block text-sm font-semibold text-gray-700 mb-2">
            重量 (kg)
          </label>
          <Input
            id="weight"
            type="number"
            bind:value={weight}
            placeholder="例: 5.0"
            step="0.1"
            required
          />
        </div>
      </div>
    {:else if selectedExercise.category === "cardio"}
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="duration" class="block text-sm font-semibold text-gray-700 mb-2">
            時間 (分)
          </label>
          <Input
            id="duration"
            type="number"
            bind:value={duration}
            placeholder="例: 30"
            min="1"
          />
        </div>
        <div>
          <label for="distance" class="block text-sm font-semibold text-gray-700 mb-2">
            距離 (km)
          </label>
          <Input
            id="distance"
            type="number"
            bind:value={distance}
            placeholder="例: 5.0"
            min="0.1"
            step="0.1"
          />
        </div>
      </div>
      <p class="text-xs text-gray-500">※ 時間または距離のいずれかを入力してください</p>
    {/if}

    <Button type="submit" variant="primary" fullWidth>
      記録を追加
    </Button>
  {/if}
</form>
