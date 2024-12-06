import * as React from "react";

import { cn } from ">util/twm";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, Circle } from "react-feather";
import { Button } from "./button";

import { OTPInput, OTPInputContext } from "input-otp";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex text-foreground h-10 w-full duration-700 rounded-md border border-ring bg-background px-3 py-2 text-sm ring-offset-d-bg dark:ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const disabled = props.disabled;

    return (
      <div className="relative">
        <Input
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <Button
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          disabled={disabled}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          size="sm"
          type="button"
          variant="ghost"
        >
          {showPassword && !disabled ? (
            <Eye aria-hidden="true" className="h-4 w-4" />
          ) : (
            <EyeOff aria-hidden="true" className="h-4 w-4" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, children, ...props }, ref) => (
  <OTPInput
    className={cn("disabled:cursor-not-allowed", className)}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    ref={ref}
    render={() => <>{children}</>}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div className={cn("flex items-center", className)} ref={ref} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

/**
 * Represents an input slot for an OTP (One-Time Password) component.
 * This component is used to display a single character of the OTP and
 * handle its appearance based on its state.
 *
 * @example
 * ```tsx
 * <InputOTPSlot index={0} />
 * ```
 *
 * @param index - The index of the slot.
 * @param className - Additional CSS class names for the slot.
 * @param props - Additional props for the slot.
 * @param ref - The ref to attach to the slot.
 * @returns The rendered input slot component.
 */
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    index: number;
    char?: string;
    isActive?: boolean;
    hasFakeCaret?: boolean;
  }
>(({ className, ...props }, ref) => {
  const _inputOTPContext = React.useContext(OTPInputContext);
  const char = props.char;
  const isActive = props.isActive;
  const hasFakeCaret = props.hasFakeCaret;

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-ring duration-700 text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      ref={ref}
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      ) : null}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Circle />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background duration-700 text-foreground px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// Exports

export {
  InputOTP as OTPWrapper,
  InputOTPGroup as OTPGroup,
  InputOTPSlot as OTPSlot,
  InputOTPSeparator as OTPSeperator,
};

export { Input as Default, PasswordInput as Password };

export { Textarea };
