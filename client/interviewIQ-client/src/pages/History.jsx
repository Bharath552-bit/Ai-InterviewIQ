import React, { useContext } from "react";
import { UserProvider } from "../components/ContextProvider";
import moment from "moment";

function History() {
  const { allInterviews } = useContext(UserProvider);

  if (!allInterviews?.length) {
    return (
      <div className="h-[320px] flex items-center justify-center text-slate-500 text-lg">
        No interview history available.
      </div>
    );
  }

  function scoreColor(score) {
    if (score >= 8) return "bg-green-100 text-green-700";
    if (score >= 6) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Interview History
        </h1>

        <p className="text-slate-500 mt-2">
          Review your previous interview sessions.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {allInterviews.map((interview) => {

          const duration = moment(interview.endedAt).diff(
            moment(interview.startedAt),
            "minutes"
          );

          return (

            <div
              key={interview._id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5"
            >

              {/* Stack + Experience */}
              <div className="flex justify-between items-center mb-4">

                <div>

                  <h2 className="text-lg font-bold text-slate-800">
                    {interview.stack}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {interview.difficultyLevel}
                  </p>

                </div>

                <span className="text-xs text-slate-500">
                  {moment(interview.startedAt).format("DD MMM YYYY")}
                </span>

              </div>

              {/* Duration */}
              <div className="mb-4">

                <p className="text-sm text-slate-500">
                  Duration
                </p>

                <p className="font-semibold text-slate-700">
                  {duration} min
                </p>

              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-3 mb-5">

                <div className="bg-slate-50 rounded-xl p-3 text-center">

                  <p className="text-xs text-slate-500">
                    Technical
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-lg text-sm font-semibold ${scoreColor(
                      interview.technicalScore
                    )}`}
                  >
                    {interview.technicalScore}/10
                  </span>

                </div>

                <div className="bg-slate-50 rounded-xl p-3 text-center">

                  <p className="text-xs text-slate-500">
                    Communication
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-lg text-sm font-semibold ${scoreColor(
                      interview.communicationScore * 2
                    )}`}
                  >
                    {interview.communicationScore}/5
                  </span>

                </div>

              </div>

              {/* Button */}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-all duration-300"
              >
                View Interview
              </button>

            </div>

          );
        })}
      </div>

    </div>
  );
}

export default History;