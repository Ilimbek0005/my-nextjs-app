"use client";

import { useState, useEffect } from "react";
import { getEventInfo, updateWelcomeMessage } from "../actions/eventInfo";

export default function WelcomeMessageEditor() {
  const [welcomeText, setWelcomeText] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getEventInfo().then((info) => {
      setWelcomeText(info.welcomeText || "");
      setOrganizerName(info.organizerName || "");
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    formData.set("welcomeText", welcomeText);
    formData.set("organizerName", organizerName);
    await updateWelcomeMessage(formData);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-slate-400 text-sm">
        Загрузка текста приглашения...
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h2 className="text-xl font-semibold mb-2 text-white">Текст приглашения</h2>
      <p className="text-slate-400 text-xs mb-4">
        Доступны плейсхолдеры: <code className="text-indigo-300">{"{guestName}"}</code>,{" "}
        <code className="text-indigo-300">{"{groomName}"}</code>,{" "}
        <code className="text-indigo-300">{"{brideName}"}</code> — они автоматически заменяются
        на реальное имя гостя и имена молодожёнов.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 text-sm mb-1.5">Текст обращения к гостю</label>
          <textarea
            value={welcomeText}
            onChange={(e) => setWelcomeText(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-1.5">Приглашение от (имя организатора)</label>
          <input
            type="text"
            value={organizerName}
            onChange={(e) => setOrganizerName(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? "Сохраняем..." : saved ? "Сохранено ✓" : "Сохранить"}
        </button>
      </form>
    </div>
  );
}