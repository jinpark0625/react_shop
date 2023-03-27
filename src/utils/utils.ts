import { Dispatch, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { CardTypes, Focused, SelectedProductType } from './interfaces';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function removeCollectionsPrefix(key: string, str: string) {
  return str.replace(key, '');
}

export function deduplicateByOptions<T extends Record<string, any>>(
  objectArray: T[],
  key: keyof T,
): string[] {
  return Array.from(new Set(objectArray.flatMap((object) => object[key])));
}

export const handleOnChangeString = (
  name: Focused,
  value: string,
  setValue: UseFormSetValue<CardTypes>,
) => {
  setValue(name, value);
};

export const handleOnChangeNumber = (
  name: Focused,
  value: string,
  setValue: UseFormSetValue<CardTypes>,
) => {
  setValue(name, value.replace(/[^0-9]/g, ''));
};

export const handleOnFocus = (
  value: Focused,
  callback: Dispatch<SetStateAction<Focused | undefined>>,
) => {
  callback(value);
};

export const calculateTax = (data: SelectedProductType[] | undefined) => {
  return data?.reduce(
    (prev: number, current: SelectedProductType) =>
      prev + current.price * current.quantity * 0.13,
    0,
  );
};

export const calculateTotal = (data: SelectedProductType[] | undefined) => {
  return data?.reduce(
    (prev: number, current: SelectedProductType) =>
      prev + current.price * current.quantity,
    0,
  );
};
