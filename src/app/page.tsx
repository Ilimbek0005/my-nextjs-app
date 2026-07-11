import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
          Свадебное приглашение
        </h1>
        <p className="text-slate-400 text-lg">
          Добро пожаловать! Если вы гость, пожалуйста, воспользуйтесь вашей уникальной ссылкой из пригласительного билета.
        </p>
        <div className="pt-4">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-medium text-sm text-slate-200 transition-colors shadow-lg shadow-indigo-950/20"
          >
            Войти в IBM-панель администратора →
          </Link>
        </div>
      </div>
    </div>
  )
}