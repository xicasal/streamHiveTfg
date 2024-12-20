
interface NavbarItemProps {
  label: string
}

export default function NavbarItem({ label }: NavbarItemProps) {
  return (
    <div className="bg-transparent rounded-lg">
      <h1 
        className="
          px-4
          py-2
          text-white
          cursor-pointer
          hover:text-amber-600
          hover:bg-zinc-800
          hover:rounded-lg
          hover:scale-125
          hover:shadow-md
          hover:shadow-amber-600
          transition
        "
      >
        {label}
      </h1>
    </div>
  )
}