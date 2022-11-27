import Image from "next/image";
import Link from "next/link";

export default function Card(props: any) {
  return (
    <Link href={props.link || ""} className="bg-neutral-900 rounded-lg shadow-lg min-w-full">
      <Image src={props.image} width="800" height="800" alt="Seems like the link to this image is broken 🙁" />
      <div className="p-6">
        <h2 className="font-bold mb-2 text-2xl text-white">{props.name}</h2>
        <p className="text-white mb-2">{props.description}</p>
        <p className="text-gray-500 mb-2">{props.stack}</p>
      </div>
    </Link>
  )
}