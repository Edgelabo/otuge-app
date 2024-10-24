'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function ShrineFortune() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<{nickname: string, origin: string, action: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setResult({
      nickname: `神々しい${name}`,
      origin: `古代の神話に登場する${name}にちなんで`,
      action: '今日は誰かに親切な行動をしましょう'
    })
    setLoading(false)
    setShowResult(true)
  }

  const resetForm = () => {
    setName('')
    setResult(null)
    setShowResult(false)
  }

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
              <Label htmlFor="name" className="text-gray-700">お名前</Label>
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
                'おみくじを引く'
              )}
            </Button>
          </form>
        ) : result ? (
          <div className="space-y-4">
            <div className="border-4 border-red-800 p-4 rounded-lg">
              <div className="text-center mb-4">
                <div className="w-16 h-1 bg-red-800 mx-auto mb-2"></div>
                <h2 className="text-2xl font-bold text-red-800">第一番</h2>
                <div className="w-16 h-1 bg-red-800 mx-auto mt-2"></div>
              </div>
              <div className="text-center mb-4">
                <h3 className="text-4xl font-bold text-red-800">{result.nickname}</h3>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-gray-700"><span className="font-semibold">由来:</span> {result.origin}</p>
                <p className="text-gray-700"><span className="font-semibold">今日の行動:</span> {result.action}</p>
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
  )
}