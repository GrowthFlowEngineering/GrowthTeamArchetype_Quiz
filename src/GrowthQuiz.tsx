// Growth Team Archetype Quiz - React Component

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
};

const quizData = [
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
      { text: "Only when forced 🧱", archetype: "silo-fortress" },
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
  },
  "silo-fortress": {
    title: "🧱 Silo Fortress",
    description:
      "Your teams are isolated towers. Strong walls, weak bridges. Start cross-skilling before they collapse.",
    link: "https://www.growthflowengineering.com/silo-fortress",
  },
  "ritual-ready": {
    title: "🔁 Ritual-Ready Crew",
    description:
      "The habits are forming. You’re in weekly syncs, but the growth flywheel’s still sluggish.",
    link: "https://www.growthflowengineering.com/ritual-ready",
  },
  "flow-aligned": {
    title: "🎯 Flow Aligned Org",
    description:
      "Mythical beast detected. Roles are clear, loops are compounding. Just keep the rituals sacred.",
    link: "https://www.growthflowengineering.com/flow-aligned",
  },
};

const playClickSound = () => {
  const audio = new Audio(
    "https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3"
  );
  audio.volume = 0.5;
  audio.play();
};

export default function GrowthQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const scroll = document.querySelector("html");
    scroll?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentQ, showResult]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
    script.async = true;
    document.head.appendChild(script);
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      // @ts-ignore
      window.dataLayer.push(args);
    }
    // @ts-ignore
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-XXXXXXXXXX");
  }, []);

  const handleAnswer = (archetype: ArchetypeKey) => {
    playClickSound();
    setScores((prev) => ({
      ...prev,
      [archetype]: (prev[archetype] || 0) + 1,
    }));

    const nextQ = currentQ + 1;
    if (nextQ < quizData.length) {
      setCurrentQ(nextQ);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const getResult = () => {
    if (!scores || Object.keys(scores).length === 0) return null;
    const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    return results[top[0] as ArchetypeKey];
  };

  const Background = () => (
    <>
      <meta
        name="title"
        content="Growth Team Archetype Quiz | GrowthFlowEngineering"
      />
      <meta
        name="description"
        content="Discover what kind of team you’re running — from the 🧙‍♂️ Founder-Mage to the 🎯 Flow-Aligned Org."
      />
      <meta property="og:title" content="Growth Team Archetype Quiz" />
      <meta
        property="og:description"
        content="Take this 60-second quiz and find out your team’s real operating mode."
      />
      <meta
        property="og:image"
        content="https://www.growthflowengineering.com/assets/quiz-preview.png"
      />
      <meta
        property="og:url"
        content="https://www.growthflowengineering.com/quiz"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <div
        className="fixed inset-0 z-[-1] opacity-5 bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: "url('/logo-watermark.png')" }}
      ></div>
    </>
  );

  if (showResult) {
    const result = getResult();
    if (!result) {
      return (
        <div className="p-8 max-w-screen-sm mx-auto text-center text-red-500">
          <p>Something went wrong. Please restart the quiz.</p>
        </div>
      );
    }

    const shareUrl = encodeURIComponent(result.link);
    const shareText = encodeURIComponent(
      `My team's Growth Archetype is: ${result.title}! →`
    );

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 max-w-screen-sm mx-auto relative"
      >
        <Background />
        <h2 className="text-3xl font-bold mb-4 text-center animate-pulse">
          {result.title}
        </h2>
        <p className="mb-4 text-lg text-center italic">{result.description}</p>
        <div className="flex justify-center mb-4">
          <a
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
          >
            Align your team with the Growth Skill Diagnostics Kit
          </a>
        </div>
        <div className="text-center space-y-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline block"
          >
            Share on Twitter →
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline block"
          >
            Share on LinkedIn →
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-600 hover:underline block"
          >
            Share on WhatsApp →
          </a>
        </div>
      </motion.div>
    );
  }

  if (!quizData || !Array.isArray(quizData) || !quizData[currentQ]) {
    return (
      <div className="p-8 max-w-screen-sm mx-auto text-center text-red-500">
        <p>Error loading question. Please refresh or check the quiz data.</p>
      </div>
    );
  }

  const q = quizData[currentQ];
  const progress = ((currentQ + 1) / quizData.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-8 max-w-screen-sm mx-auto relative"
    >
      <Background />
      <div className="text-sm text-gray-500 mb-2 text-right">
        Question {currentQ + 1} of {quizData.length}
      </div>
      <h2 className="text-xl font-bold mb-4 text-center">{q.question}</h2>
      <div className="space-y-4 mb-4">
        {q.options.map((opt, idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.95, rotate: -1 }}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-white border border-gray-300 px-4 py-3 rounded-xl hover:bg-purple-50 transition"
            onClick={() => handleAnswer(opt.archetype as ArchetypeKey)}
          >
            {opt.text}
          </motion.button>
        ))}
      </div>
      {currentQ > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={handleBack}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
        </div>
      )}
      <div className="w-full h-2 mt-6 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6 }}
        ></motion.div>
      </div>
    </motion.div>
  );
}
