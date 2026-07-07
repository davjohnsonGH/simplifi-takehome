// import TextInput from "./TextInput";

interface SearchByMerchantProps {
  onMerchantChange: (merchants: string) => void;
}

export default function SearchByMerchant({
  onMerchantChange,
}: SearchByMerchantProps) {
  function handleChange(e: string) {
    onMerchantChange(e);
  }

  return (
    <div>
      <input id="search" onChange={(e) => handleChange(e.target.value)} />
    </div>
  );
}
