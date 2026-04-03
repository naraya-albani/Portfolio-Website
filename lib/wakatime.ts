export async function fetchWakaTime() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    console.error("WAKATIME_API_KEY tidak ditemukan");
    return null;
  }

  try {
    const res = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        },
        next: { revalidate: 3600 }, // cache 1 jam
      },
    );

    const data = await res.json();

    if (!data.data) {
      console.error("WakaTime error:", data);
      return null;
    }

    return data.data;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}
