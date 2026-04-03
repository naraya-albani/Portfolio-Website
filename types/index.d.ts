export interface Experience {
  object: string;
  id: string;
  icon: {
    type: string;
    external: {
      url: string;
    };
  } | null;
  properties: {
    "Files & media": {
      type: "files";
      files: {
        name: string;
        type: "file";
        file: {
          url: string;
          expiry_time: string;
        };
        external: {
          url: string;
          expiry_time: string;
        };
      }[];
    };
    Position: {
      type: "multi_select";
      multi_select: {
        id: string;
        name: string;
        color: string;
      }[];
    };
    Description: {
      type: "rich_text";
      rich_text: {
        plain_text: string;
      }[];
    };
    Date: {
      type: "date";
      date: {
        start: string;
        end: string | null;
      };
    };
    Status: {
      type: "status";
      status: {
        id: string;
        name: string;
        color: string;
      };
    };
    Name: {
      type: "title";
      title: {
        plain_text: string;
      }[];
    };
  };
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  firstDay: string;
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface GitHubStatsProps {
  followers: number;
  following: number;
  publicRepos: number;
}

export interface WakaTimeData {
  data: {
    start: string;
    end: string;
    human_readable_daily_average: string;
    human_readable_total: string;
    best_day: {
      date: string;
      text: string;
    };
    languages: {
      name: string;
      percent: number;
    }[];
    editors: {
      name: string;
      percent: number;
    }[];
  };
}
