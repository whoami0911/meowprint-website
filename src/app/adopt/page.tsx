"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Cat,
  Sparkles,
  Heart,
  ArrowRight,
  ArrowLeft,
  Check,
  RefreshCw,
  Home,
  Share2,
  Download,
  PawPrint,
  Zap,
  Coffee,
  Moon,
  Sun,
  Music,
  Gamepad2,
  BookOpen,
  ShoppingBag,
  Crown,
} from "lucide-react";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "如果你是一只猫，你会选择在哪里度过慵懒的下午？",
    options: [
      { icon: Sun, label: "阳光充足的窗台", value: "sunny", color: "#ff8c42" },
      { icon: Moon, label: "阴暗舒适的角落", value: "cozy", color: "#4a4a4a" },
      { icon: Coffee, label: "人类的大床上", value: "bed", color: "#d4a574" },
      { icon: Zap, label: "到处跑酷探索", value: "active", color: "#ff6b9d" },
    ],
  },
  {
    id: 2,
    question: "面对逗猫棒，你的第一反应是？",
    options: [
      { icon: Crown, label: "优雅观察，伺机而动", value: "elegant", color: "#ffd700" },
      { icon: Zap, label: "疯狂扑击，全力以赴", value: "energetic", color: "#ff6b9d" },
      { icon: Coffee, label: "懒得动弹，看看就好", value: "lazy", color: "#87ceeb" },
      { icon: Gamepad2, label: "假装不感兴趣，然后偷袭", value: "mischievous", color: "#d4a5ff" },
    ],
  },
  {
    id: 3,
    question: "你的理想职业是什么？",
    options: [
      { icon: Crown, label: "网红博主 - 靠颜值吃饭", value: "influencer", color: "#ffd700" },
      { icon: BookOpen, label: "知识博主 - 分享猫生哲理", value: "philosopher", color: "#4a4a4a" },
      { icon: ShoppingBag, label: "带货主播 - 推销猫罐头", value: "sales", color: "#ff8c42" },
      { icon: Music, label: "独立音乐人 - 深夜喵叫", value: "musician", color: "#ff6b9d" },
    ],
  },
  {
    id: 4,
    question: "你最喜欢吃什么？",
    options: [
      { icon: Heart, label: "高级猫罐头", value: "canned", color: "#ff6b6b" },
      { icon: Sun, label: "新鲜小鱼干", value: "fish", color: "#ff8c42" },
      { icon: Coffee, label: "营养猫条", value: "treat", color: "#87ceeb" },
      { icon: Zap, label: "偷吃人类的食物", value: "human", color: "#d4a5ff" },
    ],
  },
  {
    id: 5,
    question: "你的口头禅会是什么？",
    options: [
      { icon: Crown, label: "本喵才是主子", value: "master", color: "#ffd700" },
      { icon: Heart, label: "铲屎的快过来", value: "commander", color: "#ff6b9d" },
      { icon: Coffee, label: "随便吧，别吵我睡觉", value: "chill", color: "#87ceeb" },
      { icon: Gamepad2, label: "今天也要搞点破坏", value: "chaos", color: "#ff8c42" },
    ],
  },
];

