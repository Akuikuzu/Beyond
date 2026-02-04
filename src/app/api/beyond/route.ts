import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const GET = async (req:NextRequest) => {

    const {data, error} = await supabase
    .from("beyond")
    .select(`id, name, img, description`)
    .order('id', { ascending: true })
    
    return NextResponse.json({data})

}