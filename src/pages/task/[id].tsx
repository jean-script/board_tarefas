import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from 'next-auth/react'
import Head from "next/head"
import styles from './styles.module.css';
import { GetServerSideProps } from "next";

import { db } from '../../services/firebaseConection';

import { Textarea } from '../../components/Textarea'

import {
    doc,
    collection,
    query,
    where,
    getDoc,
    addDoc,
    getDocs
} from 'firebase/firestore';
import { toast } from "react-toastify";

interface TaskProps {
    item:{
        tarefa: string;
        created: string;
        public: boolean;
        user: string;
        taskId: string;

    };
    allComments:CommentsProps[]
}

interface CommentsProps {
    id: string;
    comment: string;
    taskId: string;
    user:string;
    name:string;
}

export default function Task({ item, allComments }:TaskProps){

    const {data:session} = useSession();
    const [input, setInput] = useState('');
    const [comments, setComments] = useState<CommentsProps[]>(allComments || [])

    async function handleComment(e:FormEvent){
        e.preventDefault();

        if(input === "") return;

        if(!session?.user?.email || !session?.user?.name) return;

        try {
            const docRef = await addDoc(collection(db,"comments"),{
                comment:input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item.taskId
            })

            setInput('');

            toast.success("Comentário adicionado com sucesso!");
            
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Detalhes da tarefa</title>
            </Head>

            <main className={styles.main}>
                <h1>Tarefa</h1>

                <article className={styles.task}>
                    <p>{item?.tarefa}</p>
                </article>
            </main>


            <section className={styles.commentsContainer}>
                <h2>Deixar comentário</h2>

                <form onSubmit={handleComment}>
                    <Textarea 
                        placeholder="Digite seu comentário..."
                        value={input}
                        onChange={(e:ChangeEvent<HTMLTextAreaElement>)=> setInput(e.target.value)}
                    />
                    <button className={styles.button}
                        disabled={!session?.user}
                    >Enviar comentário</button>
                </form>
            </section>

            <section className={styles.commentsContainer}>

                <h2>Todos comentários</h2>

                {comments.length === 0 &&(
                    <span>Nenhum comentário encontrado</span>
                )}

                {comments.map((item)=>(
                    <article className={styles.comment} key={item.id}>
                        <p>{item.comment}</p>
                    </article>
                ))}
            </section>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;

    const docRef = doc(db, "tasks", id);
    const q = query(collection(db,"comments"),where("taskId","==",id));

    const snapshotComments = await getDocs(q);

    let allComments: CommentsProps[] = [];

    snapshotComments.forEach((doc)=>{

        allComments.push({
            id:doc.id,
            comment:doc.data().comment,
            user: doc.data().user,
            name: doc.data.name,
            taskId: doc.data().taskId
        })

    })

    console.log(allComments);
    

    const snapshot = await getDoc(docRef);

    if(snapshot.data() === undefined){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    if(!snapshot.data()?.public){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    const miliseconds = snapshot.data()?.created?.seconds * 1000;

    const task = {
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user,
        taskId: id
    }
    
    return {
        props:{
            item: task,
            allComments: allComments
        }
    };
}
