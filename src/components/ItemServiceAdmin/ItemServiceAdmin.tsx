import { useRouter } from "next/navigation"
export default function ItemServiceAdmin ({name, category, local, id }: {name?:string, category?:string, local?:string, id?:string }) {
    const router = useRouter();

    return (
        <tr onClick={()=>router.push(`./services/${encodeURIComponent(id)}`)}>
               <td>{name}</td>
               <td>{category}</td>
               <td>{local}</td>
            </tr>
    )
}