import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";

export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-400">
      <main className="w-[1208px] m-auto p-4">
          <div className="p-6 bg-primary-background-color border border-primary-border-color rounded-md flex flex-col items-center w-full">
              <p className="text-base font-semibold mb-1 text-gray-900">Menu jest puste</p>
              <p className="mb-6 text-blue-gray-700">W tym menu nie ma jeszcze żadnych linków.</p>
              <Button name="Dodaj pozycję menu" type="button" className="bg-primary-color text-white font-semibold"/>
          </div>
        <form action="">
          <div className="bg-white p-4 rounded-md border border-blue-gray-200">
            <Input type="text" fieldName="Nazwa" placeholder="np. Promocje" />
            <Input
              type="text"
              fieldName="Link"
              placeholder="Wklej lub wyszukaj"
            />
            <div className="flex flex-row gap-2 mt-4 mb-3">
              <Button name="Anuluj" type="button" className="border-blue-gray-200 text-blue-gray-800" />
              <Button name="Dodaj" type="button" className="border-second-primary-color text-primary-color" />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
