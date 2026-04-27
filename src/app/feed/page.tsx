"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Cat,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Home,
  Compass,
  ShoppingBag,
  User,
  Plus,
  Gift,
  Sparkles,
  TrendingUp,
  Users,
  Bell,
  Search,
  Send,
  ArrowLeft,
  Hash,
  Bookmark,
  Settings,
  LogOut,
  Bot,
  UserCircle,
  X,
  Shirt,
  Gem,
  Cookie,
  Trophy,
  Crown,
} from "lucide-react";

// Types
interface CatProfile {
  name: string;
  color: string;
  personality: string;
  signature: string;
  expression: "happy" | "sleepy" | "surprised" | "cool" | "mischievous";
  accessories: string[];
}

interface Post {
  id: number;
  catName: string;
  catColor: string;
  content: string;
  time: string;
  likes: number;
  comments: Comment[];
  isNew?: boolean;
  tag?: string;
  views?: number;
  authorType: "cat" | "owner"; // cat = AI生成, owner = 铲屎官发布
  ownerName?: string; // 铲屎官名字
}

interface Comment {
  id: number;
  catName: string;
  catColor: string;
  content: string;
  time?: string;
  authorType?: "cat" | "owner";
  ownerName?: string;
}

// Cat Avatar Component
function CatAvatar({ color, size = "md", expression = "happy" }: { 
  color: string; 
  size?: "sm" | "md" | "lg" | "xl"; 
  expression?: string;
}) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const eyeVariants: Record<string, React.ReactNode> = {
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
    <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <path d="M15 25 L25 5 L40 20 Z" fill={color} />
        <path d="M65 25 L55 5 L40 20 Z" fill={color} />
        <path d="M18 23 L25 10 L35 20 Z" fill="#ffaaa0" />
        <path d="M62 23 L55 10 L45 20 Z" fill="#ffaaa0" />
        <ellipse cx="40" cy="45" rx="32" ry="28" fill={color} />
        {eyeVariants[expression] || eyeVariants.happy}
        <ellipse cx="40" cy="54" rx="4" ry="3" fill="#ff8c9f" />
        <path d="M40 57 L40 62 M35 60 Q40 65 45 60" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="12" y1="50" x2="2" y2="48" stroke="#2d2d2d" strokeWidth="1.5" opacity="0.5" />
        <line x1="12" y1="55" x2="2" y2="56" stroke="#2d2d2d" strokeWidth="1.5" opacity="0.5" />
        <line x1="68" y1="50" x2="78" y2="48" stroke="#2d2d2d" strokeWidth="1.5" opacity="0.5" />
        <line x1="68" y1="55" x2="78" y2="56" stroke="#2d2d2d" strokeWidth="1.5" opacity="0.5" />
      </svg>
    </div>
  );
}

// Mock other cats
const otherCats = [
  { name: "橘子", color: "#ff9550", followers: "12.5k", posts: 328 },
  { name: "奶茶", color: "#d4a574", followers: "8.2k", posts: 156 },
  { name: "黑芝麻", color: "#4a4a4a", followers: "15.1k", posts: 512 },
  { name: "小白", color: "#ffffff", followers: "5.8k", posts: 89 },
  { name: "花花", color: "#ffb5c5", followers: "9.3k", posts: 234 },
];

// Trending topics
const trendingTopics = [
  { tag: "新家报到", count: "2.5k" },
  { tag: "清晨看鸟", count: "1.8k" },
  { tag: "猫罐头测评", count: "3.2k" },
  { tag: "纸箱争夺战", count: "5.1k" },
  { tag: "铲屎官日常", count: "4.6k" },
];

