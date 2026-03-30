export type LocaleId = "en" | "zh-cn" | "ja";
export type StationStatus = "active" | "inactive";

export interface LogbookUi {
  clusterTitle: string;
  cardLabel: string;
  noscript: string;
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
    heroOverview: string;
    homeLink: string;
    languageSwitcher: string;
    stationSwitcher: string;
  };
  footer: string;
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
      heroOverview: "Station Overview",
      homeLink: "Go to my blog chariri.moe",
      languageSwitcher: "Language switcher",
      stationSwitcher: "Callsign switcher",
    },
    footer:
      'Made with Astro, TailwindCSS, heavy-prompted GPT 5.4 + codex and ❤️. \
      This site is <a href="https://github.com/cqjjjzr/chisato-ham-logbook">open source</a> on GitHub.',
    stationStatus: {
      active: "Active",
      inactive: "Inactive",
    },
    logbook: {
      clusterTitle: "Logbook",
      cardLabel: "Recent log archive",
      noscript:
        "The interactive logbook viewer requires JavaScript. \
        You can still read the rest of the station page without it.",
      searchLabel: "Search",
      searchPlaceholder: "Their callsign...",
      resultsTemplate: "{visible} / {total} QSOs",
      empty: "No log records available.",
      noMatches: "No records matched the current search.",
      loading: "Loading logbook...",
      errorTitle: "Unable to load the logbook.",
      errorBody: "Try refresh. If it persists, the server may have an issue.",
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
          "Note: The 'Local' times below are relative to the browser timezone, \
          not the timezone where the contact happened.",
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
      sectionShortcuts: "章节导航",
      heroOverview: "业余无线电台概览",
      homeLink: "前往我的blog：chariri.moe",
      languageSwitcher: "语言切换",
      stationSwitcher: "呼号切换",
    },
    footer:
      'Made with Astro, TailwindCSS, 大量提示词的 GPT 5.4 + codex 与 ❤️. \
      本站点<a href="https://github.com/cqjjjzr/chisato-ham-logbook">开源在</a>GitHub.',
    stationStatus: {
      active: "活跃",
      inactive: "休止",
    },
    logbook: {
      clusterTitle: "通联日志",
      cardLabel: "近期日志归档",
      noscript: "日志查看器需要 JavaScript。不过页面其余内容仍可正常阅读。",
      searchLabel: "搜索",
      searchPlaceholder: "对方呼号...",
      resultsTemplate: "{visible} / {total} 条",
      empty: "此电台暂时没有日志记录。",
      noMatches: "当前搜索条件没有匹配记录。",
      loading: "正在加载日志...",
      errorTitle: "无法加载日志。",
      errorBody: "请重试。如果问题持续则服务器可能出现故障。",
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
        satellite: "卫星名",
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
      station: "コールサイン",
      sections: "セクション",
      sectionShortcuts: "セクションショートカット",
      heroOverview: "当無線局の概要",
      homeLink: "私のブログ chariri.moe へ移動",
      languageSwitcher: "言語切り替え",
      stationSwitcher: "コールサイン切り替え",
    },
    footer:
      'Made with Astro, TailwindCSS, heavy-prompted GPT 5.4 + codex and ❤️. \
      当サイトはGitHubにて<a href="https://github.com/cqjjjzr/chisato-ham-logbook">オープンソース</a>です.',
    stationStatus: {
      active: "運用中",
      inactive: "休止",
    },
    logbook: {
      clusterTitle: "交信ログ",
      cardLabel: "ログアーカイブ",
      noscript:
        "インタラクティブなログビューアには JavaScript が必要です。無効でもページ本文は閲覧できます。",
      searchLabel: "検索",
      searchPlaceholder: "相手コールサイン...",
      resultsTemplate: "{visible} / {total} 件",
      empty: "当局はまだログがありません。",
      noMatches: "現在の検索条件に一致する記録はありません。",
      loading: "ログを読み込み中...",
      errorTitle: "ログを読み込めませんでした。",
      errorBody: "もう一度試してください。問題が続くと、サーバーが落ちた可能性があります。",
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
          "Note: “ローカル”時刻はブラウザのタイムゾーンに則っており、交信地のローカル時刻ではありません。",
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
        selfGrid: "自局ローケーター",
        otherGrid: "相手局ローケーター",
        propagation: "伝搬方式",
        satellite: "衛星名",
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