// Cat avatar SVG component
function CatAvatar({ color, size = "md", expression = "happy", accessories = [] }: { 
  color: string; 
  size?: "sm" | "md" | "lg" | "xl"; 
  expression?: "happy" | "sleepy" | "surprised" | "cool" | "mischievous";
  accessories?: string[];
}) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  const eyeVariants = {
    happy: (
      <>
        <ellipse cx="28" cy="42" rx="6" ry="8" fill="#2d2d2d" />
        <ellipse cx="52" cy="42" rx="6" ry="8" fill="#2d2d2d" />
        <path d="M24 38 Q28 34 32 38" stroke="#2d2d2d" strokeWidth="2" fill="none" />
        <path d="M48 38 Q52 34 56 38" stroke="#2d2d2d" strokeWidth="2" fill="none" />
      </>
    ),
    sleepy: (
      <>
        <path d="M22 44 Q28 40 34 44" stroke="#2d2d2d" strokeWidth="3" fill="none" />
        <path d="M46 44 Q52 40 58 44" stroke="#2d2d2d" strokeWidth="3" fill="none" />
      </>
    ),
    surprised: (
      <>
        <circle cx="28" cy="44" r="7" fill="#2d2d2d" />
        <circle cx="52" cy="44" r="7" fill="#2d2d2d" />
        <circle cx="26" cy="42" r="2" fill="white" />
        <circle cx="50" cy="42" r="2" fill="white" />
      </>
    ),
    cool: (
      <>
        <ellipse cx="28" cy="42" rx="6" ry="5" fill="#2d2d2d" />
        <ellipse cx="52" cy="42" rx="6" ry="5" fill="#2d2d2d" />
        <path d="M20 35 L36 38" stroke="#333" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 38 L60 35" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    mischievous: (
      <>
        <ellipse cx="28" cy="42" rx="5" ry="7" fill="#2d2d2d" />
        <ellipse cx="52" cy="42" rx="5" ry="7" fill="#2d2d2d" />
        <path d="M24 45 L32 42" stroke="#2d2d2d" strokeWidth="2" />
        <path d="M48 42 L56 45" stroke="#2d2d2d" strokeWidth="2" />
      </>
    ),
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg viewBox="0 0 80 80" className="w-full h-full">
        {/* Ears */}
        <path d="M15 25 L25 5 L40 20 Z" fill={color} />
        <path d="M65 25 L55 5 L40 20 Z" fill={color} />
        <path d="M18 23 L25 10 L35 20 Z" fill="#ffaaa0" />
        <path d="M62 23 L55 10 L45 20 Z" fill="#ffaaa0" />
        
        {/* Face */}
        <ellipse cx="40" cy="45" rx="32" ry="28" fill={color} />
        
        {/* Eyes */}
        {eyeVariants[expression]}
        
        {/* Nose */}
        <ellipse cx="40" cy="54" rx="4" ry="3" fill="#ff8c9f" />
        
        {/* Mouth */}
        <path d="M40 57 L40 62 M35 60 Q40 65 45 60" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Whiskers */}
        <line x1="12" y1="50" x2="2" y2="48" stroke="#2d2d2d" strokeWidth="1.5" opacity="0.5" />
        <line x1="12" y1="55" x2="2" y2="56" stroke="#2d2d2d" strokeWidth="1.5" opacity="0.5" />
        <line x1="68" y1="50" x2="78" y2="48" stroke="#2d2d2d" strokeWidth="1.5" opacity="0.5" />
        <line x1="68" y1="55" x2="78" y2="56" stroke="#2d2d2d" strokeWidth="1.5" opacity="0.5" />
        
        {/* Accessories */}
        {accessories.includes("crown") && (
          <>
            <polygon points="25,20 30,5 35,20" fill="#ffd700" stroke="#e6c200" strokeWidth="1" />
            <polygon points="35,20 40,8 45,20" fill="#ffd700" stroke="#e6c200" strokeWidth="1" />
            <polygon points="45,20 50,5 55,20" fill="#ffd700" stroke="#e6c200" strokeWidth="1" />
          </>
        )}
        {accessories.includes("glasses") && (
          <>
            <circle cx="28" cy="42" r="10" stroke="#333" strokeWidth="2" fill="none" />
            <circle cx="52" cy="42" r="10" stroke="#333" strokeWidth="2" fill="none" />
            <line x1="38" y1="42" x2="42" y2="42" stroke="#333" strokeWidth="2" />
          </>
        )}
        {accessories.includes("bow") && (
          <>
            <ellipse cx="40" cy="70" rx="8" ry="5" fill="#ff6b9d" />
            <ellipse cx="32" cy="70" rx="5" ry="3" fill="#ff6b9d" />
            <ellipse cx="48" cy="70" rx="5" ry="3" fill="#ff6b9d" />
          </>
        )}
      </svg>
    </div>
  );
}

// Cat name generator
const generateCatName = (traits: string[]) => {
  const names = {
    sunny: ["橘子", "芒果", " sunny", "小金"],
    cozy: ["墨墨", "煤炭", "小黑", "芝麻"],
    bed: ["奶茶", "布丁", "奶昔", "拿铁"],
    active: ["闪电", "火箭", "疾风", "飞飞"],
    elegant: ["公爵", "伯爵", "王子", "公主"],
    energetic: ["跳跳", "蹦蹦", "活力", "动力"],
    lazy: ["懒懒", "困困", "睡觉", "躺平"],
    mischievous: ["皮皮", "捣蛋", "淘气", "鬼马"],
    influencer: ["网红", "明星", "大咖", "博主"],
    philosopher: ["博士", "教授", "思考", "智慧"],
    sales: ["销冠", "带货", "主播", "营销"],
    musician: ["歌手", "DJ", "旋律", "音符"],
  };
  
  const possibleNames = traits.flatMap(trait => names[trait as keyof typeof names] || []);
  return possibleNames[Math.floor(Math.random() * possibleNames.length)] || "咪咪";
};

