export const fetchGeminiData = async (userName: string, apiKey: string) => {
  try {
    // 静的アセットから prompt.txt を fetch で読み込む
    const responseTxt = await fetch("/prompt.txt");
    const promptTemplate = await responseTxt.text();

    // {userName} を実際の userName に置換
    const promptWithUserName = promptTemplate.replace("{userName}", userName);

    // Gemini API にリクエスト
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptWithUserName }],
            },
          ],
        }),
      },
    );

    const data = await response.json();
    console.log(data);
    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0]
    ) {
      const contentText = data.candidates[0].content.parts[0].text;
      // JSON部分を抽出
      const resultJsonMatch = contentText.match(/```json([\s\S]*?)```/);
      if (!resultJsonMatch) {
        throw new Error("JSON部分が見つかりませんでした");
      }

      return JSON.parse(resultJsonMatch[1]);
    } else {
      throw new Error("No content available");
    }
  } catch (error) {
    throw new Error((error as Error).message || "Unknown error occurred");
  }
};

export default fetchGeminiData;
