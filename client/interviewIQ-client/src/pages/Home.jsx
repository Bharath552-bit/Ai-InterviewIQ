import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">

        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            AI InterviewIQ
          </h1>
        </div>

        <div className="flex items-center gap-4">

          {!isLoggedIn ? (
            <>
              <button className="border border-slate-300 hover:border-blue-600 hover:text-blue-600 bg-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer"
              onClick={()=>navigate("login")}
              >
                Login
              </button>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-md transition-all duration-300 cursor-pointer"
              onClick={()=>navigate("signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer"
              onClick={()=>navigate("dashboard")}
              >
                Go to Dashboard
              </button>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-md transition-all duration-300 cursor-pointer"
              onClick={()=>navigate("interview/setup")}
              >
                New Interview
              </button>
            </>
          )}

        </div>

      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
              AI Powered Interview Preparation
            </span>

            <h1 className="text-5xl font-bold text-slate-800 leading-tight">
              Ace Your Next
              <span className="text-blue-600"> Technical Interview </span>
              with AI
            </h1>

            <p className="text-slate-600 text-lg mt-6 leading-8">
              Practice real interview questions, receive instant AI feedback,
              improve your communication skills, and track your interview
              performance with AI InterviewIQ.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm text-slate-600 shadow-sm">
                🎤 Voice Interview
              </span>

              <span className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm text-slate-600 shadow-sm">
                🤖 AI Feedback
              </span>

              <span className="bg-white border border-slate-200 px-4 py-2 rounded-full text-sm text-slate-600 shadow-sm">
                📈 Performance Dashboard
              </span>

            </div>

          </div>

          {/* Right Side */}
          <div className="flex justify-center">

            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 w-full max-w-md">

              <div className="flex justify-center mb-6">

                <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-6xl">
                  🤖
                </div>

              </div>

              <h2 className="text-2xl font-bold text-center text-slate-800">
                AI InterviewIQ
              </h2>

              <p className="text-center text-slate-500 mt-2">
                Your Personal AI Interview Coach
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-green-500"></div>

                  <span className="text-slate-700">
                    AI Powered Technical Interviews
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-green-500"></div>

                  <span className="text-slate-700">
                    Speech Recognition
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-green-500"></div>

                  <span className="text-slate-700">
                    Personalized AI Feedback
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-green-500"></div>

                  <span className="text-slate-700">
                    Performance Analytics
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <div className="w-3 h-3 rounded-full bg-green-500"></div>

                  <span className="text-slate-700">
                    Interview History
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          Why Choose AI InterviewIQ?
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            <div className="text-4xl mb-4">🎤</div>

            <h3 className="font-semibold text-lg text-slate-800 mb-2">
              Live AI Interview
            </h3>

            <p className="text-slate-500">
              Practice with a realistic AI interviewer that asks technical
              questions in real time.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            <div className="text-4xl mb-4">🧠</div>

            <h3 className="font-semibold text-lg text-slate-800 mb-2">
              Instant Feedback
            </h3>

            <p className="text-slate-500">
              Receive AI-generated strengths, weaknesses, and improvement tips
              after every interview.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            <div className="text-4xl mb-4">📊</div>

            <h3 className="font-semibold text-lg text-slate-800 mb-2">
              Analytics Dashboard
            </h3>

            <p className="text-slate-500">
              Visualize your interview scores and monitor your growth with
              interactive charts.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            <div className="text-4xl mb-4">📚</div>

            <h3 className="font-semibold text-lg text-slate-800 mb-2">
              Interview History
            </h3>

            <p className="text-slate-500">
              Access all your previous interviews and review your performance
              anytime.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;