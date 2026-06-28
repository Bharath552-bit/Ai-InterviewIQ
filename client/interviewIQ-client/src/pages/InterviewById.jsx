import React, { useContext } from "react";
import { UserProvider } from "../components/ContextProvider";
import { useParams } from "react-router-dom";
import moment from "moment";

function InterviewById() {

  const { allInterviews } = useContext(UserProvider);

  const { id } = useParams();

  const interview = allInterviews.find(
    (item) => item._id === id
  );

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 text-xl">
        Interview not found.
      </div>
    );
  }

  const duration = moment(interview.endedAt).diff(
    moment(interview.startedAt),
    "minutes"
  );

  function scoreColor(score) {
    if (score >= 8) return "bg-green-100 text-green-700";

    if (score >= 6) return "bg-amber-100 text-amber-700";

    return "bg-red-100 text-red-700";
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6">

          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                Interview Report
              </h1>

              <p className="text-slate-500 mt-2">
                {interview.stack}
              </p>

            </div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
              {interview.difficultyLevel}
            </span>

          </div>

        </div>

        {/* Summary */}

        <div className="grid md:grid-cols-4 gap-5 mb-6">

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

            <p className="text-slate-500 text-sm">
              Technical Score
            </p>

            <span className={`mt-3 inline-block px-3 py-2 rounded-lg font-semibold ${scoreColor(interview.technicalScore)}`}>
              {interview.technicalScore}/10
            </span>

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

            <p className="text-slate-500 text-sm">
              Communication
            </p>

            <span className={`mt-3 inline-block px-3 py-2 rounded-lg font-semibold ${scoreColor(interview.communicationScore * 2)}`}>
              {interview.communicationScore}/5
            </span>

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

            <p className="text-slate-500 text-sm">
              Duration
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-2">
              {duration} min
            </h2>

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

            <p className="text-slate-500 text-sm">
              Date
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-2">
              {moment(interview.startedAt).format("DD MMM YYYY")}
            </h2>

          </div>

        </div>

        {/* Strong & Weak */}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          <div className="bg-white rounded-2xl border border-green-200 p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-green-700 mb-5">
              Strong Areas
            </h2>

            <div className="flex flex-wrap gap-3">

              {interview.strongAreas.length ? (
                interview.strongAreas.map((item, index) => (

                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm"
                  >
                    {item}
                  </span>

                ))
              ) : (
                <p className="text-slate-400">
                  No strong areas detected.
                </p>
              )}

            </div>

          </div>

          <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-sm">

            <h2 className="text-xl font-semibold text-red-600 mb-5">
              Weak Areas
            </h2>

            <div className="flex flex-wrap gap-3">

              {interview.weakAreas.length ? (
                interview.weakAreas.map((item, index) => (

                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                  >
                    {item}
                  </span>

                ))
              ) : (
                <p className="text-slate-400">
                  No weak areas detected.
                </p>
              )}

            </div>

          </div>

        </div>

        {/* AI Feedback */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">

          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            AI Feedback
          </h2>

          <p className="text-slate-600 leading-8">
            {interview.feedback}
          </p>

        </div>

        {/* Conversation */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Interview Conversation
          </h2>

          <div className="space-y-5">

            {interview.conversation?.filter((message) => message.role !== "system")
            .map((message, index) => (

              <div
                key={index}
                className={`flex ${
                  message.role === "assistant"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >

                <div
                  className={`max-w-3xl rounded-2xl px-5 py-4 shadow-sm ${
                    message.role === "assistant"
                      ? "bg-slate-100 text-slate-800"
                      : "bg-blue-600 text-white"
                  }`}
                >

                  <p className="text-sm font-semibold mb-2">
                    {message.role === "assistant"
                      ? "AI Interviewer"
                      : "You"}
                  </p>

                  <p className="leading-7 whitespace-pre-wrap">
                    {message.content}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default InterviewById;