export default function Loading() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border border-[#c9a96e]/30 border-t-[#c9a96e] animate-spin" aria-hidden="true" />
        <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em]">Victor Jazz</p>
      </div>
    </div>
  )
}
