import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={router.back}
      className="flex items-center justify-center w-32 h-10 bg-slate-300  text-black rounded-sm hover:bg-slate-400 transition-colors ease-in delay-150"
    >
      &#60;&#60; Go Back
    </button>
  );
}
