export type LocaleId = "en" | "zh-cn" | "ja";
export type StationStatus = "active" | "inactive";

export interface LogbookUi {
  clusterTitle: string;
  cardLabel: string;
  intro: string;
  searchLabel: string;
  searchPlaceholder: string;
  resultsTemplate: string;
  empty: string;
  noMatches: string;
  loading: string;
  errorTitle: string;
  errorBody: string;
  clickHint: string;
  close: string;
  detailTitleTemplate: string;
  rowOpenLabelTemplate: string;
  columns: {
    utc: string;
    callsign: string;
    sent: string;
    received: string;
    txFreq: string;
    rxFreq: string;
    mode: string;
    txPower: string;
  };
  details: {
    noteTimezone: string;
    startUtc: string;
    startLocal: string;
    endUtc: string;
    endLocal: string;
    sentRst: string;
    receivedRst: string;
    txFreq: string;
    rxFreq: string;
    txPower: string;
    mode: string;
    comment: string;
    qth: string;
    rig: string;
    selfGrid: string;
    otherGrid: string;
    propagation: string;
    satellite: string;
    notAvailable: string;
  };
}

export interface LocaleContext {
  id: LocaleId;
  tag: string;
  switchLabel: string;
  languageName: string;
  skipToContent: string;
  siteTitle: string;
  labels: {
    language: string;
    station: string;
    sections: string;
    sectionShortcuts: string;
    quickSectionShortcuts: string;
    heroOverview: string;
    homeLink: string;
    languageSwitcher: string;
    stationSwitcher: string;
  };
  footer: {
    note: string;
    copyright: string;
  };
  noscript: {
    logbook: string;
  };
  stationStatus: Record<StationStatus, string>;
  logbook: LogbookUi;
}

export interface LocaleLink {
  id: LocaleId;
  switchLabel: string;
  languageName: string;
  href: string;
  current: boolean;
}

