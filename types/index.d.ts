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
