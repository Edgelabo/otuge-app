"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type ResultType = {
  personality: {
    description: string;
  };
  guardian_deity: {
    name: string;
    description: string;
  };
  quote: {
    text: string;
  };
  destiny: {
    color: string;
    symbol: string;
    meaning: string;
  };
};

export default function Component() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setResult({
      personality: {
        description: `${name}さん、あなたは生まれながらにリーダーシップを発揮する力を持つ人です。周囲を明るく照らし、困難な状況でも冷静さを保ち、周りの人を鼓舞する存在です。持ち前の明るさと強い意志で、どんな目標も達成できるでしょう。`,
      },
      guardian_deity: {
        name: "天照大神（アマテラスオオミカミ）",
        description:
          "あなたの守護神は、太陽神である天照大神です。彼女はあなたに永遠の光と希望を授け、困難な時でも道を照らしてくれるでしょう。彼女はあなたに創造性を育み、周囲に活力を与える力を与えます。",
      },
      quote: {
        text: `${name}さんには、『どんな困難も乗り越えられる、その力はあなたの中に存在する』という言葉がふさわしいでしょう。`,
      },
      destiny: {
        color: "金色",
        symbol: "太陽",
        meaning:
          "あなたは太陽のように周囲を明るく照らし、人々に希望を与える存在です。あなたの輝かしい未来は、常に金色に輝いています。",
      },
    });
    setLoading(false);
    setShowResult(true);
  };

  const resetForm = () => {
    setName("");
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-800 to-red-900">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-800">神社のお告げ</h1>
          <p className="text-gray-600">あなたの運命をお聞かせします</p>
        </div>

        {!showResult ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                お名前
              </Label>
              <Input
                id="name"
                placeholder="ここにお名前を入力"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-red-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  お告げを待っています...
                </>
              ) : (
                "おみくじを引く"
              )}
            </Button>
          </form>
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
                良い一年になりますように
              </div>
              <div className="mt-4 text-center text-xs text-gray-500">
                神様の神社
              </div>
            </div>
            <Button
              onClick={resetForm}
              className="w-full bg-red-800 hover:bg-red-700 text-white mt-4"
            >
              別のおみくじを引く
            </Button>
          </div>
        ) : null}
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="cloud-animation"></div>
        </div>
      )}
    </div>
  );
}
