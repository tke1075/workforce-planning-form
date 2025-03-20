import { useState } from "react";
import axios from "axios";

export default function WorkforcePlanningForm() {
  const [responses, setResponses] = useState({});
  const [email, setEmail] = useState("");

  const categories = [
    {
      name: "Strategic Alignment",
      levels: ["Ad Hoc", "Basic Alignment", "Integrated", "Strategic Partner"],
      descriptions: [
        "Workforce planning is reactive with no alignment to strategy.",
        "Some efforts to align workforce planning with strategy exist.",
        "Workforce planning is generally aligned with strategy.",
        "Workforce planning is fully integrated into strategic decisions."
      ]
    },
    {
      name: "Leadership Engagement",
      levels: ["Minimal Involvement", "Limited Engagement", "Active Support", "Full Integration"],
      descriptions: [
        "Leaders are not involved in workforce planning.",
        "Some leaders participate but inconsistently.",
        "Leaders actively support workforce planning.",
        "Leaders fully integrate workforce planning into decision-making."
      ]
    },
    {
      name: "Data-Driven Decision Making",
      levels: ["No Data Usage", "Basic Reports", "Advanced Analytics", "Predictive Insights"],
      descriptions: [
        "Decisions are made without workforce data.",
        "Basic reporting is used occasionally.",
        "Advanced analytics support workforce planning.",
        "Predictive insights drive workforce strategy."
      ]
    },
    {
      name: "Talent Management",
      levels: ["Reactive Hiring", "Basic Workforce Planning", "Talent Strategy", "Proactive Workforce Design"],
      descriptions: [
        "Hiring is done reactively with no long-term plan.",
        "Workforce planning exists but is not comprehensive.",
        "A structured talent strategy is in place.",
        "Workforce planning is fully integrated and proactive."
      ]
    },
    {
      name: "Cross-Functional Collaboration",
      levels: ["Siloed Teams", "Limited Collaboration", "Integrated Approach", "Strategic Partnership"],
      descriptions: [
        "Departments work independently with no collaboration.",
        "Some departments collaborate, but it's inconsistent.",
        "Workforce planning is integrated across multiple teams.",
        "Cross-functional collaboration drives workforce strategy."
      ]
    },
    {
      name: "Resource Optimization",
      levels: ["Ad Hoc Budgeting", "Basic Resource Planning", "Efficient Allocation", "Strategic Resource Management"],
      descriptions: [
        "Resources are allocated reactively with no long-term plan.",
        "Basic budgeting exists but lacks strategic workforce planning.",
        "Workforce resources are allocated based on data-driven decisions.",
        "Resource planning is fully integrated with workforce strategy."
      ]
    },
    {
      name: "Continuous Improvement",
      levels: ["No Review Process", "Basic Performance Tracking", "Structured Improvement Plans", "Continuous Workforce Optimization"],
      descriptions: [
        "There is no formal review process for workforce planning.",
        "Basic workforce performance tracking is in place but lacks strategy.",
        "Workforce performance reviews lead to structured improvement plans.",
        "Continuous workforce planning improvements drive organizational success."
      ]
    }
  ];

  const handleSelectChange = (category, value) => {
    setResponses({ ...responses, [category]: value });
  };

  const handleEmailResults = async () => {
    const data = { email, responses };
    try {
      await axios.post("http://localhost:5050/api/send-email", data);
      alert("Results emailed successfully!");
    } catch (error) {
      console.error("Error sending email", error);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-700">Workforce Planning Self-Assessment</h1>
      <p className="text-center text-gray-600 mb-6">Evaluate your organization's workforce planning capabilities.</p>

      {categories.map((category) => (
        <div key={category.name} className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
          <label className="text-lg font-semibold text-gray-800">{category.name}</label>
          <p className="text-sm text-gray-600 mb-2">Select your current level:</p>
          <select
            className="border p-2 rounded-md w-full bg-white shadow-sm"
            onChange={(e) => handleSelectChange(category.name, e.target.value)}
          >
            <option value="">Select a level</option>
            {category.levels.map((level, index) => (
              <option key={index} value={level}>
                {level} - {category.descriptions[index]}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Moved Email Input Below All Categories */}
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 rounded-md w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleEmailResults}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-blue-700 transition-all"
      >
        Email My Results
      </button>
    </div>
  );
}

