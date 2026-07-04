import React, { useContext, useState } from "react";
import moment from "moment";
import { UserProvider } from "../components/ContextProvider";
import PopUp from "../components/PopUp";
import UpdateProfileForm from "../components/UpdateProfileForm";

function Profile() {
  const { userDetails, allInterviews } = useContext(UserProvider);

  const [isChangeDetailsForm, setIsChangeDetailsForm] = useState(false);

  function getAge(dob) {
    if (!dob) return "N/A";
    return moment().diff(dob, "years");
  }

  const totalInterviews = allInterviews?.length || 0;

  const averageTechnicalScore=
     totalInterviews
    ? (
        allInterviews.reduce(
          (sum, interview) => sum + interview.technicalScore,
          0
        ) / totalInterviews
      ).toFixed(1)
    : "0";

  const averageCommunicationScore=
     totalInterviews
    ? (
        allInterviews.reduce(
          (sum, interview) => sum + interview.communicationScore,
          0
        ) / totalInterviews
      ).toFixed(1)
    : "0";
  

  const bestScore = totalInterviews
    ? Math.max(...allInterviews.map((i) => i.technicalScore))
    : 0;

  const joinedDate =
    userDetails?.createdAt || userDetails?.updatedAt
      ? moment(userDetails.createdAt || userDetails.updatedAt).format(
          "MMMM YYYY"
        )
      : "June 2026";

  return (
    <div className="relative min-h-screen bg-slate-50 p-6">

      {isChangeDetailsForm && (
        <PopUp
          setIsChangeDetailsForm={setIsChangeDetailsForm}
          RenderComponent={UpdateProfileForm}
        />
      )}

      <div className="max-w-6xl mx-auto">

        {/* Profile Header */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 mb-6">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-md">

              {userDetails?.name
                ? userDetails.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()
                : "U"}

            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-800">

              {userDetails?.name}

            </h1>

            <p className="mt-1 text-slate-500">

              Software Engineer Aspirant

            </p>

            <div className="mt-4 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">

              Member Since {joinedDate}

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <p className="text-sm text-slate-500">

              Total Interviews

            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-800">

              {totalInterviews}

            </h2>

          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <p className="text-sm text-slate-500">

              Best Score

            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-800">

              {bestScore}/10

            </h2>

          </div> 

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <p className="text-sm text-slate-500">

              Average Technical Score

            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-800">

              {averageTechnicalScore}/10

            </h2>

          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">

            <p className="text-sm text-slate-500">

              Average Communication Score

            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-800">

              {averageCommunicationScore}/5

            </h2>

          </div>

        </div>

        {/* Personal Information */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-2xl font-semibold text-slate-800">

                Personal Information

              </h2>

              <p className="mt-1 text-slate-500">

                Manage your account details.

              </p>

            </div>

            <button
              onClick={() => setIsChangeDetailsForm(true)}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 font-medium transition-all duration-300 cursor-pointer"
            >

              Edit Profile

            </button>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="rounded-xl border border-slate-200 p-5">

              <p className="text-sm text-slate-500">

                Full Name

              </p>

              <p className="mt-1 text-lg font-semibold text-slate-800">

                {userDetails?.name || "N/A"}

              </p>

            </div>

            <div className="rounded-xl border border-slate-200 p-5">

              <p className="text-sm text-slate-500">

                Email Address

              </p>

              <p className="mt-1 text-lg font-semibold text-slate-800 break-all">

                {userDetails?.email || "N/A"}

              </p>

            </div>

            <div className="rounded-xl border border-slate-200 p-5">

              <p className="text-sm text-slate-500">

                Phone Number

              </p>

              <p className="mt-1 text-lg font-semibold text-slate-800">

                {userDetails?.phone || "N/A"}

              </p>

            </div>

            <div className="rounded-xl border border-slate-200 p-5">

              <p className="text-sm text-slate-500">

                Date of Birth

              </p>

              <p className="mt-1 text-lg font-semibold text-slate-800">

                {userDetails?.dob
                  ? moment(userDetails.dob).format("DD MMM YYYY")
                  : "N/A"}

              </p>

            </div>

            <div className="rounded-xl border border-slate-200 p-5">

              <p className="text-sm text-slate-500">

                Age

              </p>

              <p className="mt-1 text-lg font-semibold text-slate-800">

                {getAge(userDetails?.dob)}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;