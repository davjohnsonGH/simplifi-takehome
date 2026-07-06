import { useMemo } from "react";
import Select from "./Select";
import type { FormComponentValue } from "./types";
import { TRANSACTION_CATEGORIES } from "../types";
import type { TransactionCategory } from "../types";

interface FilterByCategoryProps {
  onCategoriesChange: (categories: TransactionCategory[]) => void;
}
const ALL_CATEGORIES = "All categories";

export default function FilterByCategory({
  onCategoriesChange,
}: FilterByCategoryProps) {
  const options = useMemo(
    () => [
      {
        label: ALL_CATEGORIES,
        value: ALL_CATEGORIES,
      },
      ...TRANSACTION_CATEGORIES.map((category) => ({
        label: category,
        value: category,
      })),
    ],
    [],
  );

  function handleChange(_fieldId: string, value: FormComponentValue) {
    const selectedValues = Array.isArray(value) ? value : [value];

    if (selectedValues.includes(ALL_CATEGORIES)) {
      onCategoriesChange([]);
      return;
    }

    onCategoriesChange(selectedValues as TransactionCategory[]);
  }

  return (
    <>
      <Select
        id="category"
        label="Select category"
        required={true}
        placeholder="Choose a category"
        options={options}
        multiple={true}
        size={4}
        onChange={handleChange}
      />
    </>
  );
}
