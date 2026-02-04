"use client";
import { Edit, Pencil, Trash2 } from "lucide-react";
import React, { Fragment, useState, useEffect } from "react";

import { getData } from "@/service/data";
import { useQuery } from "@tanstack/react-query";

import PostData from "./components/PostData";
import ConfirmDelete from "./components/ConfirmDelete";
import UpdateData from "./components/UpdateData";

import { createClient } from "@/utils/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

type ModalMode = "delete" | "update" | "post" | null;

const page = () => {

  
      const [myuser, setMyUser] = useState<User | null>(null);
      const router = useRouter();
      const supabase = createClient();
  
      const handleSignOut = async () => {
          const data = await supabase.auth.signOut();
          router.refresh();
          router.push('/admin')
      }
  
      useEffect(() => {
          (async () => {
              const {data: {user}} = await supabase.auth.getUser();
              console.log(user);
  
              if (user) {
                  setMyUser(user);
              } else {
                  router.push('login')
              }
          })()
      }, [])

  const [openModal, setopenModal] = useState<ModalMode>(null);
  const [mId, setmId] = useState<number | null>(0);

  const { data, isLoading } = useQuery({
    queryKey: ["mydata"],
    queryFn: getData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleOpenModal = (mode: "delete" | "update" | "post", id?: number) => {
    console.log(mode, id);

    setmId(id || 0);
    setopenModal(mode);
  };

  const handleCloseModal = () => {
    console.log("Luk");
    setopenModal(null);
    setmId(0);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <ul>
            <li
              onClick={() => {
                handleOpenModal("post");
              }}
            >
              <Pencil size={40}></Pencil>
            </li>
          </ul>

          {myuser && (
            <div>
                <div className="user">
                    <span>
                        Hej, {myuser.email}
                    </span>
                    <button onClick={handleSignOut} className="signout-btn">Sign out</button>
                </div>
            </div>
          )}
        </nav>
      </header>

      <div className="dashboard">
        <div className="dashboard-content">
          <section>
            {data &&
              data.map((items: any) => (
                <Fragment key={items.id}>
                  <div className="content-title">
                    {items.name}
                  </div>

                  <div
                    className="content-btn"
                    onClick={() => {
                      handleOpenModal("update", items.id);
                    }}
                  >
                    {" "}
                    <Edit size={30}></Edit>
                  </div>

                  <div
                    className="content-btn"
                    onClick={() => {
                      handleOpenModal("delete", items.id);
                    }}
                  >
                    <Trash2 size={30}></Trash2>
                  </div>
                </Fragment>
              ))}
          </section>
        </div>
      </div>


      {openModal === "post" && <PostData close={handleCloseModal}></PostData>}
      {openModal === "delete" && <ConfirmDelete close={handleCloseModal} id={mId}></ConfirmDelete>}
      {openModal === "update" && <UpdateData close={handleCloseModal} id={mId}></UpdateData>}


    </>
  );
};

export default page;
