"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PriceItem {
  id: number;
  type: string;
  buyPrice: string | number;
  sellPrice: string | number;
}

interface ShowcaseImage {
  id: number;
  url: string;
  filename: string;
  displayOrder: number;
}

interface AdminDashboardProps {
  initialPrices: PriceItem[];
  initialImages: ShowcaseImage[];
}

export default function AdminDashboard({ initialPrices, initialImages }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"prices" | "images">("prices");
  const [prices, setPrices] = useState<PriceItem[]>(initialPrices);
  const [images, setImages] = useState<ShowcaseImage[]>(initialImages);

  const router = useRouter();

  // Loading & Action states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Gold price editing states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editType, setEditType] = useState("");
  const [editBuyPrice, setEditBuyPrice] = useState("");
  const [editSellPrice, setEditSellPrice] = useState("");

  // Gold price new item states
  const [newType, setNewType] = useState("");
  const [newBuyPrice, setNewBuyPrice] = useState("");
  const [newSellPrice, setNewSellPrice] = useState("");

  // Show temporary messages
  const triggerMessage = (type: "success" | "error", msg: string) => {
    if (type === "success") {
      setSuccessMsg(msg);
      setErrorMsg("");
      setTimeout(() => setSuccessMsg(""), 3000);
    } else {
      setErrorMsg(msg);
      setSuccessMsg("");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      triggerMessage("error", "로그아웃에 실패했습니다.");
    }
  };

  // Add Gold Price
  const handleAddPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newType.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/gold-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: newType,
          buyPrice: newBuyPrice,
          sellPrice: newSellPrice,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPrices([...prices, data]);
        setNewType("");
        setNewBuyPrice("");
        setNewSellPrice("");
        triggerMessage("success", "품목이 성공적으로 추가되었습니다.");
      } else {
        triggerMessage("error", data.error || "추가 중 오류가 발생했습니다.");
      }
    } catch (err) {
      triggerMessage("error", "서버와 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // Start Edit Gold Price
  const startEdit = (item: PriceItem) => {
    setEditingId(item.id);
    setEditType(item.type);
    setEditBuyPrice(item.buyPrice.toString());
    setEditSellPrice(item.sellPrice.toString());
  };

  // Cancel Edit Gold Price
  const cancelEdit = () => {
    setEditingId(null);
    setEditType("");
    setEditBuyPrice("");
    setEditSellPrice("");
  };

  // Save Edit Gold Price
  const handleSaveEdit = async (id: number) => {
    if (!editType.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/gold-prices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          type: editType,
          buyPrice: editBuyPrice,
          sellPrice: editSellPrice,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPrices(prices.map((p) => (p.id === id ? data : p)));
        cancelEdit();
        triggerMessage("success", "품목이 수정되었습니다.");
      } else {
        triggerMessage("error", data.error || "수정 중 오류가 발생했습니다.");
      }
    } catch (err) {
      triggerMessage("error", "서버와 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Gold Price
  const handleDeletePrice = async (id: number) => {
    if (!confirm("정말 이 품목을 삭제하시겠습니까?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gold-prices?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPrices(prices.filter((p) => p.id !== id));
        triggerMessage("success", "품목이 삭제되었습니다.");
      } else {
        const data = await res.json();
        triggerMessage("error", data.error || "삭제 중 오류가 발생했습니다.");
      }
    } catch (err) {
      triggerMessage("error", "서버와 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // Upload Showcase Image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/showcase-images", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImages([...images, data]);
        triggerMessage("success", "이미지가 성공적으로 등록되었습니다.");
      } else {
        triggerMessage("error", data.error || "업로드 실패");
      }
    } catch (err) {
      triggerMessage("error", "업로드 중 서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      // Reset input value to allow uploading same file again
      e.target.value = "";
    }
  };

  // Delete Showcase Image
  const handleDeleteImage = async (id: number) => {
    if (!confirm("정말 이 이미지를 삭제하시겠습니까?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/showcase-images?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setImages(images.filter((img) => img.id !== id));
        triggerMessage("success", "이미지가 삭제되었습니다.");
      } else {
        const data = await res.json();
        triggerMessage("error", data.error || "삭제 실패");
      }
    } catch (err) {
      triggerMessage("error", "서버와 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // Reorder Images (Move Up/Down)
  const moveImage = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;

    // Immediately update UI state locally
    setImages(newImages);

    try {
      const res = await fetch("/api/admin/showcase-images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reorder",
          ids: newImages.map((img) => img.id),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        triggerMessage("error", data.error || "순서 변경 실패");
        // Revert to initial state
        setImages(images);
      }
    } catch (err) {
      triggerMessage("error", "순서 변경 중 서버 오류가 발생했습니다.");
      setImages(images);
    }
  };

  const formatPriceVal = (price: string | number) => {
    const str = String(price).trim();
    if (!str) return "시세문의";
    
    const cleanNumStr = str.replace(/,/g, "");
    if (/^\d+$/.test(cleanNumStr)) {
      const num = parseInt(cleanNumStr, 10);
      return `${num.toLocaleString()}원`;
    }
    return str;
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-zinc-200 bg-white/70 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-bold text-zinc-950 text-lg shadow shadow-amber-500/10">
              G
            </div>
            <div>
              <span className="font-extrabold text-zinc-900 text-lg tracking-tight">미소금거래소</span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                관리자 모드
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-bold text-zinc-600 bg-white hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-300 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            로그아웃
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Status Toast Notification */}
        {(successMsg || errorMsg) && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce">
            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold">{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-semibold">{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-zinc-200 mb-8 gap-4">
          <button
            onClick={() => setActiveTab("prices")}
            className={`pb-4 px-4 font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === "prices"
                ? "border-amber-500 text-amber-600 font-extrabold"
                : "border-transparent text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            오늘의 금시세 관리
          </button>
          <button
            onClick={() => setActiveTab("images")}
            className={`pb-4 px-4 font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === "images"
                ? "border-amber-500 text-amber-600 font-extrabold"
                : "border-transparent text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            홍보 이미지 영역 관리
          </button>
        </div>

        {/* Tab Contents: Prices */}
        {activeTab === "prices" && (
          <div className="space-y-8">
            
            {/* New Price Item Form */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6">
              <h2 className="text-base font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
                시세 행 추가
              </h2>
              <form onSubmit={handleAddPrice} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-2">구분 (품목)</label>
                  <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="예: 순금 (24K), 18K 금"
                    required
                    className="w-full px-4 py-2.5 bg-white border border-zinc-300 text-zinc-900 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-2">고객님이 살 때</label>
                  <input
                    type="text"
                    value={newBuyPrice}
                    onChange={(e) => setNewBuyPrice(e.target.value)}
                    placeholder="예: 485000 또는 제품시세반영"
                    className="w-full px-4 py-2.5 bg-white border border-zinc-300 text-zinc-900 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-2">고객님이 팔 때</label>
                  <input
                    type="text"
                    value={newSellPrice}
                    onChange={(e) => setNewSellPrice(e.target.value)}
                    placeholder="예: 432000 또는 제품시세반영"
                    className="w-full px-4 py-2.5 bg-white border border-zinc-300 text-zinc-900 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-zinc-950 font-bold rounded-xl text-sm transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  시세 추가
                </button>
              </form>
            </div>

            {/* Price List Table */}
            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="min-w-full text-center divide-y divide-zinc-200">
                  <thead>
                    <tr className="bg-zinc-100 text-zinc-500">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">구분(품목)</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">고객님이 살 때</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">고객님이 팔 때</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">관리 작업</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 bg-white">
                    {prices.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-zinc-500 text-sm font-medium">
                          등록된 금시세 정보가 없습니다. 상단에서 시세를 추가해 주세요.
                        </td>
                      </tr>
                    ) : (
                      prices.map((item) => {
                        const isEditing = editingId === item.id;
                        return (
                          <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                            {/* 1. Item Type */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-900">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editType}
                                  onChange={(e) => setEditType(e.target.value)}
                                  className="px-3 py-1.5 bg-white border border-zinc-300 text-zinc-900 rounded-lg text-sm font-bold text-center focus:outline-none focus:ring-1 focus:ring-amber-500/50 w-full max-w-[180px]"
                                />
                              ) : (
                                item.type
                              )}
                            </td>

                            {/* 2. Buy Price */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-amber-600">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editBuyPrice}
                                  onChange={(e) => setEditBuyPrice(e.target.value)}
                                  className="px-3 py-1.5 bg-white border border-zinc-300 text-zinc-900 rounded-lg text-sm font-bold text-center focus:outline-none focus:ring-1 focus:ring-amber-500/50 w-full max-w-[150px]"
                                />
                              ) : (
                                formatPriceVal(item.buyPrice)
                              )}
                            </td>

                            {/* 3. Sell Price */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-emerald-600">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editSellPrice}
                                  onChange={(e) => setEditSellPrice(e.target.value)}
                                  className="px-3 py-1.5 bg-white border border-zinc-300 text-zinc-900 rounded-lg text-sm font-bold text-center focus:outline-none focus:ring-1 focus:ring-amber-500/50 w-full max-w-[150px]"
                                />
                              ) : (
                                formatPriceVal(item.sellPrice)
                              )}
                            </td>

                            {/* 4. Actions */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {isEditing ? (
                                <div className="flex justify-center gap-2">
                                  <button
                                    onClick={() => handleSaveEdit(item.id)}
                                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-lg text-xs cursor-pointer active:scale-95 transition-all"
                                  >
                                    저장
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="px-3 py-1.5 bg-white border border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 font-bold rounded-lg text-xs cursor-pointer active:scale-95 transition-all"
                                  >
                                    취소
                                  </button>
                                </div>
                              ) : (
                                <div className="flex justify-center gap-2">
                                  <button
                                    onClick={() => startEdit(item)}
                                    className="px-3 py-1.5 bg-white border border-zinc-300 text-zinc-600 hover:text-amber-600 hover:border-amber-500/20 hover:bg-amber-500/5 font-semibold rounded-lg text-xs cursor-pointer transition-all"
                                  >
                                    수정
                                  </button>
                                  <button
                                    onClick={() => handleDeletePrice(item.id)}
                                    className="px-3 py-1.5 bg-white border border-zinc-300 text-zinc-600 hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5 font-semibold rounded-lg text-xs cursor-pointer transition-all"
                                  >
                                    삭제
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Contents: Showcase Images */}
        {activeTab === "images" && (
          <div className="space-y-8">
            {/* Upload Area */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6">
              <h2 className="text-base font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
                홍보 이미지 추가
              </h2>
              
              <div className="w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-300 hover:border-amber-500/40 rounded-3xl bg-zinc-50 hover:bg-amber-500/5 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className="w-10 h-10 rounded-full border border-zinc-300 group-hover:border-amber-500/30 group-hover:text-amber-600 flex items-center justify-center text-zinc-500 mb-3 transition-colors shadow-sm bg-zinc-100">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-zinc-700">클릭하여 이미지 파일 선택</p>
                    <p className="text-xs text-zinc-500 mt-1">PNG, JPG, JPEG, WEBP 형식 지원</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>
            </div>

            {/* Showcase Image List Grid */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-zinc-600 uppercase tracking-wide px-1 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                등록된 홍보 이미지 ({images.length}개)
              </h2>

              {images.length === 0 ? (
                <div className="w-full text-center py-16 rounded-3xl border border-zinc-200 bg-white text-zinc-500 text-sm font-medium">
                  등록된 홍보 이미지가 없습니다. 상단에서 이미지를 추가해 주세요.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      className="bg-white border border-zinc-200 rounded-3xl p-5 hover:border-zinc-300 transition-all flex flex-col gap-4 group"
                    >
                      {/* Image Preview Container */}
                      <div className="relative w-full aspect-[16/9] bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200 flex items-center justify-center">
                        <img
                          src={img.url}
                          alt={img.filename}
                          className="object-contain w-full h-full group-hover:scale-[1.01] transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/80 backdrop-blur text-[10px] font-bold rounded-lg text-amber-600 border border-zinc-200 font-mono">
                          ORDER #{idx + 1}
                        </div>
                      </div>

                      {/* Info & Action Controls */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="truncate flex-1">
                          <p className="text-xs font-bold text-zinc-900 truncate" title={img.filename}>
                            {img.filename}
                          </p>
                          <p className="text-[10px] text-zinc-500 font-mono truncate mt-0.5">
                            {img.url}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Reordering buttons */}
                          <button
                            onClick={() => moveImage(idx, "up")}
                            disabled={idx === 0 || loading}
                            className="w-8 h-8 rounded-lg bg-white border border-zinc-300 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 hover:border-zinc-300 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                            title="위로 이동"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => moveImage(idx, "down")}
                            disabled={idx === images.length - 1 || loading}
                            className="w-8 h-8 rounded-lg bg-white border border-zinc-300 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 hover:border-zinc-300 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                            title="아래로 이동"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            disabled={loading}
                            className="px-3.5 h-8 rounded-lg bg-white border border-zinc-300 text-zinc-500 hover:text-red-500 hover:bg-red-50 hover:border-red-200 flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                            title="이미지 삭제"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
