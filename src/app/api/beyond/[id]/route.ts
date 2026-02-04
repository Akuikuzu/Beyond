import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface QueryContext {
    params:Promise<{id:string}>;
}

const supabase = createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);

export const GET = async(_req: NextRequest, context:QueryContext)=> {
    const {id} = await context.params;

    const {data, error} = await supabase
    .from("beyond")
    .select('*')
    .eq('id', id)
    .single();

    if(error == null) return NextResponse.json({data});

    return NextResponse.json({error: error.message});
}