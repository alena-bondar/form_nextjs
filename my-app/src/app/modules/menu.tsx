import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { Item } from "@/app/components";
import { MenuItem } from "@/app/types";
import { FormData } from "@/app/validation";

type MenuProps = {
  menuItems: MenuItem[];
  setMenuItems: (menuItems: MenuItem[]) => void;
  setEditingItem: (item: MenuItem) => void;
  setValue: UseFormSetValue<FormData>;
  setParentId: (parentId: string | null) => void;
  setIsOpenedForm: (isOpen: boolean) => void;
  openForm: () => void;
};

export const Menu: FC<MenuProps> = ({
  menuItems,
  setMenuItems,
  setEditingItem,
  setValue,
  setParentId,
  setIsOpenedForm,
  openForm,
}) => {
  const [visibleOrder, setVisibleOrder] = useState(
    menuItems.map((item) => item.id),
  );

  useEffect(() => {
    setVisibleOrder(menuItems.map((item) => item.id));
  }, [menuItems]);

  const handleRemoveItem = (id: string) => {
    const removeChild = (items: MenuItem[]): MenuItem[] =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          children: item.children ? removeChild(item.children) : [],
        }));

    setMenuItems(removeChild(menuItems));
  };

  const handleEditItem = (id: string) => {
    const findItem = (items: MenuItem[]): MenuItem | null => {
      for (const item of items) {
        if (item.id === id) return item;
        if (item.children) {
          const found = findItem(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    const itemToEdit = findItem(menuItems);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setValue("title", itemToEdit.title);
      setValue("link", itemToEdit.link || "");
      setParentId(null);
      setIsOpenedForm(true);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over !== null) {
      if (active.id !== over.id) {
        setVisibleOrder((prev) => {
          const oldIndex = prev.indexOf(active.id.toString());
          const newIndex = prev.indexOf(over.id.toString());
          return arrayMove(prev, oldIndex, newIndex);
        });
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={visibleOrder}>
        {visibleOrder.map((id) => {
          const item = menuItems.find((menuItem) => menuItem.id === id);
          return item ? (
            <Item
              key={item.id}
              item={item}
              onAdd={openForm}
              onEdit={handleEditItem}
              onRemove={handleRemoveItem}
            />
          ) : null;
        })}
      </SortableContext>
    </DndContext>
  );
};
