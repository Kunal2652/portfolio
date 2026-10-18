
export default function SectionLabel({  children }) {
  return (
    <div className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
   
      <span className="h-px w-10 bg-green-400/50" />

      <span>{children}</span>
    </div>
  );
}
