import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/app/components/Button";
import { MenuItem } from "@/app/types";

export type ItemProps = {
  item: MenuItem;
  onAdd: (parentId: string) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  className?: string;
};

export const Item: FC<ItemProps> = ({
  item,
  onAdd,
  onEdit,
  onRemove,
  className,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`py-4 px-6 flex justify-between bg-white items-center border-b rounded-t-lg border-border ${className}`}
      >
        <div className="flex w-1/2">
          <div {...listeners} {...attributes} className="p-3">
            <Image
              src="/assets/move-icon.svg"
              alt="move"
              width="19"
              height="19"
            />
          </div>
          <div className="w-4/5 truncate">
            <p className="font-semibold text-gray-900 pb-1.5">{item.title}</p>
            <Link className="text-blue-gray-700" href={item.link || ""}>
              {item.link}
            </Link>
          </div>
        </div>
        <div className="flex">
          <Button
            type="button"
            name="Usuń"
            className="border-r-0 rounded-r-none rounded-l-lg border-gray-300 text-blue-gray-800"
            onClick={() => onRemove(item.id)}
          />
          <Button
            type="button"
            name="Edytuj"
            className="rounded-none border-gray-300 text-blue-gray-800"
            onClick={() => onEdit(item.id)}
          />
          <Button
            type="button"
            name="Dodaj pozycję menu"
            className="border-l-0 rounded-l-none rounded-r-lg border-gray-300 text-blue-gray-800"
            onClick={() => onAdd(item.id)}
          />
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <div className="ml-8">
          {item.children.map((child) => (
            <Item
              key={child.id}
              item={child}
              onAdd={onAdd}
              onEdit={onEdit}
              onRemove={onRemove}
              className="menu-item-child rounded-none border-border rounded-bl-lg rounded-tl-none"
            />
          ))}
        </div>
      )}
    </>
  );
};
