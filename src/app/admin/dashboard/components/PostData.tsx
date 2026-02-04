"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import TextFields from "./TextFields";
import Button from "./Button";

import { useForm, SubmitHandler } from "react-hook-form";



type Props = {
  close: () => void;
};

type FormData = {
    name: string;
}

const PostData = ({ close }: Props) => {

  
      const { register, handleSubmit, formState: {errors}, reset } = useForm<FormData>({
        defaultValues: {
          name: "",
        }
      });

  const queryClient = useQueryClient();

  const addTitle = useMutation({
    mutationFn: async (newPerson: { name: string; }) => {
      const res = await fetch("/api/beyond/post", {
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
      setTimeout(() => close(), 700);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addTitle.mutate(data);
  };

  return (
    <>
      <section className="crud-container">
        <div className="close">
          <div onClick={close}>
            <X />
          </div>
        </div>

        <h2 className="crud-title">
          Add nav thing
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="crud-input-container">
            <TextFields className="crud-input"
            label="Title"
            {...register("name", {required: "Title required", minLength: {value: 1, message: "At least 1 character required"}})}
              placeholder="title"
            ></TextFields>
            {errors.name && <p>{errors.name.message}</p>}

            <Button className={`transition ${addTitle.isPending? "crud-btn": "crud-btn"}`}>
              Send
            </Button>

            <div className="response">
                {addTitle.isSuccess && (
                    <p className="success"> Dine data er gemte!</p>
                )}
                {addTitle.isError && ( 
                    <p className="error">Fejl! Prøv igen.</p>
                )}
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default PostData;
