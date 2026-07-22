"use client";

import { useState, useEffect } from "react";
import { getEventInfo, updateHeroImage, deleteHeroImage } from "../actions/eventInfo";

export default function HeroImageEditor() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getEventInfo().then((info) => setPreview(info.heroImageUrl));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData(e.currentTarget);
    const res = await updateHeroImage(formData);
    setUploading(false);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      alert(res.error || "Ошибка загрузки");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Удалить текущее фото? Вернётся стандартная заглушка.")) return;
    setDeleting(true);
    await deleteHeroImage();
    setPreview(null);
    setDeleting(false);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Главное фото (Hero)</h2>

      {preview ? (
        <div className="mb-4">
          <img
            src={preview}
            alt="Превью"
            className="w-full max-w-sm h-48 object-cover rounded-lg border border-slate-700"
          />
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="mt-2 px-4 py-1.5 bg-slate-700 hover:bg-rose-950/40 hover:text-rose-400 text-slate-300 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            {deleting ? "Удаляем..." : "Удалить фото"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-slate-500 mb-4">
          Фото не установлено — используется стандартная заглушка
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="file"
          name="heroImage"
          accept="image/*"
          onChange={handleFileChange}
          className="flex-1 text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer hover:file:bg-indigo-700"
        />
        <button
          type="submit"
          disabled={uploading}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {uploading ? "Загружаем..." : saved ? "Сохранено ✓" : "Загрузить"}
        </button>
      </form>
    </div>
  );
}