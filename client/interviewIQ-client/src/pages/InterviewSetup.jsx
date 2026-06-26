import React, { useState } from "react";
import {
  techStackItems,
  difficultyLevel,
  experience,
  duration,
} from "../utils/setupItems";
import { useNavigate } from "react-router-dom";

function InterviewSetup() {

  const navigate = useNavigate();

  const [setup, setSetup] = useState({
    stack: "",
    experience: "",
    difficulty: "",
    duration: "",
  });

  function updateSetup(key, value) {
    setSetup((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function startInterview() {

    if (
      !setup.stack ||
      !setup.experience ||
      !setup.difficulty ||
      !setup.duration
    ) {
      return;
    }

    navigate("/interview/live", {
      state: setup,
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-slate-800">
            AI Interview Setup
          </h1>

          <p className="text-slate-500 mt-3">
            Configure your interview before getting started.
          </p>

        </div>

        {/* Tech Stack */}

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6">

          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Choose Tech Stack
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {techStackItems.map((item) => (

              <button
                key={item.value}
                onClick={() => updateSetup("stack", item.value)}
                className={`rounded-xl border p-4 font-medium transition-all duration-300 cursor-pointer
                  ${
                    setup.stack === item.value
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                      : "bg-white border-slate-200 hover:bg-blue-50 hover:border-blue-400"
                  }`}
              >
                {item.label}
              </button>

            ))}

          </div>

        </div>

        {/* Experience */}

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6">

          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Experience Level
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {experience.map((item) => (

              <button
                key={item.value}
                onClick={() => updateSetup("experience", item.value)}
                className={`rounded-xl border p-4 font-medium transition-all duration-300 cursor-pointer
                  ${
                    setup.experience === item.value
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                      : "bg-white border-slate-200 hover:bg-blue-50 hover:border-blue-400"
                  }`}
              >
                {item.label}
              </button>

            ))}

          </div>

        </div>

        {/* Difficulty */}

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6">

          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Difficulty Level
          </h2>

          <div className="grid grid-cols-3 gap-4">

            {difficultyLevel.map((item) => (

              <button
                key={item.value}
                onClick={() => updateSetup("difficulty", item.value)}
                className={`rounded-xl border p-4 font-medium transition-all duration-300 cursor-pointer
                  ${
                    setup.difficulty === item.value
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                      : "bg-white border-slate-200 hover:bg-blue-50 hover:border-blue-400"
                  }`}
              >
                {item.label}
              </button>

            ))}

          </div>

        </div>

        {/* Duration */}

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-8">

          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Interview Duration
          </h2>

          <div className="grid grid-cols-4 gap-4">

            {duration.map((item) => (

              <button
                key={item.value}
                onClick={() => updateSetup("duration", item.value)}
                className={`rounded-xl border p-4 font-medium transition-all duration-300 cursor-pointer
                  ${
                    setup.duration === item.value
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                      : "bg-white border-slate-200 hover:bg-blue-50 hover:border-blue-400"
                  }`}
              >
                {item.label}
              </button>

            ))}

          </div>

        </div>

        {/* Summary */}

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-8">

          <h2 className="text-xl font-semibold text-slate-800 mb-5">
            Interview Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <p className="text-slate-500">Tech Stack</p>
              <p className="font-semibold text-slate-800">
                {setup.stack || "-"}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Experience</p>
              <p className="font-semibold text-slate-800">
                {setup.experience || "-"}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Difficulty</p>
              <p className="font-semibold text-slate-800">
                {setup.difficulty || "-"}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Duration</p>
              <p className="font-semibold text-slate-800">
                {setup.duration
                  ? `${setup.duration} Minutes`
                  : "-"}
              </p>
            </div>

          </div>

        </div>

        {/* Button */}

        <div className="flex justify-center">

          <button
            disabled={
              !setup.stack ||
              !setup.experience ||
              !setup.difficulty ||
              !setup.duration
            }
            onClick={startInterview}
            className="px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all duration-300"
          >
            Start AI Interview
          </button>

        </div>

      </div>

    </div>
  );
}

export default InterviewSetup;