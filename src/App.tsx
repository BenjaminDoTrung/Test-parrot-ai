import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [submissions, setSubmissions] = useState<{ score: number; time: number }[]>([]);
  const [score, setScore] = useState<number | "">("");
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState("");

  // Đếm giây
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sắp xếp submissions theo rule: score giảm dần, score bằng thì time tăng dần
  const sortedData = [...submissions].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.time - b.time;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (score === "" || score < 0 || score > 100) {
      setMessage("⚠️ Điểm phải từ 0 đến 100!");
      return;
    }

    const submission = { score: Number(score), time: seconds };
    setSubmissions([...submissions, submission]);

    // Thông báo theo điều kiện
    if (Number(score) > 90) {
      setMessage("🎉 Tuyệt vời!");
    } else if (Number(score) >= 70) {
      setMessage("👏 Chúc mừng!");
    } else {
      setMessage("⚡ Cần cố gắng hơn!");
    }

    // Reset input + timer
    setScore("");
    setSeconds(0);

    // Ẩn message sau 3s
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Nộp Bài</h1>

      {/* Thông báo */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded shadow animate-bounce">
          {message}
        </div>
      )}

      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center bg-gray-100">
          <div className="bg-white shadow-none text-4xl font-bold text-blue-600 w-full text-center">
            {seconds} s
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Điểm (0-100):</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={score}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= 100) setScore(val); // validate không cho nhập > 100
              else setScore(100);
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Nộp
        </button>
      </form>

      {/* Bảng kết quả */}
      <div className="w-full max-w-2xl mt-8">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                STT
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 border-b">
                Điểm
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 border-b">
                Thời gian (s)
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, idx) => (
              <tr
                key={idx}
                className={`hover:bg-gray-50 ${
                  idx === 0 ? "bg-yellow-100 font-bold" : ""
                }`}
              >
                <td className="px-4 py-2 border-b text-sm">{idx + 1}</td>
                <td className="px-4 py-2 border-b text-sm text-center">
                  {item.score}
                </td>
                <td className="px-4 py-2 border-b text-sm text-center">
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
