import React from "react";
import { Link, useLocation } from "react-router-dom";

function InterviewCompleted() {

  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center">

          <h2 className="text-2xl font-semibold text-slate-800">
            No Interview Data Found
          </h2>

          <p className="text-slate-500 mt-2">
            Please complete an interview first.
          </p>

          <Link
            to="/dashboard"
            className="inline-flex mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>

        </div>

      </div>
    );
  }

  const {
    technicalScore,
    communicationScore,
    feedback,
    roadMap,
    strongAreas,
    weakAreas,
  } = state;

  const overallScore = (
    (technicalScore + communicationScore * 2) / 2
  ).toFixed(1);

  return (

    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="mb-10">

          <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">

            ✓ Interview Completed

          </span>

          <h1 className="mt-4 text-3xl font-bold text-slate-800">

            Interview Performance Report

          </h1>

          <p className="mt-2 text-slate-500 max-w-2xl">

            Here is your interview evaluation.
            Review your strengths, identify improvement areas,
            and follow the personalized roadmap.

          </p>

        </div>

        {/* Score Cards */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          {/* Technical */}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <div className="border-b border-slate-100 pb-3 mb-4">

              <p className="text-sm text-slate-500">

                Technical Score

              </p>

            </div>

            <div className="flex items-end gap-1">

              <span className="text-4xl font-bold text-slate-800">

                {technicalScore}

              </span>

              <span className="text-slate-400 mb-1">

                /10

              </span>

            </div>

          </div>

          {/* Communication */}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <div className="border-b border-slate-100 pb-3 mb-4">

              <p className="text-sm text-slate-500">

                Communication Score

              </p>

            </div>

            <div className="flex items-end gap-1">

              <span className="text-4xl font-bold text-slate-800">

                {communicationScore}

              </span>

              <span className="text-slate-400 mb-1">

                /5

              </span>

            </div>

          </div>

          {/* Overall */}

          <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">

            <div className="border-b border-slate-100 pb-3 mb-4">

              <p className="text-sm text-blue-600 font-medium">

                Overall Rating

              </p>

            </div>

            <div className="flex items-end gap-1">

              <span className="text-4xl font-bold text-blue-600">

                {overallScore}

              </span>

              <span className="text-slate-400 mb-1">

                /10

              </span>

            </div>

          </div>

        </div>
                {/* Analysis */}

        <div className="grid lg:grid-cols-2 gap-5 mb-8">

          {/* Strong Areas */}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-xl font-semibold text-slate-800">

                  Strong Areas

                </h2>

                <p className="text-sm text-slate-500 mt-1">

                  Skills demonstrated confidently during the interview.

                </p>

              </div>

              <span className="text-green-600 font-semibold">

                {strongAreas?.length || 0}

              </span>

            </div>

            {

              strongAreas?.length ?

              <div className="space-y-3">

                {

                  strongAreas.map((item,index)=>{

                    return(

                      <div
                        key={index}
                        className="flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-3"
                      >

                        <div className="w-2 h-2 rounded-full bg-green-500"></div>

                        <p className="text-slate-700">

                          {item}

                        </p>

                      </div>

                    )

                  })

                }

              </div>

              :

              <div className="rounded-lg border border-dashed border-slate-300 py-8 text-center text-slate-500">

                No strong areas identified.

              </div>

            }

          </div>

          {/* Weak Areas */}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-xl font-semibold text-slate-800">

                  Areas to Improve

                </h2>

                <p className="text-sm text-slate-500 mt-1">

                  Focus on these topics before your next interview.

                </p>

              </div>

              <span className="text-red-500 font-semibold">

                {weakAreas?.length || 0}

              </span>

            </div>

            {

              weakAreas?.length ?

              <div className="space-y-3">

                {

                  weakAreas.map((item,index)=>{

                    return(

                      <div
                        key={index}
                        className="flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-3"
                      >

                        <div className="w-2 h-2 rounded-full bg-red-500"></div>

                        <p className="text-slate-700">

                          {item}

                        </p>

                      </div>

                    )

                  })

                }

              </div>

              :

              <div className="rounded-lg border border-dashed border-slate-300 py-8 text-center text-slate-500">

                No weak areas identified.

              </div>

            }

          </div>

        </div>

        {/* AI Feedback */}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">

          <div className="mb-5">

            <h2 className="text-xl font-semibold text-slate-800">

              AI Feedback

            </h2>

            <p className="text-sm text-slate-500 mt-1">

              Overall evaluation generated after analyzing your interview.

            </p>

          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">

            <p className="leading-8 text-slate-700">

              {feedback}

            </p>

          </div>

        </div>
                {/* Learning Roadmap */}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-10">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-slate-800">

              Recommended Learning Plan

            </h2>

            <p className="text-sm text-slate-500 mt-1">

              Follow this personalized roadmap before taking your next interview.

            </p>

          </div>

          <div className="space-y-3">

            {
              Object.entries(roadMap || {}).map(([day, task]) => (

                <div
                  key={day}
                  className="flex items-start gap-5 rounded-lg border border-slate-200 px-5 py-4 hover:bg-slate-50 transition-colors"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">

                    {day.replace("day", "")}

                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-800 capitalize">

                      {day}

                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">

                      {task}

                    </p>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

        {/* New Interview */}

        <div className="flex justify-center">

          <Link
            to="/interview/setup"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
          >

            Start New Interview

          </Link>

        </div>

      </div>

    </div>

  );
}

export default InterviewCompleted;