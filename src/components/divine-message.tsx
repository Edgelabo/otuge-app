'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function DivineMessage() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<{nickname: string, origin: string, action: string} | null>(null)
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // 実際のAPIコールの代わりに、ダミーデータを使用
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <Card className="w-[350px] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-400 via-gold-500 to-yellow-600 text-white">
          <CardTitle className="text-2xl font-bold text-center">神様のお告げ</CardTitle>
          <CardDescription className="text-white/80 text-center">あなたの運命をお聞かせします</CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          {!showResult ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input
                  id="name"
                  placeholder="ここにお名前を入力"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 via-gold-500 to-yellow-600 hover:from-yellow-500 hover:via-gold-600 hover:to-yellow-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    お告げを待っています...
                  </>
                ) : (
                  'お告げをもらう'
                )}
              </Button>
            </form>
          ) : result ? (
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-semibold text-lg text-gold-400">新しいあだ名</h3>
                <p className="text-white">{result.nickname}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-semibold text-lg text-gold-400">由来</h3>
                <p className="text-white">{result.origin}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-semibold text-lg text-gold-400">今日やると良い行動</h3>
                <p className="text-white">{result.action}</p>
              </div>
              <Button
                onClick={resetForm}
                className="w-full bg-gradient-to-r from-yellow-400 via-gold-500 to-yellow-600 hover:from-yellow-500 hover:via-gold-600 hover:to-yellow-700 text-white mt-4"
              >
                他のお告げをもらう
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="cloud-animation"></div>
        </div>
      )}
    </div>
  )
}