import Image from "next/image";

export default function Navbar(props: any) {
  return (
    <div className="bg-neutral-900 rounded-lg shadow-lg">
      <Image src={props.image} alt="project image" />
      <div className="p-6">
        <h2 className="font-bold mb-2 text-2xl text-white">{props.name}</h2>
        <p className="text-white mb-2">{props.description}</p>
        <p className="text-gray-500 mb-2">{props.stack}</p>
      </div>
    </div>
  )
}