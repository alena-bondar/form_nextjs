import { FC } from "react";
import Image from "next/image";
import { Button } from "@/app/components/Button";
import Link from "next/link";

export type ItemProps = {
  title: string;
  link: string;
  addItem?: () => void;
};

export const Item: FC<ItemProps> = ({ title, link, addItem }) => {
  return (
    <div className="py-4 px-6 flex justify-between bg-white items-center">
      <div className="flex">
        <div className="p-3">
          <Image
            src="/assets/move-icon.svg"
            alt="move"
            width="19"
            height="19"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-900 pb-1.5">{title}</p>
          <Link className="text-blue-gray-700" href={""}>
            {link}
          </Link>
        </div>
      </div>
      <div className="flex">
        <Button
          type="button"
          name="Usuń"
          className="border-r-0 rounded-r-none rounded-l-lg border-gray-300 text-blue-gray-800"
          onClick={() => {}}
        />
        <Button
          type="button"
          name="Edytuj"
          className="rounded-none border-gray-300 text-blue-gray-800"
          onClick={() => {}}
        />
        <Button
          type="button"
          name="Dodaj pozycję menu"
          className="border-l-0 rounded-l-none rounded-r-lg border-gray-300 text-blue-gray-800"
          onClick={addItem}
        />
      </div>
    </div>
  );
};
