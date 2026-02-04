import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);

interface UpdateContext {
    params: Promise<{id: string}>;
}

interface UpdateFields {
    name?: string;
}

export const PUT = async ( req: NextRequest, context: UpdateContext) => {


    const body = await req.json();

    try {

        const {id} = await context.params;
        const numericId = Number(id);

        const updateData: Partial<UpdateFields> = {};
        const fields: (keyof UpdateFields)[] = ["name"];

        fields.forEach( (field)=> {
            const val = body?.[field];
            if(val !== undefined) {
                updateData[field] = val;
            }
        });

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({error: "Intet at opdatere"}, {status: 400});
        }

        const {data, error} = await supabase.from("beyond").update(updateData).eq("id", numericId).select('*');

        if(error) throw error;

        if (!data?.length) {
            return NextResponse.json(
                {error: "Intet at finde"}, {status: 404}
            );
        }

        return NextResponse.json({
            message: `Item ${numericId} blev opdateret!!`,
            data: data[0]
        });
    } catch (error) {
        
        const msg = error instanceof Error ? error.message : String(error);
        console.error('update error', msg);
        return NextResponse.json(
            {error: "Der skete end fejl ved opdateringen"},
            {status: 500}
        );

    }

}