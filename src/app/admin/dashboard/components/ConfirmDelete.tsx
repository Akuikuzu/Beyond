"use client";

import React, { useState} from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from './Button';


type Props = {
    close: () => void;
    id: number | null;
}

const ConfirmDelete = ({close, id}: Props) => {
    const queryClient = useQueryClient();
    const [statusMsg, setStatusMsg] = useState("");
    const deletePost = useMutation<any, Error, string>({

        mutationFn: async(id: string) => {
            const res = await fetch(`http://localhost:3000/api/beyond/delete/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Fejl ved sletning");
            }

            return res.json();

        },

        onSuccess: () => {
            console.log("Post er slettet!");
            queryClient.invalidateQueries({queryKey: ["mydata"]});


            setStatusMsg("Slettet!");

            setTimeout(() => {
                close();
            }, 1000);
        },

        onError: (error) => {
            console.error("Fejl:", error);
            setStatusMsg("Noget gik galt ved din sletning!");
        },

    }); 
  return (
    <>
    <section className='crud-container' role='dialog' aria-modal="true">
        <p className="crud-title">Sikker på du vil slette denne bruger?</p>

        <div className="crud-input-container">
            <Button value="cancel" onClick={close} className='crud-btn'>
                Annuler
            </Button>

            <Button value="confirm" onClick={()=> deletePost.mutate(String(id))} disabled={deletePost.isPending} className='crud-btn'>Slet</Button>

        </div>

        <div className="response" role="status">
            {deletePost.isPending ? "Sletter..." : statusMsg ? statusMsg : ""}
        </div>
    </section>
    </>
  )
}

export default ConfirmDelete