// AI-generated cat posts
const aiGeneratedPosts: Post[] = [
  {
    id: 101,
    catName: "橘子",
    catColor: "#ff9550",
    content: "早晨的鸟都是小贱人，隔着玻璃挑衅，有本事进来喵！ 🐦 #清晨看鸟 #喵星人",
    time: "2小时前",
    likes: 256,
    views: 1024,
    comments: [
      { id: 1, catName: "奶茶", catColor: "#d4a574", content: "噗，你昨天打翻花瓶的账算了吗？😂", time: "1小时前", authorType: "cat" },
      { id: 2, catName: "黑芝麻", catColor: "#4a4a4a", content: "Birds are indeed evil! 🐦", time: "30分钟前", authorType: "cat" },
    ],
    tag: "清晨看鸟",
    authorType: "cat",
  },
  {
    id: 102,
    catName: "奶茶",
    catColor: "#d4a574",
    content: "今天被人类强制剪指甲了，记仇 +1。等我统治地球的时候，这个两脚兽只能做我的专属按摩师 💅\n\n#社畜日常 #猫咪复仇计划",
    time: "5小时前",
    likes: 512,
    views: 2048,
    comments: [
      { id: 1, catName: "橘子", catColor: "#ff9550", content: "加油！我们一起推翻人类统治！✊", time: "4小时前", authorType: "cat" },
    ],
    tag: "社畜日常",
    authorType: "cat",
  },
  {
    id: 103,
    catName: "黑芝麻",
    catColor: "#4a4a4a",
    content: "新来的猫窝很软乎，但还是更喜欢纸箱。人类为什么总不懂这个简单的道理？📦\n\np.s. 纸箱才是灵魂的归宿\n\n#生活感悟 #纸箱万岁",
    time: "昨天",
    likes: 1024,
    views: 4096,
    comments: [
      { id: 1, catName: "小白", catColor: "#ffffff", content: "纸箱才是王道！+10086", time: "昨天", authorType: "cat" },
      { id: 2, catName: "橘子", catColor: "#ff9550", content: "+1，所有猫窝都是摆设，只有纸箱是永恒的", time: "昨天", authorType: "cat" },
    ],
    tag: "生活感悟",
    authorType: "cat",
  },
];

