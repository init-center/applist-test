import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { AppInfo } from "@/types";
import Ratings from "@/components/ui/ratings";
import { cn } from "@/lib/utils";

interface VerticalAppListProps {
  appList: AppInfo[];
  className?: string;
}

export default function VerticalAppList({
  appList,
  className,
}: VerticalAppListProps) {
  if (!appList.length) {
    return <div>Loading...</div>;
  }
  return (
    <ScrollArea className={cn("w-full min-h-full", className)}>
      <ul className="w-full flex flex-col gap-3">
        {appList.map((appInfo, idx) => (
          <li key={appInfo.id} className="flex text-sm border-b py-2 pl-3">
            <div className="w-[16px] flex justify-center items-center text-gray-500 text-xs">
              {idx + 1}
            </div>

            <div className="flex justify-center items-center mx-2">
              <Image
                src={appInfo.image[appInfo.image.length - 1].label}
                alt={appInfo.name}
                width={62}
                height={62}
                priority={true}
                className={(idx + 1) & 1 ? "rounded-2xl" : "rounded-full"}
              />
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="w-full truncate py-1" title={appInfo.name}>
                {appInfo.name}
              </div>
              <div className="text-gray-500">{appInfo.category}</div>
              <div className="flex gap-1">
                <Ratings
                  size={12}
                  variant="yellow"
                  value={appInfo.averageUserRating}
                  style={{
                    gap: 0,
                  }}
                />
                <span className="text-gray-500">
                  ({appInfo.userRatingCount})
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
