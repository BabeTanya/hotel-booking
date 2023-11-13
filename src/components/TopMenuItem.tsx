import Link from "next/link";
import styles from './topmenu.module.css'

interface Props {
  title: string;
  pageRef: string;
}

export default function TopMenuItem({ title, pageRef }: Props) {
  return (
    <Link className={styles.itemcontainer} href={pageRef} >
        {title}
    </Link>
  )
}