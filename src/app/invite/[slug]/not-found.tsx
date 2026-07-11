import Link from 'next/link'

export default function InviteNotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-6xl">✉️</div>
        <h2 className="text-2xl font-serif text-white font-semibold">Приглашение не найдено</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          К сожалению, этой ссылки нет в списке приглашённых. Пожалуйста, проверьте правильность написания адреса или обратитесь к молодожёнам.
        </p>
        <div className="pt-2">
          <Link 
            href="/"
            className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  )
}