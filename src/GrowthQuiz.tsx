// Growth Team Archetype Quiz - React Component

import { useState } from "react";

// TypeScript type declarations
type ArchetypeKey =
  | "founder-mage"
  | "silo-fortress"
  | "ritual-ready"
  | "flow-aligned";

type Result = {
  title: string;
  description: string;
  link: string;
  cta: string;
};

const quizData: {
  question: string;
  options: { text: string; archetype: ArchetypeKey }[];
}[] = [
  {
    question: "When a new campaign fails, who owns the analysis?",
    options: [
      { text: "I do, every time 🧙‍♂️", archetype: "founder-mage" },
      { text: "Depends on which team ran it 🧱", archetype: "silo-fortress" },
      { text: "We talk about it in stand-ups 🔁", archetype: "ritual-ready" },
      {
        text: "There's a post-mortem loop we run 🎯",
        archetype: "flow-aligned",
      },
    ],
  },
  {
    question: "How often does your team collaborate across skills?",
    options: [
      { text: "Rarely 🧱", archetype: "silo-fortress" },
      { text: "Only when forced 🧙‍♂️", archetype: "founder-mage" }, // shifted to a different archetype
      { text: "Weekly with some structure 🔁", archetype: "ritual-ready" },
      { text: "Constantly, with role clarity 🎯", archetype: "flow-aligned" },
    ],
  },
  {
    question: "How are growth priorities decided?",
    options: [
      { text: "Whoever shouts loudest 🧙‍♂️", archetype: "founder-mage" },
      { text: "By individual teams 🧱", archetype: "silo-fortress" },
      { text: "We decide in rituals 🔁", archetype: "ritual-ready" },
      { text: "Based on shared KPIs & loops 🎯", archetype: "flow-aligned" },
    ],
  },
  {
    question: "What's your biggest growth bottleneck?",
    options: [
      { text: "My own bandwidth 🧙‍♂️", archetype: "founder-mage" },
      { text: "Cross-team coordination 🧱", archetype: "silo-fortress" },
      { text: "Inconsistent rituals 🔁", archetype: "ritual-ready" },
      { text: "We're scaling and tracking well 🎯", archetype: "flow-aligned" },
    ],
  },
  {
    question: "How aligned does your team feel today?",
    options: [
      { text: "Like I’m dragging everyone 🧙‍♂️", archetype: "founder-mage" },
      { text: "We’re siloed 🧱", archetype: "silo-fortress" },
      { text: "We're mostly aligned 🔁", archetype: "ritual-ready" },
      { text: "Everyone’s in sync 🎯", archetype: "flow-aligned" },
    ],
  },
];

const results: Record<ArchetypeKey, Result> = {
  "founder-mage": {
    title: "🧙‍♂️ Founder-Mage",
    description:
      "You’re the magician. Spells flying, dashboards open—but you’re soloing the raid. Delegate or die.",
    link: "https://www.growthflowengineering.com/founder-mage",
    cta: "Train your squad. You can’t solo this.",
  },
  "silo-fortress": {
    title: "🧱 Silo Fortress",
    description:
      "Your teams are isolated towers. Strong walls, weak bridges. Start cross-skilling before they collapse.",
    link: "https://www.growthflowengineering.com/silo-fortress",
    cta: "Build bridges. Break silos.",
  },
  "ritual-ready": {
    title: "🔁 Ritual-Ready Crew",
    description:
      "The habits are forming. You’re in weekly syncs, but the growth flywheel’s still sluggish.",
    link: "https://www.growthflowengineering.com/ritual-ready",
    cta: "Refine your flywheel rituals.",
  },
  "flow-aligned": {
    title: "🎯 Flow Aligned Org",
    description:
      "Mythical beast detected. Roles are clear, loops are compounding. Just keep the rituals sacred.",
    link: "https://www.growthflowengineering.com/flow-aligned",
    cta: "Keep flowing. Protect the rhythm.",
  },
};

export default function GrowthQuizApp() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<ArchetypeKey, number>>({
    "founder-mage": 0,
    "silo-fortress": 0,
    "ritual-ready": 0,
    "flow-aligned": 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (archetype: ArchetypeKey) => {
    setScores((prev) => ({ ...prev, [archetype]: prev[archetype] + 1 }));
    const next = currentQ + 1;
    if (next < quizData.length) {
      setCurrentQ(next);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return results[top as ArchetypeKey];
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-6">Growth Archetype - Quiz</h1>
      {showResult ? (
        <div className="text-center mt-10">
          <h2 className="text-3xl font-bold mb-2">{getResult().title}</h2>
          <p className="text-xl italic mb-4">{getResult().description}</p>
          <a
            href={getResult().link}
            className="inline-block mt-4 px-6 py-3 text-white font-bold rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getResult().cta}
          </a>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <p className="text-right text-sm mb-2">
            Question {currentQ + 1} of {quizData.length}
          </p>
          <h2 className="text-xl font-semibold mb-6">
            {quizData[currentQ].question}
          </h2>
          <div className="space-y-4">
            {quizData[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.archetype)}
                className="w-full p-4 border rounded-lg hover:bg-gray-100"
              >
                {opt.text}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQ + 1) / quizData.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
