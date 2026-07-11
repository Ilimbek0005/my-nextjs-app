"use client";

import { useState, useEffect, useMemo } from "react";
import { logoutAdmin } from "../actions/auth";
import { getGuests, addGuest, deleteGuest, clearGuestComment } from "../actions/guests";
import { useRouter } from "next/navigation";

interface Guest {
  id: string;
  slug: string;
  name: string;
  seatsCount: number;
  rsvpStatus: "PENDING" | "CONFIRMED" | "DECLINED";
  confirmedSeats: number | null;
  comment: string | null;
  respondedAt: any;
}

const STATUS_OPTIONS = {
  ALL: "Все",
  PENDING: "Думают",
  CONFIRMED: "Придут",
  DECLINED: "Не придут",
} as const;

export default function AdminDashboard() {
  const router = useRouter();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<keyof typeof STATUS_OPTIONS>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function loadData() {
    try {
      const data = await getGuests();
      setGuests(data as Guest[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    router.refresh();
  };

  const handleAddGuest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await addGuest(formData);
    if (res.success && res.guest) {
      form.reset();
      setGuests((prevGuests) => [res.guest as Guest, ...prevGuests]);
    } else {
      alert(res.error || "Произошла неизвестная ошибка");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этого гостя?")) {
      await deleteGuest(id);
      setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== id));
    }
  };

  const handleClearComment = async (id: string) => {
    if (confirm("Удалить пожелание этого гостя? Оно исчезнет и с публичной страницы.")) {
      await clearGuestComment(id);
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest.id === id ? { ...guest, comment: null } : guest
        )
      );
    }
  };

  const copyLink = (slug: string, id: string) => {
    const origin = window.location.origin;
    const inviteLink = `${origin}/invite/${slug}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stats = useMemo(() => {
    return guests.reduce(
      (acc, guest) => {
        acc.totalInvited += guest.seatsCount;
        if (guest.rsvpStatus === "CONFIRMED") {
          acc.confirmed += guest.confirmedSeats || 0;
        } else if (guest.rsvpStatus === "DECLINED") {
          acc.declined += guest.seatsCount;
        } else {
          acc.pending += guest.seatsCount;
        }
        return acc;
      },
      { totalInvited: 0, confirmed: 0, declined: 0, pending: 0 },
    );
  }, [guests]);

  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || g.rsvpStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [guests, search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Панель управления
          </h1>
          <p className="text-slate-400 text-sm">
            Списки гостей и статистика ответов RSVP
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Выйти
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-xs font-medium uppercase">Всего мест</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">{stats.totalInvited}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-xs font-medium uppercase">Придут (чел.)</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.confirmed}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-xs font-medium uppercase">Не придут</p>
            <p className="text-2xl font-bold text-rose-400 mt-1">{stats.declined}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-xs font-medium uppercase">Ожидают ответа</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Добавить нового гостя</h2>
          <form onSubmit={handleAddGuest} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                name="name"
                placeholder="Имя гостя"
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
              />
            </div>
            <div className="w-full sm:w-48">
              <input
                type="number"
                name="invitedSeats"
                placeholder="Кол-во мест (напр. 2)"
                min="1"
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              Добавить в базу
            </button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
          <input
            type="text"
            placeholder="Поиск гостя по имени..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-md px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            {(Object.keys(STATUS_OPTIONS) as Array<keyof typeof STATUS_OPTIONS>).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === status
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {STATUS_OPTIONS[status]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Загрузка списка гостей...</div>
          ) : filteredGuests.length === 0 ? (
            <div className="p-8 text-center text-slate-400">Гости не найдены</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-700/50 text-slate-300 text-sm border-b border-slate-700">
                    <th className="p-4 font-medium">Имя гостя</th>
                    <th className="p-4 font-medium">Выделено мест</th>
                    <th className="p-4 font-medium">Статус RSVP</th>
                    <th className="p-4 font-medium">Подтверждено</th>
                    <th className="p-4 font-medium">Комментарий</th>
                    <th className="p-4 font-medium text-right">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-sm">
                  {filteredGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="p-4 font-medium text-white">{guest.name}</td>
                      <td className="p-4 text-slate-300">{guest.seatsCount}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            guest.rsvpStatus === "CONFIRMED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : guest.rsvpStatus === "DECLINED"
                                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {guest.rsvpStatus === "CONFIRMED" && "Придёт"}
                          {guest.rsvpStatus === "DECLINED" && "Не придёт"}
                          {guest.rsvpStatus === "PENDING" && "Не ответил"}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">
                        {guest.rsvpStatus === "CONFIRMED" ? guest.confirmedSeats : "-"}
                      </td>
                      <td className="p-4 text-slate-400 max-w-xs">
                        <div className="flex items-center gap-2">
                          <span className="truncate" title={guest.comment || ""}>
                            {guest.comment || "—"}
                          </span>
                          {guest.comment && (
                            <button
                              onClick={() => handleClearComment(guest.id)}
                              className="shrink-0 px-2 py-0.5 bg-slate-700 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 rounded text-[11px] font-medium transition-colors"
                              title="Удалить пожелание"
                            >
                              Удалить
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => copyLink(guest.slug, guest.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            copiedId === guest.id
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                          }`}
                        >
                          {copiedId === guest.id ? "Скопировано!" : "Копировать ссылку"}
                        </button>
                        <button
                          onClick={() => handleDelete(guest.id)}
                          className="px-3 py-1.5 bg-slate-700 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 rounded-lg text-xs font-medium transition-colors"
                        >
                          Удалить гостя
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}