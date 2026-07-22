"use client";

import { useState, useEffect } from "react";
import {
  getScheduleItems,
  addScheduleItem,
  updateScheduleItem,
  deleteScheduleItem,
} from "../actions/schedule";
import { ICON_OPTIONS } from "../invite/[slug]/components/ScheduleIcons";

interface ScheduleItemData {
  id: string;
  time: string;
  title: string;
  description: string;
  iconKey: string;
}

export default function ScheduleEditor() {
  const [items, setItems] = useState<ScheduleItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const data = await getScheduleItems();
    setItems(data as ScheduleItemData[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await addScheduleItem(formData);
    if (res.success) {
      e.currentTarget.reset();
      load();
    }
  };

  const handleUpdate = async (
    id: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateScheduleItem(id, formData);
    setEditingId(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Удалить этот пункт программы?")) {
      await deleteScheduleItem(id);
      load();
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-slate-400 text-sm">
        Загрузка программы дня...
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
      <h2 className="text-xl font-semibold text-white">Программа дня</h2>

      <div className="space-y-3">
        {items.map((item) =>
          editingId === item.id ? (
            <form
              key={item.id}
              onSubmit={(e) => handleUpdate(item.id, e)}
              className="flex flex-col sm:flex-row gap-2 bg-slate-700/50 p-3 rounded-lg"
            >
              <input
                name="time"
                defaultValue={item.time}
                className="w-24 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
              <input
                name="title"
                defaultValue={item.title}
                className="flex-1 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
              <input
                name="description"
                defaultValue={item.description}
                className="flex-1 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
              <input
                name="iconKey"
                defaultValue={item.iconKey}
                placeholder="guests / 💃 / любой эмодзи"
                list="icon-suggestions"
                className="w-32 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs"
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-white rounded text-xs"
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 bg-slate-700/30 p-3 rounded-lg"
            >
              <div className="text-sm">
                <span className="text-white font-medium">{item.time}</span>{" "}
                <span className="text-slate-300">{item.title}</span>
                <span className="text-slate-500 block text-xs">
                  {item.description}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditingId(item.id)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs"
                >
                  Изменить
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 bg-slate-700 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 rounded text-xs"
                >
                  Удалить
                </button>
              </div>
            </div>
          ),
        )}
      </div>

      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-700"
      >
        <input
          name="time"
          placeholder="Время (17:00)"
          required
          className="w-24 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm"
        />
        <input
          name="title"
          placeholder="Название"
          required
          className="flex-1 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm"
        />
        <input
          name="description"
          placeholder="Описание"
          className="flex-1 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm"
        />
        <input
          name="iconKey"
          placeholder="guests / / любой эмодзи"
          list="icon-suggestions"
          defaultValue="guests"
          className="w-32 px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm"
        />
        <button
          type="submit"
          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm"
        >
          Добавить
        </button>
      </form>
      <datalist id="icon-suggestions">
        {ICON_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </datalist>
    </div>
  );
}
