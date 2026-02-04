export type Names = {
    id:number;
    name:string;
    img:string;
    description: {
        paragraph: string;
        content: Array<{
            text?: string;
            headline?: string;
        }>;
    };
}

export const getData = async (): Promise<Names[]>=>{

    const res = await fetch("/api/beyond");

    if(!res.ok) throw new Error("Failed to fetch data")

    const json = await res.json();
    return json.data ?? [];

}

export const getQueryData = async(id:string | null) => {

    if(!id) throw new Error('Missing id for data query');

    const res = await fetch(`/api/beyond/${id}`, {cache: "no-store"});

    if(!res.ok) throw new Error("Failed to fecth data from supabase");

    const json = await res.json();

    return json.data;

}