"use client";

import { getData } from "@/service/data";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { X } from "lucide-react";


type Props = { onClose: () => void; n: number };

const Modal = ({ onClose, n }: Props) => {

  const { data, isLoading } = useQuery({
    queryKey: ["mydata"],
    queryFn: getData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p className="loading">Loading...</p>;

  const items = data ?? [];

  return (
    <>
          <div id="modal">
        <div className="close">
          <X onClick={onClose}></X>
        </div>
        {items[n] && (
          <div key={items[n].id} id="Beyond">
            <div className="modal-image">
              <img src={`images/${items[n].img}`} alt={items[n].name} className="image" />
            </div>

            <article className="modal-text">
              <h2>{items[n].description?.paragraph}</h2>
              

              {Array.isArray(items[n].description?.content) ? (
                items[n].description.content.map((c, i) => (
                  <div key={i} className="text">
                    {c.headline ? <h3>{c.headline} </h3> : null}
                    <p dangerouslySetInnerHTML={{__html: c.text ?? ''}}></p>
                  </div>
                ))
              ) : (
                <p>{(items[n].description as any)?.content?.text}</p>
              )}
            </article>
          </div>
        )}
      </div>
    </>
  )
}

export default Modal;