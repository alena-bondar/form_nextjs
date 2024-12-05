"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/app/components";
import { MenuItem } from "@/app/types";
import { menuItemSchema, FormData } from "@/app/validation";
import { Menu } from "@/app/modules/menu";

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isOpenedForm, setIsOpenedForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(menuItemSchema),
  });

  const handleOpenForm = (parentId: string | null = null) => {
    setParentId(parentId);
    setEditingItem(null);
    reset();
    setIsOpenedForm(!isOpenedForm);
  };

  const onSubmit = (values: FormData) => {
    if (editingItem) {
      const updateItem = (items: MenuItem[]): MenuItem[] =>
        items.map((item) => {
          if (item.id === editingItem.id) {
            return { ...item, ...values };
          }
          if (item.children) {
            return { ...item, children: updateItem(item.children) };
          }
          return item;
        });

      setMenuItems((prevMenuItems) => updateItem(prevMenuItems));

      setEditingItem(null);
    } else {
      const newItem: MenuItem = {
        id: uuidv4(),
        ...values,
        children: [],
      };

      if (parentId) {
        const addChildToParent = (items: MenuItem[]): MenuItem[] =>
          items.map((item) => {
            if (item.id === parentId) {
              return {
                ...item,
                children: [...(item.children || []), newItem],
              };
            }
            if (item.children) {
              return { ...item, children: addChildToParent(item.children) };
            }
            return item;
          });

        setMenuItems((prevMenuItems) => addChildToParent(prevMenuItems));
      } else {
        setMenuItems((prevMenuItems) => [...prevMenuItems, newItem]);
      }
    }

    reset();
    setParentId(null);
    setIsOpenedForm(false);
  };

  return (
    <div className="w-full h-screen bg-gray-400">
      <main className="w-[1208px] m-auto p-4">
        {!menuItems.length && !isOpenedForm ? (
          <div className="p-6 bg-background border border-border rounded-md flex flex-col items-center w-full">
            <p className="text-base font-semibold mb-1 text-gray-900">
              Menu jest puste
            </p>
            <p className="mb-6 text-blue-gray-700">
              W tym menu nie ma jeszcze żadnych linków.
            </p>
            <Button
              type="button"
              className="bg-primary-color text-white font-semibold"
              onClick={() => handleOpenForm(null)}
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
        ) : (
          <div className="rounded-lg border border-gray-300 bg-background">
            <Menu
              setEditingItem={setEditingItem}
              setValue={setValue}
              setParentId={setParentId}
              setIsOpenedForm={setIsOpenedForm}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
              openForm={handleOpenForm}
            />
            {isOpenedForm && (
              <form className="mx-6 my-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative bg-white pt-4 pb-2 pl-6 pr-20 rounded-md border border-blue-gray-200">
                  <Controller
                    name="title"
                    defaultValue={editingItem?.title || ""}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        fieldName="Nazwa"
                        placeholder="np. Promocje"
                        className="px-3"
                      />
                    )}
                  />
                  {errors.title && (
                    <div className="text-red-500 text-xs -mt-1 mb-2">
                      {errors.title?.message}
                    </div>
                  )}
                  <Controller
                    name="link"
                    control={control}
                    defaultValue={editingItem?.link || ""}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        fieldName="Link"
                        placeholder="Wklej lub wyszukaj"
                        isShownIcon
                        className="pl-10"
                      />
                    )}
                  />
                  {errors.link && (
                    <div className="text-red-500 text-xs -mt-1 mb-2">
                      {errors.link?.message}
                    </div>
                  )}
                  <div className="flex flex-row gap-2 mt-4 mb-3">
                    <Button
                      name="Anuluj"
                      type="button"
                      className="border-blue-gray-200 text-blue-gray-800"
                      onClick={() => handleOpenForm(null)}
                    />
                    <Button
                      name="Dodaj"
                      type="submit"
                      className="border-secondary text-primary-color"
                    />
                  </div>
                </div>
              </form>
            )}
            <div className="bg-gray-400 py-5 w-full rounded-b-lg border-t border-border">
              <Button
                type="button"
                name="Dodaj pozycję menu"
                className="rounded-lg border-gray-300 bg-white text-blue-gray-800 ml-6"
                onClick={() => handleOpenForm()}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
