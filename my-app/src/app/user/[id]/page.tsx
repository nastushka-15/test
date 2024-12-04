import Link from "next/link";

type Props = {
    params: {
        id: string;
    };
};

export default function Home({params: {id}}: Props){
    return(
        <>
         <h2>Карточка {id}</h2>
         <Link href={'/'}>На главную</Link>
         </>
    )
}