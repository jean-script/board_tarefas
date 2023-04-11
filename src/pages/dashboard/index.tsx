import { GetServerSideProps } from 'next';
import { ChangeEvent, FormEvent, useState} from 'react'
import styles from './styles.module.css';
import Head from 'next/head';

import { getSession } from 'next-auth/react';
import { Textarea } from '../../components/Textarea'
import { FiShare2 } from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'

export default function Dashboard(){

    const [input, setInpput] = useState('');
    const [publicTaks, setPublicTaks] = useState(false);

    function handleChangePublic(e:ChangeEvent<HTMLInputElement>){
        setPublicTaks(e.target.checked);       
    }

    function handleRegisterTask(e:FormEvent){
        e.preventDefault();

        if(input ==='') return;

        

    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>
            
            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Qual sua tarefa?</h1>

                        <form onSubmit={handleRegisterTask}>
                            <Textarea 
                                placeholder='Digite qual sua tarefa'
                                value={input}
                                onChange={(e:ChangeEvent<HTMLTextAreaElement>)=> setInpput(e.target.value)}
                            />
                            <div className={styles.checkboxArea}>
                                <input 
                                    type='checkbox' 
                                    className={styles.checkbox}
                                    checked={publicTaks}
                                    onChange={handleChangePublic}
                                />
                                <label>Deixar tarefa publica?</label>
                            </div>

                            <button type='submit' className={styles.button}>
                                Registrar
                            </button>
                        </form>
                    </div>

                </section>

                <section className={styles.taskContainer}>
                    <h1>Minhas tarefas</h1>
                    
                    <article className={styles.task}>
                        <div className={styles.tagContainer}>
                            <label className={styles.tag}>PUBLICO</label>
                            <button className={styles.shareButton}>
                                <FiShare2 size={22} color='#3183ff'/>
                            </button>
                        </div>

                        <div className={styles.taskContent}>
                            <p>Minha primeira tarefa de exemplo show demais!</p>
                            <button className={styles.trashButton}>
                                <FaTrash size={24} color='#ea3140' />
                            </button>
                        </div>
                    </article>

                </section>

            </main>

        </div>
    )
}

// criando validação pelo lado do servidor 
export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const session = await getSession({ req });

    // se não tem usuario redireciona
    if(!session?.user){
        return{
            redirect:{
                destination:'/',
                permanent: false,
            }
        }
    }
    
    
    return{
        props:{},
    }
}
