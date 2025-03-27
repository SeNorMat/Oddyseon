# Initialize ShadCN UI with the components directory
npx shadcn-ui@latest init

# When prompted:
# - Would you like to use TypeScript? Yes
# - Which style would you like to use? Default (or Dark)
# - Which color would you like to use as base color? Slate
# - Where is your global CSS file? app/globals.css
# - Do you want to use CSS variables? Yes
# - Where is your tailwind.config.js located? tailwind.config.js
# - Configure the import alias for components: @/components
# - Configure the import alias for utils: @/lib/utils

# Now install some key components we'll need
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add tooltip
