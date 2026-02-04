"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";

interface FormProps {
  showForm: boolean;
  setShowForm: (value: boolean) => void;
}

type FormData = {
    name: string;
    email: string;
    comment: string;
}

const Form = ({ showForm, setShowForm }: FormProps) => {

        const { register, handleSubmit, formState: {errors}, reset } = useForm<FormData>({
        defaultValues: {
          name: "",
          email: "",
          comment: "",
        }
      });

  const queryClient = useQueryClient();

  const addPerson = useMutation({
    mutationFn: async (newPerson: { name: string; email: string; comment: string; }) => {
      const res = await fetch("/api/mail/post", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newPerson),
      });

      if (!res.ok) throw new Error("Failed to post data");
      return res.json();
    },

    onSuccess: () => {
      console.log("posted with success");
      queryClient.invalidateQueries({ queryKey: ["mydata"] });
      reset();
      setTimeout(() => setShowForm(false), 700);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addPerson.mutate(data);
  };

  const closeForm = () => {
    setShowForm(false);
  }

  return (
    <>

    <div className="modal"></div>

    <form id="form-container" onSubmit={handleSubmit(onSubmit)}>
      <span onClick={closeForm} className="luk"><X></X></span>
        <span className="form-title">Send a message to Mars!</span>

        <div className="form-label">
        <label>Name</label>
        <input type="text" className="form-input"
        {...register("name", {required: "Navn er påkrævet", minLength: {value: 1, message: "Navn skal mindst have 1 tegn"}})}
        />
        </div>

        <div className="form-label">
        <label>Email</label>
        <input type="email" className="form-input"
        {...register("email", {required: "Email er påkrævet", minLength: {value: 1, message: "Email skal mindst have 1 tegn"}})}
        />
        </div>
        
        <div className="form-label">
        <label>Comment</label>
        <textarea className="form-comment" {...register("comment")}></textarea>
        </div>

        <button className="button">Submit</button>
    </form>

    </>
  )
}

export default Form;