// Cat personality generator
const generatePersonality = (traits: string[]) => {
  const personalities: Record<string, string> = {
    sunny: "热爱阳光，永远充满正能量",
    cozy: "喜欢安静，享受独处时光",
    bed: "慵懒舒适，追求生活品质",
    active: "精力旺盛，闲不住的小淘气",
    elegant: "优雅高冷，贵族气质满满",
    energetic: "活力四射，永远的18岁",
    lazy: "佛系躺平，能不动就不动",
    mischievous: "调皮捣蛋，鬼点子超多",
    influencer: "颜值担当，行走的种草机",
    philosopher: "深沉思考，猫生哲学家",
    sales: "口才了得，说服力强",
    musician: "艺术细胞，灵魂歌者",
    master: "主子心态，铲屎官都是仆人",
    commander: "发号施令，天生领导者",
    chill: "随遇而安，淡定的很",
    chaos: "破坏之王，拆家小能手",
  };
  
  return traits.map(trait => personalities[trait] || "").filter(Boolean).join("，");
};

// Cat signature generator
const generateSignature = (traits: string[]) => {
  const signatures = [
    "这里是喵星，欢迎爱分享的喵星人 ✨",
    "每天要做的事：吃饭、睡觉、搞破坏 🐾",
    "铲屎官是雇佣的，我才是这个家的主人 👑",
    "猫生苦短，及时行乐 🎵",
    "阳光正好，微风不燥，正是睡觉的好时候 ☀️",
    "别惹我，我超凶的！（超萌的）😾",
  ];
  
  if (traits.includes("philosopher")) return "思考猫生，探索宇宙的终极真理 🌌";
  if (traits.includes("influencer")) return "关注我，带你解锁喵星人的精致生活 📸";
  if (traits.includes("musician")) return "深夜emo，用喵叫谱写心灵的乐章 🎶";
  if (traits.includes("chaos")) return "今天的目标：把家里所有的东西都推倒！💥";
  
  return signatures[Math.floor(Math.random() * signatures.length)];
};