const localeDefinitions = {
  en: {
    id: "en",
    tag: "en",
    switchLabel: "EN",
    languageName: "English",
    skipToContent: "Skip to main content",
    siteTitle: "Amateur Radio Homepage - Chisato HAM Logbook",
    labels: {
      language: "Lang",
      station: "Station",
      sections: "Sections",
      sectionShortcuts: "Section shortcuts",
      quickSectionShortcuts: "Quick section shortcuts",
      heroOverview: "Station Overview",
      homeLink: "Go to chariri.moe",
      languageSwitcher: "Language switcher",
      stationSwitcher: "Callsign switcher",
    },
    footer: {
      note: "Static page, local assets, and a lightweight toolchain.",
      copyright: "Chisato HAM Logbook, Copyleft by 茶栗chariri",
    },
    noscript: {
      logbook:
        "The interactive logbook viewer requires JavaScript. You can still read the rest of the station page without it.",
    },
    stationStatus: {
      active: "On Air",
      inactive: "Archive",
    },
    logbook: {
      clusterTitle: "Logbook",
      cardLabel: "Recent log archive",
      intro:
        "Search first, then scroll. Only the visible rows are rendered, so browser find will miss most records.",
      searchLabel: "Search",
      searchPlaceholder: "Their callsign...",
      resultsTemplate: "{visible} / {total} QSOs",
      empty: "No log records are available for this callsign yet.",
      noMatches: "No records matched the current search.",
      loading: "Loading logbook...",
      errorTitle: "Unable to load the logbook.",
      errorBody: "Check that the JSON file exists and try again.",
      clickHint:
        "Use Up and Down arrow keys to move through rows. Press Enter to open the full QSO details.",
      close: "Close",
      detailTitleTemplate: "{self} to {other}",
      rowOpenLabelTemplate: "Open QSO details for {other} at {utc}",
      columns: {
        utc: "UTC",
        callsign: "CALL",
        sent: "THEIRS",
        received: "OURS",
        txFreq: "TX FREQ",
        rxFreq: "RX FREQ",
        mode: "Mode",
        txPower: "TX PWR",
      },
      details: {
        noteTimezone:
          "Note: The 'Local' times below are relative to the browser timezone, not the timezone where the contact happened.",
        startUtc: "Start time (UTC)",
        startLocal: "Start time (local)",
        endUtc: "End time (UTC)",
        endLocal: "End time (local)",
        sentRst: "RST sent (their)",
        receivedRst: "RST received (ours)",
        txFreq: "TX frequency",
        rxFreq: "RX frequency",
        txPower: "TX power",
        mode: "Mode",
        comment: "Comment",
        qth: "QTH",
        rig: "Rig",
        selfGrid: "My gridsquare",
        otherGrid: "Their gridsquare",
        propagation: "Propagation",
        satellite: "Satellite",
        notAvailable: "N/A",
      },
    },
  },
  "zh-cn": {
    id: "zh-cn",
    tag: "zh-CN",
    switchLabel: "简",
    languageName: "简体中文",
    skipToContent: "跳到主要内容",
    siteTitle: "业余无线电台主页 - Chisato HAM Logbook",
    labels: {
      language: "语言",
      station: "电台",
      sections: "章节",
      sectionShortcuts: "章节快捷导航",
      quickSectionShortcuts: "快速章节导航",
      heroOverview: "电台概览",
      homeLink: "前往 chariri.moe",
      languageSwitcher: "语言切换",
      stationSwitcher: "呼号切换",
    },
    footer: {
      note: "静态页面、本地资源，以及轻量的工具链。",
      copyright: "Chisato HAM Logbook",
    },
    noscript: {
      logbook: "交互式日志查看器需要 JavaScript。关闭脚本时，页面其余内容仍可正常阅读。",
    },
    stationStatus: {
      active: "活跃",
      inactive: "存档",
    },
    logbook: {
      clusterTitle: "通联日志",
      cardLabel: "日志归档",
      intro: "请先搜索，再滚动。这里只渲染当前可见的行，所以浏览器自带查找无法覆盖全部记录。",
      searchLabel: "搜索",
      searchPlaceholder: "对方呼号...",
      resultsTemplate: "{visible} / {total} 条",
      empty: "这个呼号暂时没有日志记录。",
      noMatches: "当前搜索条件没有匹配记录。",
      loading: "正在加载日志...",
      errorTitle: "无法加载日志。",
      errorBody: "请检查 JSON 文件是否存在，然后重试。",
      clickHint: "可用上下方向键切换行，并按回车查看完整 QSO 详情。",
      close: "关闭",
      detailTitleTemplate: "{self} → {other}",
      rowOpenLabelTemplate: "打开 {utc} 与 {other} 的 QSO 详情",
      columns: {
        utc: "UTC",
        callsign: "对方呼号",
        sent: "发出",
        received: "收到",
        txFreq: "发射频率",
        rxFreq: "接收频率",
        mode: "模式",
        txPower: "发射功率",
      },
      details: {
        noteTimezone: "Note: “本地”时间相对于浏览器时区，而非通信时地域的时区。",
        startUtc: "开始时间（UTC）",
        startLocal: "开始时间（本地）",
        endUtc: "结束时间（UTC）",
        endLocal: "结束时间（本地）",
        sentRst: "送出信号报告",
        receivedRst: "收到信号报告",
        txFreq: "发射频率",
        rxFreq: "接收频率",
        txPower: "发射功率",
        mode: "模式",
        comment: "备注",
        qth: "QTH",
        rig: "设备",
        selfGrid: "己方网格",
        otherGrid: "对方网格",
        propagation: "传播方式",
        satellite: "卫星",
        notAvailable: "无",
      },
    },
  },
  ja: {
    id: "ja",
    tag: "ja",
    switchLabel: "日",
    languageName: "日本語",
    skipToContent: "本文へ移動",
    siteTitle: "アマチュア無線局ホームページ - Chisato HAM Logbook",
    labels: {
      language: "言語",
      station: "局",
      sections: "セクション",
      sectionShortcuts: "セクションショートカット",
      quickSectionShortcuts: "クイックセクションショートカット",
      heroOverview: "局の概要",
      homeLink: "chariri.moe へ移動",
      languageSwitcher: "言語切り替え",
      stationSwitcher: "コールサイン切り替え",
    },
    footer: {
      note: "静的ページ、ローカル配信アセット、軽量なツールチェーンで構成しています。",
      copyright: "Chisato HAM Logbook",
    },
    noscript: {
      logbook:
        "インタラクティブなログビューアには JavaScript が必要です。無効でもページ本文は閲覧できます。",
    },
    stationStatus: {
      active: "運用中",
      inactive: "アーカイブ",
    },
    logbook: {
      clusterTitle: "交信ログ",
      cardLabel: "ログアーカイブ",
      intro:
        "先に検索してからスクロールしてください。表示中の行だけ描画するため、ブラウザ検索では大半の記録を拾えません。",
      searchLabel: "検索",
      searchPlaceholder: "相手コールサイン...",
      resultsTemplate: "{visible} / {total} 件",
      empty: "このコールサインにはまだログ記録がありません。",
      noMatches: "現在の検索条件に一致する記録はありません。",
      loading: "ログを読み込み中...",
      errorTitle: "ログを読み込めませんでした。",
      errorBody: "JSON ファイルの配置を確認して、もう一度試してください。",
      clickHint: "上下キーで行を移動し、Enter で QSO 詳細を開きます。",
      close: "閉じる",
      detailTitleTemplate: "{self} → {other}",
      rowOpenLabelTemplate: "{utc} の {other} との QSO 詳細を開く",
      columns: {
        utc: "UTC",
        callsign: "相手",
        sent: "相手",
        received: "自局",
        txFreq: "送信",
        rxFreq: "受信",
        mode: "モード",
        txPower: "出力",
      },
      details: {
        noteTimezone:
          "Note: “ローカル”時刻はブラウザのタイムゾーンに則っており、交信地のタイムゾーンではありません。",
        startUtc: "開始時刻（UTC）",
        startLocal: "開始時刻（ローカル）",
        endUtc: "終了時刻（UTC）",
        endLocal: "終了時刻（ローカル）",
        sentRst: "相手 RST",
        receivedRst: "自局 RST",
        txFreq: "送信周波数",
        rxFreq: "受信周波数",
        txPower: "送信出力",
        mode: "モード",
        comment: "メモ",
        qth: "QTH",
        rig: "設備",
        selfGrid: "自局グリッド",
        otherGrid: "相手局グリッド",
        propagation: "伝搬方式",
        satellite: "衛星",
        notAvailable: "なし",
      },
    },
  },
} as const satisfies Record<LocaleId, LocaleContext>;

export const localeIds = Object.keys(localeDefinitions) as LocaleId[];
export const locales = localeIds.map((id) => ({
  id,
  switchLabel: localeDefinitions[id].switchLabel,
  languageName: localeDefinitions[id].languageName,
}));

export function getLocale(id: LocaleId): LocaleContext {
  return localeDefinitions[id];
}
