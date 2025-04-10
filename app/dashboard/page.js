"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import FetchCourse from "@/components/FetchCourse";

/**
 * Parse a course name in the format:
 * "May 24-25 Standard First Aid with CPR-C (SFA) - TMU"
 * Returns an object with courseDates, course, and location.
 */
function parseCourseName(fullName = "") {
  let splitted = fullName.split(" - ");
  let location = "";
  let courseDates = "";
  let course = fullName;
  if (splitted.length >= 3) {
    location = splitted[splitted.length - 1];
    splitted.pop();
    const first = splitted[0] || "";
    const second = splitted[1] || "";
    let secondParts = second.split(" ");
    if (secondParts.length >= 2) {
      courseDates = first + " - " + secondParts[0] + " " + secondParts[1];
      const remainderCourse = secondParts.slice(2).join(" ");
      if (splitted.length === 3) {
        course = remainderCourse + (splitted[2] ? " - " + splitted[2] : "");
      } else {
        course = remainderCourse;
      }
    } else {
      courseDates = first + " - " + second;
    }
  } else if (splitted.length === 2) {
    location = splitted[1];
    const re = /^([A-Za-z]+\\s+\\d+-\\d+)(\\s+.*)?$/;
    const match = splitted[0].match(re);
    if (match) {
      courseDates = match[1].trim();
      const remainder = (match[2] || "").trim();
      course = remainder;
    } else {
      course = splitted[0];
    }
  }
  return { courseDates, course, location };
}

/**
 * Parse a classroom string formatted like "April 12-13 Bronze Harbord"
 * Returns an object with { date, location }
 */
function parseBronzeClassroom(classroomString = "") {
  const parts = classroomString.split(" ");
  if (parts.length >= 4) {
    const datePart = parts.slice(0, 2).join(" "); // e.g., "April 12-13"
    const locationPart = parts[parts.length - 1]; // e.g., "Harbord"
    return { date: datePart, location: locationPart };
  }
  return { date: classroomString, location: "" };
}

/**
 * Return the correct policy strings for refund/reschedule
 * based on daysUntilStart and the given policy object
 */
function getPolicyForCourse(daysUntilStart, policy) {
  if (!policy) {
    return { refund: "", reschedule: "" };
  }
  const { refundPolicy, reschedulePolicy } = policy;
  if (daysUntilStart > 5) {
    return {
      refund: refundPolicy["More than 5 days1*"],
      reschedule: reschedulePolicy["More than 5 days1*"],
    };
  } else if (daysUntilStart <= 5 && daysUntilStart >= 3) {
    return {
      refund: refundPolicy["3-5 days1*"],
      reschedule: reschedulePolicy["3-5 days1*"],
    };
  } else if (daysUntilStart < 3 && daysUntilStart >= 0) {
    return {
      refund: refundPolicy["2 days or less1*"],
      reschedule: reschedulePolicy["2 days or less1*"],
    };
  } else {
    return {
      refund: refundPolicy["After course begins"],
      reschedule: reschedulePolicy["After course begins"],
    };
  }
}

/**
 * Format the # of days until a course starts,
 * returning strings like "Starts in 2 weeks, 4 days"
 */
function formatDays(days) {
  const weeks = Math.floor(days / 7);
  const remainder = days % 7;
  if (weeks > 0 && remainder > 0) {
    return `Starts in ${weeks} weeks, ${remainder} days`;
  } else if (weeks > 0) {
    return `Starts in ${weeks} weeks`;
  } else {
    return `Starts in ${days} days`;
  }
}

