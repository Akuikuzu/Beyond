import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);

interface DeleteContext {
    params: Promise<{id:string}>;
}

export const DELETE = async ( req: NextRequest, context: DeleteContext) => {

    const {id} = await context.params;
    const numericId = Number(id)

    if (!numericId) {
        return NextResponse.json(
            {error: "Du manger ID eller så eksisterer den ikke"},
            { status: 400 }
        );
    }

    const { error } = await supabase.from("beyond").delete().eq("id", numericId);

    if (error) {
        return NextResponse.json ( { error: error.message}, {status: 500})
    }

    return NextResponse.json({message: `Item ${numericId} blev slettet!!`})

};

