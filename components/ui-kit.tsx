import type { ComponentType, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { Button as ShadButton } from '@/components/ui/button';
import { Input as ShadInput } from '@/components/ui/input';
import * as DialogUI from '@/components/ui/dialog';
import * as SheetUI from '@/components/ui/sheet';
import * as DialogPrimitive from '@radix-ui/react-dialog';
// Typed bridge to the template's existing JavaScript shadcn components.
export const Button = ShadButton as ComponentType<ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'; size?: 'default' | 'sm' | 'lg' | 'icon' }>;
export const Input = ShadInput as ComponentType<InputHTMLAttributes<HTMLInputElement>>;
export const Dialog = DialogUI.Dialog;
export const DialogContent = DialogUI.DialogContent as typeof DialogPrimitive.Content;
export const DialogTitle = DialogUI.DialogTitle as typeof DialogPrimitive.Title;
export const DialogDescription = DialogUI.DialogDescription as typeof DialogPrimitive.Description;
export const Sheet = SheetUI.Sheet;
export const SheetContent = SheetUI.SheetContent as ComponentType<DialogPrimitive.DialogContentProps & { side?: 'right' | 'left' | 'top' | 'bottom' }>;
export const SheetTitle = SheetUI.SheetTitle as typeof DialogPrimitive.Title;
export const SheetDescription = SheetUI.SheetDescription as typeof DialogPrimitive.Description;
