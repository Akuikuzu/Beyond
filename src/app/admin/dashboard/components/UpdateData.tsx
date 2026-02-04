"use client";

import Button from "./Button";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


type Props = {
    close: () => void;
    id: number | null;
}
const UpdateData = ({close, id}: Props) => {

    if (id === null) return null;

    const queryClient = useQueryClient();

    const [statusMsg, setStatusMsg] = useState("");
    const [formData, setFormData] = useState({name: ""});

    const {data, isLoading} = useQuery({
        queryKey: ["mydata", id],
        queryFn: async () => {
            const res = await fetch(`/api/beyond/${id}`);
            if (!res.ok) throw new Error("Fejl ved importering af data!");
            const json = await res.json();
            return json;
        },

        enabled: !!id,
    });

    useEffect(()=> {
        if (data) {
            const title = data.data ?? data;
            setFormData({
                name: title.name || "",
            });
        }
    }, [data]);

    const updatePost = useMutation<any, Error, {id: number; data: any}>({
        mutationFn: async ({ id, data }) => {
            const res = await fetch(`http://localhost:3000/api/beyond/update/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error("Fejl ved opdateringen!");
            return res.json();
        },

        onSuccess: ()=> {
            console.log("OPDATERING PÅ POST!!!");
            queryClient.invalidateQueries({
                queryKey: ["mydata"]
            });
            setStatusMsg("Dine data er opdateret!");
            setTimeout(() => {
                close();
            }, 1000);
        },

        onError: (error)=> {
            console.error("Fejl:", error);
            setStatusMsg("Der gik noget galt i din opdatering");
        },

    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updatePost.mutate({id, data: formData});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

  return (
    <>

    <section className="crud-container" role="dialog" aria-modal="true">

        <div className="close">
            <div onClick={close}> <X></X></div>
        </div>
        <h2 className="crud-title">
          Edit
        </h2>

        <form onSubmit={handleSubmit} className="crud-input-container">

        <div>
            <label className="crud-label">Title</label>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Nav title" className="crud-input"/>
        </div>
            <Button className="crud-btn">Opdater</Button>
        </form>

        <div className="response" role="status">
            {updatePost.isPending ? "Opdaterer..." : statusMsg ? statusMsg : ""}
        </div>
        


    </section>
    
    </>
  )
}

export default UpdateData