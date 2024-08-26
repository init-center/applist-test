"use client";

import RecommendApps from "@/components/feature/horizontal-app-list";
import TopFreeApps from "@/components/feature/vertical-app-list";
import { useCallback, useEffect, useState } from "react";
import type { AppDetailResponse, AppInfo, AppListResponse } from "@/types";
import { request } from "@/lib/request";
import { Search } from "@/components/feature/search";

export default function Home() {
  const [recommendApps, setRecommendApps] = useState<AppInfo[]>([]);
  const [topFreeApps, setTopFreeApps] = useState<AppInfo[]>([]);
  const [searchResult, setSearchResult] = useState<AppInfo[]>([]);

  const onInputChanged = useCallback(
    (value: string) => {
      if (value === "") {
        setSearchResult([]);
        return;
      }

      const result = [...recommendApps, ...topFreeApps].filter((app) => {
        return (
          app.name.includes(value) ||
          app.artist.includes(value) ||
          app.description.includes(value)
        );
      });
      const map = new Map<string, AppInfo>();
      result.forEach((app) => {
        map.set(app.id, app);
      });
      setSearchResult(Array.from(map.values()));
    },
    [recommendApps, topFreeApps]
  );

  const requestRecommendApps = useCallback(async () => {
    try {
      const data = await request<AppListResponse>(
        "https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json"
      );
      setRecommendApps(
        data.feed.entry.map((app) => {
          return {
            name: app["im:name"].label,
            image: app["im:image"],
            summary: app.summary.label,
            artist: app["im:artist"].label,
            id: app.id.attributes["im:id"],
            category: app.category.attributes.label,
            artistId: 0,
            artistName: app["im:artist"].label,
            genres: [],
            price: app["im:price"].attributes.amount,
            description: "",
            userRatingCount: 0,
            averageUserRating: 0,
          };
        })
      );
      const ids = data.feed.entry
        .map((app) => app.id.attributes["im:id"])
        .join(",");
      const appDetailData = await request<AppDetailResponse>(
        `https://itunes.apple.com/hk/lookup?id=${ids}`
      );
      const appDetailList = appDetailData.results;
      setRecommendApps((prev) =>
        prev.map((app) => {
          const detail = appDetailList.find(
            (detail) => detail.trackId === Number(app.id)
          );
          return {
            ...app,
            description: detail?.description || "",
            userRatingCount: detail?.userRatingCount || 0,
            averageUserRating: detail?.averageUserRating || 0,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const requestTopFreeApps = useCallback(async () => {
    // TODO Optimize： use paging to load if it encounters performance problems later
    try {
      const data = await request<AppListResponse>(
        "https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json"
      );
      setTopFreeApps(
        data.feed.entry.map((app) => {
          return {
            name: app["im:name"].label,
            image: app["im:image"],
            summary: app.summary.label,
            artist: app["im:artist"].label,
            id: app.id.attributes["im:id"],
            category: app.category.attributes.label,
            artistId: 0,
            artistName: app["im:artist"].label,
            genres: [],
            price: app["im:price"].attributes.amount,
            description: "",
            userRatingCount: 0,
            averageUserRating: 0,
          };
        })
      );
      const ids = data.feed.entry
        .map((app) => app.id.attributes["im:id"])
        .join(",");
      const appDetailData = await request<AppDetailResponse>(
        `https://itunes.apple.com/hk/lookup?id=${ids}`
      );
      const appDetailList = appDetailData.results;
      setTopFreeApps((prev) =>
        prev.map((app) => {
          const detail = appDetailList.find(
            (detail) => detail.trackId === Number(app.id)
          );
          return {
            ...app,
            description: detail?.description || "",
            userRatingCount: detail?.userRatingCount || 0,
            averageUserRating: detail?.averageUserRating || 0,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    requestRecommendApps();
    requestTopFreeApps();
  }, [requestRecommendApps, requestTopFreeApps]);

  return (
    <main className="relative flex min-h-screen max-w-xl mx-auto flex-col items-center">
      <Search resultList={searchResult} onInputChanged={onInputChanged} />
      <RecommendApps title="Recommend" appList={recommendApps} />
      <TopFreeApps appList={topFreeApps} />
    </main>
  );
}
