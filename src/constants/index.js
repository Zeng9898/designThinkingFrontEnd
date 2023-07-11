export const navLinks = [
  {
    id: "登入id",
    title: "登入",
    url: "login"
  },
  {
    id: "註冊id",
    title: "註冊",
    url: "register"
  }
];

export const thinkingRoutines = [
  {
    id: "1",
    thinkingRoutineName: "列出利害關係人",
    thinkingRoutineType: "發散",
    asignees: ["曾譯宏"],
    hint: "請列出你心目中的利害關係人",
    needChecked: true,
    passChecked: false,
    stackId: "待排程"
  },
  {
    id: "2",
    thinkingRoutineName: "列出利害關係人",
    thinkingRoutineType: "發散",
    asignees: ["康家豪"],
    hint: "請列出你心目中的利害關係人",
    needChecked: true,
    passChecked: false,
    stackId: "待排程"
  },
  {
    id: "3",
    thinkingRoutineName: "列出利害關係人",
    thinkingRoutineType: "發散",
    asignees: ["霍佳立"],
    hint: "請列出你心目中的利害關係人",
    needChecked: true,
    passChecked: false,
    stackId: "待排程"
  },
  {
    id: "4",
    thinkingRoutineName: "列出利害關係人",
    thinkingRoutineType: "發散",
    asignees: ["楊琇茹"],
    hint: "請列出你心目中的利害關係人",
    needChecked: true,
    passChecked: false,
    stackId: "待排程"
  },
  {
    id: "5",
    thinkingRoutineName: "列出利害關係人",
    thinkingRoutineType: "發散",
    asignees: ["楊琇茹", "曾譯宏", "康家豪", "霍佳立"],
    hint: "請列出你心目中的利害關係人",
    needChecked: true,
    passChecked: false,
    stackId: "待排程"
  },
  {
    id: "6",
    thinkingRoutineName: "歸納利害關係人",
    thinkingRoutineType: "歸納",
    asignees: ["楊琇茹", "曾譯宏", "康家豪", "霍佳立"],
    hint: "請將類型相似的利害關係人貼上標籤",
    needChecked: true,
    passChecked: false,
    stackId: "進行中"
  },
  {
    id: "7",
    thinkingRoutineName: "進場域前的同理",
    thinkingRoutineType: "發散",
    asignees: ["楊琇茹", "曾譯宏", "康家豪", "霍佳立"],
    hint: "請同理自己在xxx上的體驗",
    needChecked: true,
    passChecked: false,
    stackId: "待審核"
  },
  {
    id: "8",
    thinkingRoutineName: "自我介紹",
    thinkingRoutineType: "發散",
    asignees: ["楊琇茹", "曾譯宏", "康家豪", "霍佳立"],
    hint: "請說出自己的特質",
    needChecked: false,
    passChecked: null,
    stackId: "已完成"
  }
]

export const fakeNodes = [
  {
    id: 1,
    title: "自我介紹",
    content: "請大家依照自我介紹節點延伸出的：特質、三個形容詞、最能形容自己的三件事，來做自我介紹",
    owner: "yihong",
    to: null
  },
  {
    id: 2,
    title: "特質",
    content: "請大家以此延伸出自己的特質",
    owner: "yihong",
    to: 1
  },
  {
    id: 3,
    title: "三件事形容自己",
    content: "請大家列出形容自己的三件事",
    owner: "yihong",
    to: 1
  },
  {
    id: 4,
    title: "三個形容詞",
    content: "請大家列出形容自己的三件事",
    owner: "yihong",
    to: 1
  }
];
