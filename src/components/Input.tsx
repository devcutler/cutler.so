import { forwardRef } from 'react';
import { cn } from 'clsx-for-tailwind';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	required?: boolean;
	helpText?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	required?: boolean;
	helpText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, label, required, helpText, id, ...props }, ref) => {
		const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
		return (
			<div className="space-y-2">
				{label && (
					<label htmlFor={inputId} className="block text-sm font-medium">
						{label} {required && '*'}
					</label>
				)}
				<input
					id={inputId}
					ref={ref}
					className={cn(
						'input w-full',
						className,
					)}
					{...props}
				/>
				{helpText && (
					<p className="text-xs text-muted-foreground">
						{helpText}
					</p>
				)}
			</div>
		);
	},
);

Input.displayName = 'Input';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ className, label, required, helpText, id, ...props }, ref) => {
		const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    
		return (
			<div className="space-y-2">
				{label && (
					<label htmlFor={inputId} className="block text-sm font-medium">
						{label} {required && '*'}
					</label>
				)}
				<textarea
					id={inputId}
					ref={ref}
					className={cn(
						'input w-full resize-none',
						className,
					)}
					{...props}
				/>
				{helpText && (
					<p className="text-xs text-muted-foreground">
						{helpText}
					</p>
				)}
			</div>
		);
	},
);

TextArea.displayName = 'TextArea';