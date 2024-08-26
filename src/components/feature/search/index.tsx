import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import ResultList from "@/components/feature/vertical-app-list";
import { AppInfo } from "@/types";
import { useMemo } from "react";
import { debounce } from "@/lib/utils";

export interface SearchProps {
  resultList: AppInfo[];
  onInputChanged?: (value: string) => void;
}

export function Search({ resultList, onInputChanged }: SearchProps) {
  const onChange = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        if (onInputChanged) {
          onInputChanged(e.target.value);
        }
      }, 60),
    [onInputChanged]
  );

  return (
    <div className="group w-full flex flex-col border-b sticky left-0 top-0 bg-white z-10">
      <div className="w-full h-[52px] p-2">
        <div className="w-full h-full flex items-center bg-gray-200 text-gray-500 rounded-xl p-2">
          <SearchIcon size={14} className="mr-1" />
          <Input
            placeholder="Search..."
            className="h-full bg-transparent outline-none ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            onChange={onChange}
          />
        </div>
      </div>
      {resultList.length > 0 && (
        <div className="fixed left-0 right-0 top-[52px] w-full max-w-xl h-[50vh] max-h-[300px]  overflow-hidden mx-auto p-2 bg-white shadow-lg hidden group-has-[input:focus]:block">
          <ResultList appList={resultList} className="h-full" />
        </div>
      )}
    </div>
  );
}
