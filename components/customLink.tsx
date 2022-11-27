import Link from "next/link";

export default function CustomLink(props: any) {
  return (
    <Link href={props.link} className="inline-flex justify-center items-center p-5 text-base font-medium text-gray-900 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-neutral-900 dark:hover:bg-gradient-to-r from-teal-500 to-indigo-600 dark:hover:text-white">
      <svg className="mr-3 w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill={props.fillColor} d={props.iconSvg} /></svg>
      <span className="w-full text-lg">{props.linkName}</span>
      <svg aria-hidden="true" className="ml-3 w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </Link>
  )
}