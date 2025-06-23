import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
	{
		variants: {
			variant: {
				default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
				ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-200',
				outline: 'border border-gray-200 hover:bg-gray-100 focus:ring-gray-200'
			},
			size: {
				sm: 'h-8 px-3',
				md: 'h-10 px-4',
				lg: 'h-12 px-6'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'md'
		}
	}
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, children, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button'
	return (
		<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
			{children}
		</Comp>
	)
})
Button.displayName = 'Button'

export { Button, buttonVariants }
