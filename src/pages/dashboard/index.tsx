import { GetServerSideProps } from 'next';
import styles from './styles.module.css';
import Head from 'next/head';

import { getSession } from 'next-auth/react';
import { Textarea } from '../../components/Textarea'

export default function Dashboard(){
    return(
        <div className={styles.container}>
            <Head>
                <title>Meu painel de tarefas</title>
            </Head>
            
            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Qual sua tarefa?</h1>

                        <form>
                            <Textarea 
                                placeholder='Digite qual sua tarefa'
                            />
                            <div className={styles.checkboxArea}>
                                <input 
                                    type='checkbox' 
                                    className={styles.checkbox}
                                />
                                <label>Deixar tarefa publica?</label>
                            </div>

                            <button type='submit' className={styles.button}>
                                Registrar
                            </button>
                        </form>
                    </div>

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