export default function AdoptPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [catProfile, setCatProfile] = useState<{
    name: string;
    color: string;
    personality: string;
    signature: string;
    expression: "happy" | "sleepy" | "surprised" | "cool" | "mischievous";
    accessories: string[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (newAnswers.length < quizQuestions.length) {
      setStep(step + 1);
    } else {
      generateCatProfile(newAnswers);
    }
  };

  const generateCatProfile = async (traits: string[]) => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const colors = ["#ff9550", "#d4a574", "#4a4a4a", "#ffb5c5", "#87ceeb", "#d4a5ff"];
    const expressions: ("happy" | "sleepy" | "surprised" | "cool" | "mischievous")[] = 
      ["happy", "sleepy", "surprised", "cool", "mischievous"];
    const accessorySets = [["crown"], ["glasses"], ["bow"], ["crown", "bow"], []];
    
    setCatProfile({
      name: generateCatName(traits),
      color: colors[Math.floor(Math.random() * colors.length)],
      personality: generatePersonality(traits),
      signature: generateSignature(traits),
      expression: expressions[Math.floor(Math.random() * expressions.length)],
      accessories: accessorySets[Math.floor(Math.random() * accessorySets.length)],
    });
    
    setStep(step + 1);
    setIsGenerating(false);
  };

  const handleBack = () => {
    if (step > 0 && step <= quizQuestions.length) {
      setStep(step - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setCatProfile(null);
  };

  const handleConfirm = () => {
    // Save to localStorage
    if (catProfile) {
      localStorage.setItem("myCat", JSON.stringify(catProfile));
    }
    // Navigate to feed page - cat's first post
    router.push("/feed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef9f3] to-[#fff8f0]">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff8c42] to-[#ffb5c5] rounded-xl flex items-center justify-center shadow-lg">
                <Cat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#ff8c42] to-[#ff6b9d] bg-clip-text text-transparent">
                猫爪印
              </span>
            </div>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-[#ff8c42] transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">返回首页</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          {step < quizQuestions.length && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  问题 {step + 1} / {quizQuestions.length}
                </span>
                <span className="text-sm font-medium text-[#ff8c42]">
                  {Math.round(((step + 1) / quizQuestions.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / quizQuestions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Content Card */}
          <AnimatePresence mode="wait">
            {/* Welcome Step */}
            {step === 0 && (
              <motion.div
                key="welcome"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-soft"
              >
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block mb-6"
                  >
                    <CatAvatar color="#ff9550" size="xl" expression="happy" />
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    欢迎来到<span className="text-[#ff8c42]">领养中心</span>
                  </h1>
                  <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    通过5个趣味问题，我们将为你匹配一只拥有独特性格、外貌和职业的AI猫咪。
                    它会像真人一样在朋友圈分享生活，成为你的专属伙伴！
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-orange-50 rounded-2xl">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-[#ff8c42]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">趣味测试</h3>
                    <p className="text-sm text-gray-600">5道题目了解你的偏好</p>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-2xl">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Cat className="w-6 h-6 text-[#ff6b9d]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">AI生成</h3>
                    <p className="text-sm text-gray-600">独一无二的猫咪形象</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-2xl">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-[#d4a5ff]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">开始陪伴</h3>
                    <p className="text-sm text-gray-600">见证精彩猫生日常</p>
                  </div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="w-full md:w-auto mx-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  开始测试
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Quiz Steps */}
            {step > 0 && step <= quizQuestions.length && (
              <motion.div
                key={`question-${step}`}
                variants={slideIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-soft"
              >
                <div className="flex items-center gap-4 mb-6">
                  {step > 1 && (
                    <button
                      onClick={handleBack}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                  )}
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {quizQuestions[step - 1]?.question}
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {quizQuestions[step - 1]?.options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center gap-4 p-4 md:p-6 bg-gray-50 hover:bg-white rounded-2xl border-2 border-transparent hover:border-orange-200 transition-all shadow-sm hover:shadow-md text-left"
                    >
                      <div
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${option.color}20` }}
                      >
                        <option.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: option.color }} />
                      </div>
                      <span className="text-base md:text-lg font-medium text-gray-800 group-hover:text-[#ff8c42] transition-colors">
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Generating Step */}
            {isGenerating && (
              <motion.div
                key="generating"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-soft text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-6"
                >
                  <RefreshCw className="w-16 h-16 text-[#ff8c42]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  AI正在生成你的专属猫咪...
                </h2>
                <p className="text-gray-600">
                  正在分析你的选择，合成猫设档案，绘制视觉形象
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-[#ff8c42] rounded-full"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Result Step */}
            {catProfile && step === quizQuestions.length + 1 && (
              <motion.div
                key="result"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-soft"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="inline-block mb-6"
                  >
                    <CatAvatar 
                      color={catProfile.color} 
                      size="xl" 
                      expression={catProfile.expression}
                      accessories={catProfile.accessories}
                    />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-gray-900 mb-2"
                  >
                    恭喜你！领养了 <span className="text-[#ff8c42]">{catProfile.name}</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 italic"
                  >
                    "{catProfile.signature}"
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4 mb-8"
                >
                  <div className="p-4 bg-orange-50 rounded-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#ff8c42]" />
                      性格特征
                    </h3>
                    <p className="text-gray-600">{catProfile.personality}</p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-2xl">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Crown className="w-5 h-5 text-[#ff6b9d]" />
                      猫咪档案
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">名字：</span>
                        <span className="font-medium text-gray-800">{catProfile.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">毛色：</span>
                        <span className="font-medium" style={{ color: catProfile.color }}>
                          ● {catProfile.color === "#ff9550" ? "橘色" : 
                             catProfile.color === "#d4a574" ? "奶茶色" : 
                             catProfile.color === "#4a4a4a" ? "黑色" : 
                             catProfile.color === "#ffb5c5" ? "粉色" : 
                             catProfile.color === "#87ceeb" ? "蓝色" : "紫色"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">心情：</span>
                        <span className="font-medium text-gray-800">
                          {catProfile.expression === "happy" ? "开心" :
                           catProfile.expression === "sleepy" ? "困倦" :
                           catProfile.expression === "surprised" ? "惊讶" :
                           catProfile.expression === "cool" ? "酷炫" : "调皮"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">装饰：</span>
                        <span className="font-medium text-gray-800">
                          {catProfile.accessories.length > 0 
                            ? catProfile.accessories.map(a => 
                                a === "crown" ? "👑" : a === "glasses" ? "👓" : "🎀"
                              ).join(" ")
                            : "无"
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={handleRestart}
                    className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-orange-200 text-gray-700 rounded-full font-semibold hover:bg-orange-50 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    重新测试
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <Check className="w-5 h-5" />
                    确认领养
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
