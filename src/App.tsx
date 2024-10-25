"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import FormComponent from "./components/Form";
import LoadingOverlay from "./components/LoadingOverlay";
import fetchGeminiData from "./api";
import { ResultType } from "@/types/ResultType";

export default function Component() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // エラーメッセージをリセット

    const apiKey =
      import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    try {
      const response = await fetchGeminiData(name, apiKey);
      setResult(response);
      setShowResult(true);
    } catch (error: unknown) {
      if (!errorMessage) {
        setErrorMessage("データの取得に失敗しました。もう一度お試しください。");
      }
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setResult(null);
    setShowResult(false);
    setErrorMessage(""); // エラーメッセージもリセット
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-800 to-red-900">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl mt-20 mb-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-800">神様からのお告げ</h1>
          <p className="text-gray-600">あなたに助言をお伝えします</p>
        </div>

        {errorMessage && (
          <div className="text-center text-red-600 mb-4">{errorMessage}</div>
        )}

        {!showResult ? (
          <FormComponent
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
            loading={loading}
            errorMessage={errorMessage}
          />
        ) : result ? (
          <div className="space-y-4">
            <div className="border-4 border-red-800 p-4 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-16 h-1 bg-red-800 mx-auto mb-2"></div>
                <h2 className="text-2xl font-bold text-red-800">神託</h2>
                <div className="w-16 h-1 bg-red-800 mx-auto mt-2"></div>
              </div>
              <div className="space-y-4 text-center">
                <div>
                  <h3 className="text-xl font-semibold text-red-800 mb-2">
                    あなたの性格
                  </h3>
                  <p className="text-gray-700">
                    {result.personality.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-800 mb-2">
                    守護神
                  </h3>
                  <p className="text-gray-700 font-bold">
                    {result.guardian_deity.name}
                  </p>
                  <p className="text-gray-700">
                    {result.guardian_deity.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-800 mb-2">
                    あなたへの言葉
                  </h3>
                  <p className="text-gray-700 italic">{result.quote.text}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-800 mb-2">
                    運命の象徴
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-bold">色:</span>{" "}
                    {result.destiny.color}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">シンボル:</span>{" "}
                    {result.destiny.symbol}
                  </p>
                  <p className="text-gray-700">{result.destiny.meaning}</p>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                良い人生になりますように
              </div>
              <div className="mt-4 text-center text-xs text-gray-500">
                AI神社
              </div>
            </div>
            <Button
              onClick={resetForm}
              className="w-full bg-red-800 hover:bg-red-700 text-white mt-4"
            >
              別のお告げを聞く
            </Button>
          </div>
        ) : null}
      </div>
      {/* ローディング中はローディングオーバーレイを表示 */}
      {loading && <LoadingOverlay />}
    </div>
  );
}
