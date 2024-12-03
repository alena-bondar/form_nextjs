"use client";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {Button, Input, Item} from "@/app/components";
import Image from "next/image";
import { MenuItem } from "@/app/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  initialValuesMenuItem,
  menuItemSchema,
  FormData,
} from "@/app/validation";

export default function Home() {
  const [menuItem, setMenuItems] = useState<MenuItem[]>([]);
  const [isOpenedForm, setIsOpenedForm] = useState(false);

  const {
    control,
    // formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: initialValuesMenuItem,
  });

  const handleOpenForm = () => {
    setIsOpenedForm(!isOpenedForm); // Example of opening a form state
  };

  const onSubmit = (values: FormData) => {
    const newItem = { ...values, id: uuidv4() };
    console.log("newItem", newItem);

    setMenuItems(() => [...menuItem, newItem]);
    reset();
    handleOpenForm();
  };

  return (
    <div className="w-full h-screen bg-gray-400">
      <main className="w-[1208px] m-auto p-4">
        {!menuItem.length && !isOpenedForm ? (
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
              onClick={handleOpenForm}
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
        ) : (menuItem.map((item, index) => <Item key={index} title={item.title} link={item.link} addItem={handleOpenForm} />))}
        {isOpenedForm && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative bg-white pt-4 pb-2 pl-6 pr-20 rounded-md border border-blue-gray-200">
              <div className="absolute w-10 h-10 top-4 right-6 flex items-center justify-center">
                <Image
                  src="/assets/delete-icon.svg"
                  alt="delete"
                  width="19"
                  height="19"
                />
              </div>
              <Controller
                name="title"
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
              <Controller
                name="link"
                control={control}
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
              <div className="flex flex-row gap-2 mt-4 mb-3">
                <Button
                  name="Anuluj"
                  type="button"
                  className="border-blue-gray-200 text-blue-gray-800"
                  onClick={handleOpenForm}
                />
                <Button
                  name="Dodaj"
                  type="submit"
                  className="border-second-primary-color text-primary-color"
                />
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
