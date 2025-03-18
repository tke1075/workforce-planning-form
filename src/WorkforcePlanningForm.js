import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Strategic Alignment",
    levels: ["Ad Hoc", "Basic Alignment", "Integrated", "Strategic Partner"],
    descriptions: [
      "Workforce planning is reactive with no alignment to strategy.",
      "Some efforts to align workforce planning with strategy exist.",
      "Workforce planning is generally aligned with strategy.",
      "Workforce planning is fully integrated into strategic decisions."
    ],
    owners: ["HR Director", "HR Business Partner", "Chief HR Officer", "CEO"]
  },
  {
    name: "Leadership Engagement",
    levels: ["Minimal Involvement", "Limited Engagement", "Active Support", "Full Integration"],
    descriptions: [
      "Leaders are not involved in workforce planning.",
      "Some leaders participate but inconsistently.",
      "Leaders actively support workforce planning.",
      "Leaders fully integrate workforce planning into decision-making."
    ],
    owners: ["HR Director", "HR Business Partner", "Chief HR Officer", "CEO"]
  },
  {
    name: "Data-Driven Decision Making",
    levels: ["No Data Usage", "Basic Reports", "Advanced Analytics", "Predictive Insights"],
    descriptions: [
      "Decisions are made without workforce data.",
      "Basic reporting is used occasionally.",
      "Advanced analytics support workforce planning.",
      "Predictive insights drive workforce strategy."
    ],
    owners: ["HR Analyst", "HR Business Partner", "Chief Data Officer", "CEO"]
  },
  {
    name: "Talent Management",
    levels: ["Reactive Hiring", "Basic Workforce Planning", "Talent Strategy", "Proactive Workforce Design"],
    descriptions: [
      "Hiring is done reactively with no long-term plan.",
      "Workforce planning exists but is not comprehensive.",
      "A structured talent strategy is in place.",
      "Workforce planning is fully integrated and proactive."
    ],
    owners: ["Recruitment Manager", "HR Business Partner", "Chief Talent Officer", "CEO"]
  },
  {
    name: "Cross-Functional Collaboration",
    levels: ["Siloed Teams", "Limited Collaboration", "Integrated Approach", "Strategic Partnership"],
    descriptions: [
      "Departments work independently with no collaboration.",
      "Some departments collaborate, but it's inconsistent.",
      "Workforce planning is integrated across multiple teams.",
      "Cross-functional collaboration drives workforce strategy."
    ],
    owners: ["Department Heads", "HR Business Partner", "Strategy Director", "COO"]
  },
  {
    name: "Resource Optimization",
    levels: ["Ad Hoc Budgeting", "Basic Resource Planning", "Efficient Allocation", "Strategic Resource Management"],
    descriptions: [
      "Resources are allocated reactively with no long-term plan.",
      "Basic budgeting exists but lacks strategic workforce planning.",
      "Workforce resources are allocated based on data-driven decisions.",
      "Resource planning is fully integrated with workforce strategy."
    ],
    owners: ["Finance Manager", "HR Business Partner", "Operations Director", "CFO"]
  },
  {
    name: "Continuous Improvement",
    levels: ["No Review Process", "Basic Performance Tracking", "Structured Improvement Plans", "Continuous Workforce Optimization"],
    descriptions: [
      "There is no formal review process for workforce planning.",
      "Basic workforce performance tracking is in place but lacks strategy.",
      "Workforce performance reviews lead to structured improvement plans.",
      "Continuous workforce planning improvements drive organizational success."
    ],
    owners: ["HR Analyst", "HR Manager", "Workforce Strategy Lead", "Chief Operations Officer"]
  }
];

export default function WorkforcePlanningForm() {
  const [responses, setResponses] = useState({});
  const [email, setEmail] = useState("");

  const handleSelectChange = (category, value) => {
    setResponses({ ...responses, [category]: value });
  };

  const handleEmailResults = async () => {
    const data = {
      email,
      responses,
    };

    try {
      await axios.post("YOUR_BACKEND_API/send-email", data);
      alert("Results emailed successfully!");
    } catch (error) {
      console.error("Error sending email", error);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Workforce Planning Self-Assessment</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 rounded-md w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {categories.map((category) => (
        <div key={category.name} className="mb-4">
          <label className="block font-semibold">{category.name}</label>
          <select
            className="border p-2 rounded-md w-full"
            onChange={(e) => handleSelectChange(category.name, e.target.value)}
          >
            <option value="">Select level</option>
            {category.levels.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
        </div>
      ))}
      <Button
        onClick={handleEmailResults}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Email My Results
      </Button>
    </div>
  );
}