export default function DashboardPage() {
  const router = useRouter();

  // Pull global data and methods from AppContext
  const {
    selectedAccount,
    batches,
    policy,
    error,
    sessionExpired,
    selectedEnrollments,
    setSelectedEnrollments,
  } = useContext(AppContext);

  // Toggling enrollments example
  function handleToggleEnrollment(id) {
    console.log("Toggling enrollment", id);
    setSelectedEnrollments((prev) => {
      const existingIndex = prev.findIndex((obj) => obj.Id === id);
      if (existingIndex !== -1) {
        return prev.filter((obj) => obj.Id !== id);
      } else {
        return [...prev, { Id: id }];
      }
    });
  }

  // If there's a Bronze Cross standard enrollment
  const bronzeCrossEnrollment = batches.find(
    (en) =>
      !en.isCombo &&
      en.CourseName &&
      en.CourseName.includes("Bronze Cross")
  );

  return (
    <FetchCourse>
      <div className="p-6">
        {selectedAccount ? (
          <h1 className="text-3xl font-semibold mb-6">
            {selectedAccount.Name}
          </h1>
        ) : (
          <h1 className="text-3xl font-semibold mb-6">
            Please select a student from the left panel
          </h1>
        )}

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex">
          <div className="flex-1 bg-white shadow p-6 rounded-lg">
            {selectedAccount ? (
              <div>
                {batches.length > 0 ? (
                  <div>
                    {batches.map((enr) => {
                      console.log("Debug each enrollment:", enr);

                      let displayedCourseName = "";
                      let displayedDates = "";
                      let displayedLocation = "";
                      let displayedDaysUntilStart = enr.DaysUntilStart;

                      // If it's a combo enrollment
                      if (enr.isCombo) {
                        // For Bronze Combo
                        if (
                          enr.CourseName &&
                          enr.CourseName.includes("Bronze Combo")
                        ) {
                          displayedCourseName = "Bronze Combo";
                          // If we have a Bronze Cross enrollment
                          if (bronzeCrossEnrollment) {
                            const parsed = parseBronzeClassroom(
                              bronzeCrossEnrollment.Classroom || ""
                            );
                            displayedDates = parsed.date;
                            displayedLocation = parsed.location;
                            displayedDaysUntilStart =
                              bronzeCrossEnrollment.DaysUntilStart;
                          } else {
                            // fallback to parsing the combo's own Classroom
                            const parsed = parseBronzeClassroom(
                              enr.Classroom || ""
                            );
                            displayedDates = parsed.date;
                            displayedLocation = parsed.location;
                          }
                        } else {
                          // Other combo enrollments
                          const parsed = parseCourseName(
                            enr.Registration_Name__c || ""
                          );
                          displayedCourseName = parsed.course || "Untitled Course";
                          displayedDates = parsed.courseDates;
                          displayedLocation = parsed.location;
                        }
                      } else {
                        // Standard enrollment
                        const { courseDates, course, location } = parseCourseName(
                          enr.CourseName
                        );
                        displayedCourseName = course || "Untitled Course";
                        displayedDates = courseDates || enr.CourseDates;
                        displayedLocation = location || enr.Location;
                      }

                      // Refund/reschedule policy info
                      const policyData =
                        policy && getPolicyForCourse(displayedDaysUntilStart, policy);

                      return (
                        <div
                          key={enr.Id}
                          className="card mb-4 p-4 border border-gray-300 rounded-md"
                        >
                          <div className="card-header">
                            <span className="text-[#0070d9] font-bold text-lg">
                              {displayedCourseName}
                            </span>
                          </div>
                          <div className="card-body mt-3">
                            <div className="flex items-center justify-between flex-wrap gap-6 mt-2">
                              <div className="flex items-center gap-6">
                                <div className="flex items-center">
                                  <span className="mr-2">📅</span>
                                  {displayedDates}
                                </div>
                                <div className="flex items-center">
                                  <span className="mr-2">📍</span>
                                  {displayedLocation}
                                </div>
                                <div className="flex items-center">
                                  <span className="mr-2">⏰</span>
                                  {displayedDaysUntilStart < 0
                                    ? "Course has passed"
                                    : formatDays(displayedDaysUntilStart)}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs">
                                {displayedDaysUntilStart >
                                (policy && policy.daysBeforeReschedule) ? (
                                  <>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        console.log(
                                          "Manually building a new enrollments array for:",
                                          enr.Id
                                        );
                                        let newEnrollments = [...selectedEnrollments];
                                        const existingIndex = newEnrollments.findIndex(
                                          (obj) => obj.Id === enr.Id
                                        );
                                        if (existingIndex !== -1) {
                                          newEnrollments = newEnrollments.filter(
                                            (obj) => obj.Id !== enr.Id
                                          );
                                        } else {
                                          newEnrollments.push({ Id: enr.Id });
                                        }
                                        setSelectedEnrollments(newEnrollments);

                                        const courseName =
                                          displayedCourseName ||
                                          enr.CourseName ||
                                          "Unknown course";

                                        console.log(
                                          "Navigating to reschedule with updated enrollments:",
                                          {
                                            oldCourseName: courseName,
                                            oldCourseId: enr.BatchId,
                                            newEnrollments,
                                          }
                                        );

                                        router.push(
                                          `/reschedule?oldCourseName=${encodeURIComponent(
                                            courseName
                                          )}&oldCourseId=${
                                            enr.BatchId
                                          }&enrollmentId=${
                                            enr.Id
                                          }&enrollmentIds=${JSON.stringify(
                                            newEnrollments
                                          )}`
                                        );
                                      }}
                                      className="text-blue-500 underline"
                                    >
                                      Reschedule ({policyData?.reschedule})
                                    </a>
                                    <a href="#" className="text-blue-500 underline">
                                      Refund ({policyData?.refund})
                                    </a>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-blue-300 underline">
                                      Reschedule ({policyData?.reschedule})
                                    </span>
                                    <span className="text-blue-300 underline">
                                      Refund ({policyData?.refund})
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-700">
                    No course batches found for this account.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-700">
                Please select an account to view details.
              </p>
            )}
          </div>
        </div>
      </div>

      {sessionExpired && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="mb-4 text-lg text-center">
              Your session has expired. Please log in again.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login Again
            </button>
          </div>
        </div>
      )}
    </FetchCourse>
  );
}