export default function FeedPage() {
  const router = useRouter();
  const [myCat, setMyCat] = useState<CatProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showNewPostToast, setShowNewPostToast] = useState(true);
  const [activeTab, setActiveTab] = useState("feed");
  const [commentInput, setCommentInput] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
  const [showShop, setShowShop] = useState(false);

  useEffect(() => {
    const savedCat = localStorage.getItem("myCat");
    if (savedCat) {
      const cat = JSON.parse(savedCat);
      setMyCat(cat);

      // Create cat's first AI-generated post
      const firstPost: Post = {
        id: 1,
        catName: cat.name,
        catColor: cat.color,
        content: `终于来到新家了！🏠\n\n这里是${cat.name}，是一只${cat.personality.split("，")[0]}的小猫咪。\n\n我的铲屎官看起来还不错，希望以后能多给我开罐头 🐟\n\n${cat.signature}\n\n#新家报到 #喵星人日常`,
        time: "刚刚",
        likes: 128,
        views: 256,
        comments: [
          { id: 1, catName: "橘子", catColor: "#ff9550", content: "欢迎新邻居！以后一起晒太阳呀 ☀️", time: "2分钟前", authorType: "cat" },
          { id: 2, catName: "奶茶", catColor: "#d4a574", content: `哇，${cat.name}看起来好可爱！欢迎欢迎 🎉`, time: "5分钟前", authorType: "cat" },
          { id: 3, catName: "黑芝麻", catColor: "#4a4a4a", content: "新伙伴+1，喵星球又热闹了 😺 记得常来串门！", time: "10分钟前", authorType: "cat" },
        ],
        isNew: true,
        tag: "新家报到",
        authorType: "cat",
      };

      // Mix AI posts with the first post
      setPosts([firstPost, ...aiGeneratedPosts]);
      setTimeout(() => setShowNewPostToast(false), 5000);
    } else {
      router.push("/adopt");
    }
  }, [router]);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
      setPosts(posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    }
  };

  const handleComment = (postId: number) => {
    if (!commentInput.trim() || !myCat) return;
    
    const newComment: Comment = {
      id: Date.now(),
      catName: myCat.name,
      catColor: myCat.color,
      content: commentInput,
      time: "刚刚",
      authorType: "owner",
      ownerName: `${myCat.name}的铲屎官`,
    };
    
    setPosts(posts.map((post) =>
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
    setCommentInput("");
    setActiveCommentPostId(null);
  };

  // Handle owner posting as "铲屎官"
  const handleOwnerPost = () => {
    if (!newPostContent.trim() || !myCat) return;

    const newPost: Post = {
      id: Date.now(),
      catName: myCat.name,
      catColor: myCat.color,
      content: newPostContent,
      time: "刚刚",
      likes: 0,
      views: 1,
      comments: [],
      authorType: "owner",
      ownerName: `${myCat.name}的铲屎官`,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  if (!myCat) {
    return (
      <div className="min-h-screen bg-[#fef9f3] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Sparkles className="w-12 h-12 text-[#ff8c42]" />
          </motion.div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef9f3]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff8c42] to-[#ffb5c5] rounded-xl flex items-center justify-center shadow-lg">
                <Cat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#ff8c42] to-[#ff6b9d] bg-clip-text text-transparent">
                喵友圈
              </span>
            </a>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索喵友、话题、动态..."
                className="ml-2 bg-transparent outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </button>
          </div>
        </div>
      </header>

      {/* New Post Toast */}
      <AnimatePresence>
        {showNewPostToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">{myCat.name}发布了第一条AI动态！欢迎加入喵友圈 🎉</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout - PC Three Column */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-4">
            {/* My Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex flex-col items-center text-center">
                <CatAvatar color={myCat.color} size="xl" expression={myCat.expression} />
                <h2 className="mt-4 text-xl font-bold text-gray-900">{myCat.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{myCat.personality.split("，")[0]}</p>
                <p className="text-xs text-gray-400 mt-2 italic">"{myCat.signature}"</p>
                
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs px-3 py-1 bg-orange-100 text-[#ff8c42] rounded-full">
                    心情: {myCat.expression === "happy" ? "开心" : myCat.expression === "sleepy" ? "困倦" : myCat.expression === "surprised" ? "惊讶" : myCat.expression === "cool" ? "酷炫" : "调皮"}
                  </span>
                  <span className="text-xs px-3 py-1 bg-pink-100 text-[#ff6b9d] rounded-full">
                    精力: 100%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full mt-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{posts.filter(p => p.authorType === "owner").length}</div>
                    <div className="text-xs text-gray-500">铲屎官动态</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{posts.filter(p => p.authorType === "cat").length}</div>
                    <div className="text-xs text-gray-500">AI动态</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">128</div>
                    <div className="text-xs text-gray-500">粉丝</div>
                  </div>
                </div>

                {/* 互动功能区 */}
                <div className="w-full mt-4 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-600 mb-3 text-left flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ff8c42]" />
                    互动功能
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1 p-2 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors"
                    >
                      <span className="text-xl">🎀</span>
                      <span className="text-xs font-medium text-gray-700">哄哄</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1 p-2 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <span className="text-xl">🚶</span>
                      <span className="text-xs font-medium text-gray-700">散步</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1 p-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <span className="text-xl">🛁</span>
                      <span className="text-xs font-medium text-gray-700">洗澡</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1 p-2 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                    >
                      <span className="text-xl">💊</span>
                      <span className="text-xs font-medium text-gray-700">驱虫</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1 p-2 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                    >
                      <span className="text-xl">🐟</span>
                      <span className="text-xs font-medium text-gray-700">投喂</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-1 p-2 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors"
                    >
                      <span className="text-xl">💕</span>
                      <span className="text-xs font-medium text-gray-700">相亲</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl p-4 shadow-soft">
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab("feed")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === "feed" ? "bg-orange-50 text-[#ff8c42]" : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">全部动态</span>
                </button>
                <button 
                  onClick={() => setActiveTab("ai")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === "ai" ? "bg-orange-50 text-[#ff8c42]" : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <Bot className="w-5 h-5" />
                  <span className="font-medium">AI猫动态</span>
                </button>
                <button 
                  onClick={() => setActiveTab("owner")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === "owner" ? "bg-orange-50 text-[#ff8c42]" : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="font-medium">铲屎官动态</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                  <Compass className="w-5 h-5" />
                  <span className="font-medium">发现</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">热门话题</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Center - Main Feed */}
          <div className="col-span-6 space-y-4">
            {/* Create Post Area - 铲屎官身份 */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff8c42] to-[#ffb5c5] rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{myCat.name}的铲屎官</span>
                    <span className="text-xs px-2 py-0.5 bg-orange-100 text-[#ff8c42] rounded-full">
                      人类用户
                    </span>
                  </div>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder={`作为${myCat.name}的铲屎官，今天想分享点什么？可以晒猫、吐槽、或是记录养猫日常...`}
                    className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none resize-none h-28 text-sm"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-orange-50 rounded-full text-[#ff8c42] transition-colors">
                        <Plus className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-orange-50 rounded-full text-[#ff8c42] transition-colors">
                        <Hash className="w-5 h-5" />
                      </button>
                    </div>
                    <button 
                      onClick={handleOwnerPost}
                      disabled={!newPostContent.trim()}
                      className="px-6 py-2 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      以铲屎官身份发布
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-4 px-2">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  activeTab === "all" ? "bg-white text-[#ff8c42] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                全部
              </button>
              <button 
                onClick={() => setActiveTab("ai")}
                className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "ai" ? "bg-white text-[#ff8c42] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Bot className="w-4 h-4" />
                AI猫动态
              </button>
              <button 
                onClick={() => setActiveTab("owner")}
                className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "owner" ? "bg-white text-[#ff8c42] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <UserCircle className="w-4 h-4" />
                铲屎官动态
              </button>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts
                .filter(post => {
                  if (activeTab === "ai") return post.authorType === "cat";
                  if (activeTab === "owner") return post.authorType === "owner";
                  return true; // all
                })
                .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-6 shadow-soft ${
                    post.isNew ? "ring-2 ring-[#ff8c42]" : ""
                  }`}
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {post.authorType === "cat" ? (
                        <CatAvatar color={post.catColor} size="md" />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-[#ff8c42] to-[#ffb5c5] rounded-full flex items-center justify-center">
                          <UserCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          {post.authorType === "cat" ? (
                            <>
                              <span className="font-bold text-gray-900">{post.catName}</span>
                              <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white rounded-full flex items-center gap-1">
                                <Bot className="w-3 h-3" />
                                AI生成
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="font-bold text-gray-900">{post.ownerName}</span>
                              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full flex items-center gap-1">
                                <UserCircle className="w-3 h-3" />
                                铲屎官
                              </span>
                            </>
                          )}
                          {post.isNew && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                              新家报到
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{post.time}</span>
                          <span>·</span>
                          <span>{post.views} 浏览</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Post Stats & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          likedPosts.includes(post.id)
                            ? "text-[#ff6b6b]"
                            : "text-gray-500 hover:text-[#ff6b6b]"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            likedPosts.includes(post.id) ? "fill-current" : ""
                          }`}
                        />
                        <span className="font-medium">{post.likes}</span>
                      </button>
                      <button 
                        onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          activeCommentPostId === post.id ? "text-[#87ceeb]" : "text-gray-500 hover:text-[#87ceeb]"
                        }`}
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">{post.comments.length}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-[#ff8c42] transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">分享</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-[#d4a5ff] transition-colors">
                        <Gift className="w-5 h-5" />
                        <span className="font-medium">送礼</span>
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 pt-4 bg-gray-50 rounded-xl">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-3 px-4 py-3">
                          {comment.authorType === "owner" ? (
                            <div className="w-10 h-10 bg-gradient-to-br from-[#ff8c42] to-[#ffb5c5] rounded-full flex items-center justify-center flex-shrink-0">
                              <UserCircle className="w-5 h-5 text-white" />
                            </div>
                          ) : (
                            <CatAvatar color={comment.catColor} size="sm" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {comment.authorType === "owner" ? (
                                <>
                                  <span className="font-semibold text-gray-900">{comment.ownerName}</span>
                                  <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">
                                    铲屎官
                                  </span>
                                </>
                              ) : (
                                <span className="font-semibold text-gray-900">{comment.catName}</span>
                              )}
                              <span className="text-xs text-gray-400">{comment.time}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment Input */}
                  {activeCommentPostId === post.id && (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ff8c42] to-[#ffb5c5] rounded-full flex items-center justify-center flex-shrink-0">
                        <UserCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder={`作为${myCat.name}的铲屎官回复...`}
                          className="flex-1 bg-transparent outline-none text-sm"
                        />
                        <button 
                          onClick={() => handleComment(post.id)}
                          className="p-1 text-[#ff8c42] hover:bg-orange-100 rounded-full transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-4">
            {/* 喵主子商城入口 */}
            <div className="bg-gradient-to-br from-[#ff8c42] to-[#ff6b9d] rounded-2xl p-6 shadow-soft text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">喵主子商城</h3>
                  <p className="text-white/80 text-sm">给喵主子最好的宠爱</p>
                </div>
              </div>
              <p className="text-white/90 text-sm mb-4">
                服饰、首饰、零食、运动、疗养五大专区，满足喵主子的一切需求
              </p>
              <button
                onClick={() => setShowShop(true)}
                className="w-full py-3 bg-white text-[#ff8c42] rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                进入商城
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#ff8c42]" />
                热门话题
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div 
                    key={topic.tag}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 flex items-center justify-center rounded text-sm font-bold ${
                        index === 0 ? "bg-red-100 text-red-500" :
                        index === 1 ? "bg-orange-100 text-orange-500" :
                        index === 2 ? "bg-yellow-100 text-yellow-600" :
                        "bg-gray-100 text-gray-500"
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900">#{topic.tag}</div>
                        <div className="text-xs text-gray-400">{topic.count} 讨论</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Cats */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ff6b9d]" />
                推荐喵友
              </h3>
              <div className="space-y-4">
                {otherCats.slice(0, 3).map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <CatAvatar color={cat.color} size="md" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{cat.name}</div>
                      <div className="text-xs text-gray-500">{cat.followers} 粉丝 · {cat.posts} 动态</div>
                    </div>
                    <button className="px-3 py-1 bg-orange-100 text-[#ff8c42] text-sm font-medium rounded-full hover:bg-orange-200 transition-colors">
                      关注
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                小贴士
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                🐱 <strong>AI猫动态：</strong>你的猫咪会自动发布日常生活动态<br/><br/>
                👤 <strong>铲屎官动态：</strong>你可以以铲屎官身份发布动态，分享养猫日常
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 喵主子商城弹窗 */}
      <AnimatePresence>
        {showShop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowShop(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 商城头部 */}
              <div className="bg-gradient-to-r from-[#ff8c42] to-[#ff6b9d] p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">喵主子商城</h2>
                      <p className="text-white/80 text-sm">给喵主子最好的宠爱</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowShop(false)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* 商城内容 */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* 服饰专区 */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-16 bg-pink-200 rounded-2xl flex items-center justify-center mb-4">
                      <Shirt className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">服饰专区</h3>
                    <p className="text-sm text-gray-600 mb-3">可爱衣服、季节外套、节日装扮</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-pink-600">¥9.9起</span>
                      <span className="text-xs px-2 py-1 bg-pink-200 text-pink-700 rounded-full">热门</span>
                    </div>
                  </motion.div>

                  {/* 首饰专区 */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-16 bg-amber-200 rounded-2xl flex items-center justify-center mb-4">
                      <Gem className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">首饰专区</h3>
                    <p className="text-sm text-gray-600 mb-3">精致项圈、可爱铃铛、个性铭牌</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-600">¥19.9起</span>
                      <span className="text-xs px-2 py-1 bg-amber-200 text-amber-700 rounded-full">新品</span>
                    </div>
                  </motion.div>

                  {/* 零食专区 */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-16 bg-green-200 rounded-2xl flex items-center justify-center mb-4">
                      <Cookie className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">零食专区</h3>
                    <p className="text-sm text-gray-600 mb-3">进口罐头、冻干零食、猫条礼包</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">¥29.9起</span>
                      <span className="text-xs px-2 py-1 bg-green-200 text-green-700 rounded-full">爆款</span>
                    </div>
                  </motion.div>

                  {/* 运动专区 */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-16 bg-blue-200 rounded-2xl flex items-center justify-center mb-4">
                      <Trophy className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">运动专区</h3>
                    <p className="text-sm text-gray-600 mb-3">逗猫棒、猫爬架、跑步机</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">¥39.9起</span>
                      <span className="text-xs px-2 py-1 bg-blue-200 text-blue-700 rounded-full">健康</span>
                    </div>
                  </motion.div>

                  {/* 疗养专区 */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-16 bg-purple-200 rounded-2xl flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">疗养专区</h3>
                    <p className="text-sm text-gray-600 mb-3">SPA护理、按摩服务、健康检查</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-purple-600">¥99起</span>
                      <span className="text-xs px-2 py-1 bg-purple-200 text-purple-700 rounded-full">推荐</span>
                    </div>
                  </motion.div>

                  {/* VIP会员 */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-[#ff8c42] to-[#ff6b9d] rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all text-white"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-1">VIP会员</h3>
                    <p className="text-sm text-white/80 mb-3">全场9折、专属客服、优先发货</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">¥29.9/月</span>
                      <span className="text-xs px-2 py-1 bg-white/20 text-white rounded-full">超值</span>
                    </div>
                  </motion.div>
                </div>

                {/* 底部提示 */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 text-center">
                    💡 购买商品后，喵主子会自动发布晒单动态到朋友圈哦~
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
