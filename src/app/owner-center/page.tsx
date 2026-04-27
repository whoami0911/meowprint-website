"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Cat,
  Heart,
  Zap,
  Utensils,
  User,
  ArrowLeft,
  Home,
  Camera,
  MessageCircle,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  Activity,
  Sparkles,
  ShoppingBag,
  Bell,
  Search,
  Edit3,
  Plus,
  TrendingUp,
  Gift,
  Star,
} from "lucide-react";

// Types
interface CatProfile {
  name: string;
  color: string;
  personality: string;
  signature: string;
  expression: "happy" | "sleepy" | "surprised" | "cool" | "mischievous";
  accessories: string[];
  adoptedDate?: string;
}

// Cat Avatar Component
function CatAvatar({ color, size = "md", expression = "happy" }: { 
  color: string; 
  size?: "sm" | "md" | "lg" | "xl"; 
  expression?: string;
}) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
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

// Status Bar Component
function StatusBar({ label, value, color, icon: Icon }: { label: string; value: number; color: string; icon: any }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" style={{ color }} />
          <span className="text-sm text-gray-600">{label}</span>
        </div>
        <span className="font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// Tool Card Component
function ToolCard({ icon: Icon, title, desc, onClick, color }: { icon: any; title: string; desc: string; onClick?: () => void; color: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left w-full"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </motion.button>
  );
}

// Activity Item
function ActivityItem({ time, content, type }: { time: string; content: string; type: "post" | "comment" | "like" }) {
  const typeColors = {
    post: "bg-blue-100 text-blue-600",
    comment: "bg-green-100 text-green-600",
    like: "bg-pink-100 text-pink-600",
  };
  
  const typeLabels = {
    post: "发布了动态",
    comment: "评论了",
    like: "点赞了",
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-2 h-2 rounded-full mt-2 ${typeColors[type].split(" ")[0]}`} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{typeLabels[type]}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{content}</p>
      </div>
    </div>
  );
}

export default function OwnerCenterPage() {
  const router = useRouter();
  const [myCat, setMyCat] = useState<CatProfile | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCat = localStorage.getItem("myCat");
    if (savedCat) {
      const cat = JSON.parse(savedCat);
      cat.adoptedDate = new Date().toISOString().split("T")[0];
      setMyCat(cat);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fef9f3] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-12 h-12 text-[#ff8c42]" />
        </motion.div>
      </div>
    );
  }

  if (!myCat) {
    return (
      <div className="min-h-screen bg-[#fef9f3] flex items-center justify-center">
        <div className="text-center">
          <Cat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">还没有领养猫咪</h2>
          <p className="text-gray-600 mb-4">先去领养一只可爱的喵主子吧！</p>
          <button
            onClick={() => router.push("/adopt")}
            className="px-6 py-3 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white rounded-full font-semibold hover:shadow-lg transition-all"
          >
            去领养
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef9f3]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff8c42] to-[#ffb5c5] rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">铲屎官中心</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索..."
                className="ml-2 bg-transparent outline-none text-sm w-40"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              返回首页
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
              {/* Cat Profile */}
              <div className="text-center mb-6">
                <CatAvatar color={myCat.color} size="xl" expression={myCat.expression} />
                <h2 className="mt-4 text-2xl font-bold text-gray-900">{myCat.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{myCat.personality.split("，")[0]}</p>
                {myCat.adoptedDate && (
                  <p className="text-xs text-gray-400 mt-2">领养于 {myCat.adoptedDate}</p>
                )}
              </div>

              {/* 互动功能区 */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff8c42]" />
                  互动功能
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1 p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors"
                  >
                    <span className="text-2xl">🎀</span>
                    <span className="text-xs font-medium text-gray-700">哄哄</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <span className="text-2xl">🚶</span>
                    <span className="text-xs font-medium text-gray-700">散步</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <span className="text-2xl">🛁</span>
                    <span className="text-xs font-medium text-gray-700">洗澡</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                  >
                    <span className="text-2xl">💊</span>
                    <span className="text-xs font-medium text-gray-700">驱虫</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1 p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                  >
                    <span className="text-2xl">🐟</span>
                    <span className="text-xs font-medium text-gray-700">投喂</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1 p-3 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors"
                  >
                    <span className="text-2xl">💕</span>
                    <span className="text-xs font-medium text-gray-700">相亲</span>
                  </motion.button>
                </div>
              </div>

              {/* Status Bars */}
              <div className="space-y-3 mb-6">
                <StatusBar label="心情" value={92} color="#ff6b9d" icon={Heart} />
                <StatusBar label="精力" value={85} color="#3b82f6" icon={Zap} />
                <StatusBar label="饱腹" value={65} color="#22c55e" icon={Utensils} />
                <StatusBar label="健康" value={98} color="#a855f7" icon={Activity} />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#ff8c42]">12</div>
                  <div className="text-xs text-gray-500">动态</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#ff6b9d]">128</div>
                  <div className="text-xs text-gray-500">粉丝</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">256</div>
                  <div className="text-xs text-gray-500">获赞</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">¥0</div>
                  <div className="text-xs text-gray-500">余额</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl p-2 shadow-soft mb-6">
              <div className="flex items-center gap-2">
                {[
                  { id: "overview", label: "总览", icon: Home },
                  { id: "moments", label: "朋友圈", icon: Camera },
                  { id: "stats", label: "数据", icon: BarChart3 },
                  { id: "schedule", label: "日程", icon: Calendar },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Quick Tools */}
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#ff8c42]" />
                    快捷工具
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <ToolCard
                      icon={Camera}
                      title="发布动态"
                      desc="以铲屎官身份发朋友圈"
                      color="#ff8c42"
                      onClick={() => router.push("/feed")}
                    />
                    <ToolCard
                      icon={ShoppingBag}
                      title="喵主子商城"
                      desc="购买服饰、零食、玩具"
                      color="#22c55e"
                      onClick={() => router.push("/#entertainment")}
                    />
                    <ToolCard
                      icon={MessageCircle}
                      title="互动记录"
                      desc="查看点赞评论历史"
                      color="#3b82f6"
                    />
                    <ToolCard
                      icon={Calendar}
                      title="日程安排"
                      desc="管理猫咪日常活动"
                      color="#a855f7"
                    />
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#ff6b9d]" />
                    最近动态
                  </h3>
                  <div className="space-y-2">
                    <ActivityItem time="10分钟前" content={`${myCat.name}发布了新家报到动态，获得了128个赞`} type="post" />
                    <ActivityItem time="30分钟前" content="橘子评论了你的动态：欢迎新邻居！" type="comment" />
                    <ActivityItem time="1小时前" content="奶茶点赞了你的动态" type="like" />
                    <ActivityItem time="2小时前" content={`你领取了新手铲屎官礼包`} type="post" />
                  </div>
                  <button className="w-full mt-4 py-2 text-[#ff8c42] font-medium hover:bg-orange-50 rounded-lg transition-colors">
                    查看全部动态
                  </button>
                </div>

                {/* Today's Tasks */}
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    今日任务
                  </h3>
                  <div className="space-y-3">
                    {[
                      { task: "喂食", done: true, reward: "+10金币" },
                      { task: "陪玩", done: true, reward: "+20金币" },
                      { task: "梳毛", done: false, reward: "+15金币" },
                      { task: "发布动态", done: false, reward: "+30金币" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          item.done ? "bg-green-50" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            item.done ? "bg-green-500 text-white" : "border-2 border-gray-300"
                          }`}>
                            {item.done && <span className="text-xs">✓</span>}
                          </div>
                          <span className={`font-medium ${item.done ? "text-gray-500 line-through" : "text-gray-900"}`}>
                            {item.task}
                          </span>
                        </div>
                        <span className="text-sm text-amber-600 font-medium">{item.reward}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "moments" && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-bold text-gray-900 mb-4">朋友圈动态</h3>
                <div className="text-center py-12">
                  <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">点击查看完整朋友圈</p>
                  <button
                    onClick={() => router.push("/feed")}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white rounded-full font-medium"
                  >
                    进入朋友圈
                  </button>
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-bold text-gray-900 mb-4">数据统计</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl">
                    <div className="text-3xl font-bold text-[#ff8c42]">128</div>
                    <div className="text-sm text-gray-600">总获赞数</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-500">45</div>
                    <div className="text-sm text-gray-600">评论数</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                    <div className="text-3xl font-bold text-green-500">12</div>
                    <div className="text-sm text-gray-600">发布动态</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <div className="text-3xl font-bold text-purple-500">1.2k</div>
                    <div className="text-sm text-gray-600">浏览量</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg font-bold text-gray-900 mb-4">日程安排</h3>
                <div className="space-y-3">
                  {[
                    { time: "08:00", event: "早餐时间", type: "meal" },
                    { time: "10:00", event: "运动时间", type: "play" },
                    { time: "14:00", event: "午睡时间", type: "sleep" },
                    { time: "18:00", event: "晚餐时间", type: "meal" },
                    { time: "20:00", event: "互动时间", type: "play" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium text-gray-500 w-16">{item.time}</span>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{item.event}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.type === "meal" ? "bg-green-100 text-green-600" :
                        item.type === "play" ? "bg-orange-100 text-orange-600" :
                        "bg-purple-100 text-purple-600"
                      }`}>
                        {item.type === "meal" ? "用餐" : item.type === "play" ? "活动" : "休息"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-bold text-gray-900 mb-4">快捷操作</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => router.push("/feed")}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#ff8c42] to-[#ffb5c5] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  <Camera className="w-5 h-5" />
                  发布朋友圈
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-orange-50 text-[#ff8c42] rounded-xl font-medium hover:bg-orange-100 transition-all">
                  <Gift className="w-5 h-5" />
                  领取每日奖励
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-all">
                  <ShoppingBag className="w-5 h-5" />
                  进入商城
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                成就徽章
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🏠", name: "新家", desc: "领养第一只猫" },
                  { icon: "📸", name: "摄影师", desc: "发布10条动态" },
                  { icon: "💝", name: "受欢迎", desc: "获得100赞" },
                ].map((badge, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium text-gray-900">{badge.name}</div>
                    <div className="text-xs text-gray-400">{badge.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-bold text-gray-900 mb-4">设置</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">账号设置</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left">
                  <Edit3 className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">编辑猫咪资料</span>
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem("myCat");
                    router.push("/");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors text-left text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                  <span>退出登录</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
