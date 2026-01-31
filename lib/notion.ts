import { Client } from "@notionhq/client";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function fetchPageBlocks() {
  const response = await notion.blocks.children.list({
    block_id: process.env.NOTION_PAGES_ID!,
    page_size: 2,
  });

  return response.results;
}

export async function fetchDatabase(databaseId: string) {
  const db = await notion.databases.retrieve({
    database_id: databaseId,
  });

  const response = await notion.dataSources.query({
    data_source_id: (db as any).data_sources?.[0]?.id,
    page_size: 10,
  });

  return response.results;
}
