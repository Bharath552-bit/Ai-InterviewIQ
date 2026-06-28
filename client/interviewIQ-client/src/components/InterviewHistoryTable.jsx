import { useContext } from "react";
import { UserProvider } from "./ContextProvider";
import moment from 'moment'
import { Link } from "react-router-dom";

const scoreBadge = (score) =>
  score >= 8 ? "bg-green-100 text-green-700"
  : score >= 6 ? "bg-amber-100 text-amber-700"
  : "bg-red-100 text-red-700";

const difficultyBadge = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-100 text-emerald-700";
    case "Medium":
      return "bg-amber-100 text-amber-700";
    case "Hard":
      return "bg-rose-100 text-rose-700";
  }
};

export default function InterviewHistoryTable() {
  const {allInterviews} = useContext(UserProvider)
  const latestInterviews = allInterviews.slice(-5).reverse()

  return (
  <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="sticky top-0 bg-slate-100 border-b border-slate-200">

          <tr className="text-xs uppercase tracking-wider text-slate-600">

            <th className="px-5 py-4 text-left font-semibold">#</th>

            <th className="px-5 py-4 text-left font-semibold">
              Tech Stack
            </th>

            <th className="px-5 py-4 text-left font-semibold">
              Difficulty
            </th>

            <th className="px-5 py-4 text-left font-semibold">
              Date
            </th>

            <th className="px-5 py-4 text-center font-semibold">
              Technical
            </th>

            <th className="px-5 py-4 text-center font-semibold">
              Communication
            </th>

            <th className="px-5 py-4 text-center font-semibold">
              Duration
            </th>

            <th className="px-5 py-4 text-center font-semibold">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {latestInterviews.map((interview, i) => (

            <tr
              key={interview._id}
              className="border-b border-slate-100 transition-all duration-200"
            >

              <td className="px-5 py-4 text-slate-500 font-medium">
                {i + 1}
              </td>

              <td className="px-5 py-4">

                <div className="font-semibold text-slate-800">
                  {interview.stack}
                </div>

              </td>

              <td className="px-5 py-4">

                <span
                  className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${difficultyBadge(
                    interview.difficultyLevel
                  )}`}
                >
                  {interview.difficultyLevel}
                </span>

              </td>

              <td className="px-5 py-4 text-slate-600">

                {moment(interview.startedAt).format("DD MMM YYYY")}

              </td>

              <td className="px-5 py-4 text-center">

                <span
                  className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${scoreBadge(
                    interview.technicalScore
                  )}`}
                >
                  {interview.technicalScore}/10
                </span>

              </td>

              <td className="px-5 py-4 text-center">

                <span
                  className={`inline-flex rounded-lg px-3 py-1 text-xs font-semibold ${scoreBadge(
                    interview.communicationScore * 2
                  )}`}
                >
                  {interview.communicationScore}/5
                </span>

              </td>

              <td className="px-5 py-4 text-center text-slate-600">

                {interview.duration} min

              </td>

              <td className="px-5 py-4 text-center">

                <Link
                to={`/history/${interview._id}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer no-underline"
                >
                View

                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
);
}