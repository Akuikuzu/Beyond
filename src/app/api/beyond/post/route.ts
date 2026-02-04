import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const POST = async (req: NextRequest) => {
    const data = await req.json();

    const { error } = await supabase.from('beyond').insert({name: data.name});

    return NextResponse.json(data);
}