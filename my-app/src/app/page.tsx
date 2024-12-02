import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import Image from "next/image";
import { Item } from "@/app/components/Item";

export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-400">
      <main className="w-[1208px] m-auto p-4">
        <div className="p-6 bg-primary-background-color border border-primary-border-color rounded-md flex flex-col items-center w-full">
          <p className="text-base font-semibold mb-1 text-gray-900">
            Menu jest puste
          </p>
          <p className="mb-6 text-blue-gray-700">
            W tym menu nie ma jeszcze żadnych linków.
          </p>
          <Button
            type="button"
            className="bg-primary-color text-white font-semibold"
            child={
              <div className="flex gap-2 items-center">
                <Image
                  src="/assets/add-icon.svg"
                  alt="add"
                  width="19"
                  height="19"
                />
                <span>Dodaj pozycję menu</span>
              </div>
            }
          />
        </div>
        <Item title="Some title" />
        <form action="">
          <div className="relative bg-white pt-4 pb-2 pl-6 pr-20 rounded-md border border-blue-gray-200">
            <div className="absolute w-10 h-10 top-4 right-6 flex items-center justify-center">
              <Image
                src="/assets/delete-icon.svg"
                alt="delete"
                width="19"
                height="19"
              />
            </div>
            <Input
              type="text"
              fieldName="Nazwa"
              placeholder="np. Promocje"
              className="px-3"
            />
            <Input
              type="text"
              fieldName="Link"
              placeholder="Wklej lub wyszukaj"
              isShownIcon
              className="pl-10"
            />
            <div className="flex flex-row gap-2 mt-4 mb-3">
              <Button
                name="Anuluj"
                type="button"
                className="border-blue-gray-200 text-blue-gray-800"
              />
              <Button
                name="Dodaj"
                type="button"
                className="border-second-primary-color text-primary-color"
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
