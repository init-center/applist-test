import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { AppInfo } from "@/types";

interface HorizontalAppListProps {
  title: string;
  appList: AppInfo[];
}

export default function HorizontalAppList({
  title,
  appList,
}: HorizontalAppListProps) {
  if (!appList.length) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full border-b">
      <h2 className="font-medium py-2 px-3">{title}</h2>
      <ScrollArea>
        <ul className="w-full flex gap-3 pb-2 px-3">
          {appList.map((appInfo) => (
            <li
              key={appInfo.id}
              className="w-[88px] flex flex-col justify-center items-center text-sm"
            >
              <Image
                src={appInfo.image[appInfo.image.length - 1].label}
                alt={appInfo.name}
                width={88}
                height={88}
                priority={true}
                className="rounded-2xl"
              />
              <div
                className="w-full text-center truncate py-1"
                title={appInfo.name}
              >
                {appInfo.name}
              </div>
              <div className="text-gray-500">{appInfo.category}</div>
            </li>
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
